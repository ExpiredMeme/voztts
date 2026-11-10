(() => {
  const dialog = document.getElementById('screenshot-viewer');
  const large = document.getElementById('viewer-image');
  const caption = document.getElementById('viewer-caption');
  const scroll = dialog.querySelector('.viewer-scroll');
  let zoom = 1;
  function render() {
    large.style.width = `${Math.round(large.naturalWidth * zoom)}px`;
    large.style.height = 'auto';
  }
  document.querySelectorAll('.guide-figure img').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role','button');
    img.setAttribute('aria-label', `${img.alt}. Open enlarged screenshot`);
    function open() {
      large.src = img.currentSrc || img.src;
      large.alt = img.alt;
      caption.textContent = img.closest('figure').querySelector('figcaption')?.textContent || 'Screenshot';
      zoom = 1;
      large.onload = () => {
        zoom = Math.min(1, Math.max(.1, (scroll.clientWidth - 32) / large.naturalWidth));
        render();
      };
      dialog.showModal();
    }
    img.addEventListener('click',open);
    img.addEventListener('keydown',e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  document.getElementById('viewer-zoom-in').addEventListener('click',() => { zoom=Math.min(4,zoom*1.4);render(); });
  document.getElementById('viewer-zoom-out').addEventListener('click',() => { zoom=Math.max(.1,zoom/1.4);render(); });
  document.getElementById('viewer-reset').addEventListener('click',() => { zoom=Math.min(1,(scroll.clientWidth-32)/large.naturalWidth);render(); });
  document.getElementById('viewer-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => {if(e.target===dialog) dialog.close();});
})();
