document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

// Test checkout only. Never include API secrets in browser code.
const VOZ_API = 'https://voz-license-api.voztts.workers.dev';
const buyButton = document.getElementById('buy-pro');
const statusElement = document.getElementById('checkout-status');
let checkoutBusy = false;

function checkoutStatus(message, kind = 'info') {
  if (!statusElement) return;
  statusElement.hidden = false;
  statusElement.textContent = message;
  statusElement.dataset.kind = kind;
}

async function checkoutPost(path, payload = {}) {
  const response = await fetch(`${VOZ_API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store'
  });
  let result;
  try { result = await response.json(); } catch { throw new Error('Unexpected response from checkout server.'); }
  if (!response.ok) throw new Error(result.error || `Checkout request failed (${response.status}).`);
  return result;
}

function setBusy(busy) {
  checkoutBusy = busy;
  if (buyButton) {
    buyButton.disabled = busy;
    buyButton.setAttribute('aria-busy', String(busy));
  }
}

if (buyButton) {
  buyButton.addEventListener('click', async () => {
    if (checkoutBusy) return;
    setBusy(true);
    checkoutStatus('Connecting to PayPal Sandbox…');
    try {
      const order = await checkoutPost('/api/checkout/sandbox/create-order');
      const approval = new URL(order.approval_url);
      // Never redirect to an arbitrary URL supplied by a compromised response.
      if (approval.protocol !== 'https:' || !['www.sandbox.paypal.com', 'sandbox.paypal.com'].includes(approval.hostname)) {
        throw new Error('Unexpected PayPal approval URL.');
      }
      window.location.assign(approval.href);
    } catch (error) {
      checkoutStatus(`Could not start checkout: ${error.message}`, 'error');
      setBusy(false);
    }
  });
}

(async function processPayPalReturn() {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('paypal');
  if (state === 'cancel') {
    checkoutStatus('PayPal checkout was cancelled. You have not been charged.', 'info');
    window.history.replaceState({}, '', window.location.pathname);
    return;
  }
  if (state !== 'success') return;
  const orderId = params.get('token');
  if (!orderId || !/^[A-Z0-9]{10,30}$/.test(orderId)) {
    checkoutStatus('PayPal returned without a valid order reference. Contact support if you completed payment.', 'error');
    return;
  }
  setBusy(true);
  checkoutStatus('Checking your Sandbox payment and preparing your licence email…');
  try {
    const result = await checkoutPost('/api/checkout/sandbox/capture-order', { order_id: orderId });
    if (!result.completed) throw new Error('Payment completion could not be confirmed.');
    if (result.email_status === 'sent') {
      checkoutStatus('Sandbox purchase complete! Your Voz Pro test licence has been emailed to the authorised test inbox. Check your inbox and spam folder.', 'success');
    } else {
      checkoutStatus(`Sandbox payment complete and licence saved, but email delivery is ${result.email_status || 'pending'}. Please contact support with your PayPal order reference: ${orderId}`, 'warning');
    }
    window.history.replaceState({}, '', window.location.pathname);
  } catch (error) {
    checkoutStatus(`Could not finish checkout automatically: ${error.message} Order reference: ${orderId}. Please contact support or refresh this page to retry.`, 'error');
    // Keep PayPal return token in URL so a refresh can retry safely.
  } finally {
    setBusy(false);
  }
})();
