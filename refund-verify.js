const API='https://voz-license-api.voztts.workers.dev';
const button=document.getElementById('confirm');
const result=document.getElementById('result');
const token=new URLSearchParams(location.hash.slice(1)).get('token');
history.replaceState(null,'',location.pathname);
if(!token||!/^[0-9a-f]{64}$/.test(token)){button.disabled=true;result.textContent='Invalid verification link.';}
button.addEventListener('click',async()=>{
 button.disabled=true;result.textContent='Verifying purchase and processing Sandbox refund…';
 try {const r=await fetch(`${API}/api/refunds/verify-auto`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token}),cache:'no-store'});
 const data=await r.json().catch(()=>({}));
 if(r.ok&&data.refunded){result.textContent=`Sandbox refund completed. Reference: ${data.reference}. PayPal refund: ${data.paypal_refund_id}. The licence has been revoked.`;}
 else{result.textContent=data.message||data.error||'Refund could not be confirmed. Please contact support. Do not retry this link.';}}
 catch{result.textContent='Network error. The refund outcome may be uncertain. Contact support before attempting again.';}
});
