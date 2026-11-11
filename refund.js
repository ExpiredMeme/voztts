// Voz refund form — public Turnstile site key is declared in refund.html.
const REFUND_API = 'https://voz-license-api.voztts.workers.dev';
const refundForm = document.getElementById('refund-form');
const refundStatus = document.getElementById('refund-status');
const refundButton = document.getElementById('refund-submit');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

function showRefundStatus(message, kind = 'info') {
  refundStatus.hidden = false;
  refundStatus.dataset.kind = kind;
  refundStatus.textContent = message;
}

refundForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!refundForm.reportValidity() || refundButton.disabled) return;
  const token = window.turnstile?.getResponse();
  if (!token) {
    showRefundStatus('Please complete the security verification before submitting.', 'error');
    return;
  }
  const payload = {
    customer_email: document.getElementById('refund-email').value.trim(),
    paypal_transaction_id: document.getElementById('refund-transaction').value.trim(),
    reason: document.getElementById('refund-reason').value.trim(),
    turnstile_token: token
  };
  if (payload.reason.length < 10) {
    showRefundStatus('Please provide at least 10 characters explaining your request.', 'error');
    return;
  }
  refundButton.disabled = true;
  refundButton.setAttribute('aria-busy', 'true');
  showRefundStatus('Submitting your request…');
  try {
    const response = await fetch(`${REFUND_API}/api/refunds/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.received || !data.reference) {
      throw new Error(data.error || 'Unable to submit your request. Please try again.');
    }
    refundForm.reset();
    window.turnstile?.reset();
    refundForm.querySelectorAll('input, textarea, button').forEach(element => { element.disabled = true; });
    showRefundStatus(`Your refund request has been received. Reference: ${data.reference}. Please keep this number for your records. We'll review your request.`, 'success');
  } catch (error) {
    showRefundStatus(error instanceof TypeError
      ? 'Unable to contact the refund service. Please check your connection and try again.'
      : String(error.message || 'Submission failed.'), 'error');
    window.turnstile?.reset();
    refundButton.disabled = false;
  } finally {
    refundButton.removeAttribute('aria-busy');
  }
});
