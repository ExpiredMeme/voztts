document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

// Cycle through the five supplied screenshots, in upload order.
const frames = Array.from(document.querySelectorAll('.screenshot-frame'));
if (frames.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let current = 0;
  window.setInterval(() => {
    frames[current].classList.remove('active');
    current = (current + 1) % frames.length;
    frames[current].classList.add('active');
  }, 6500);
}
