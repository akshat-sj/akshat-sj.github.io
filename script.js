const _y = document.getElementById('year');
if (_y) _y.textContent = new Date().getFullYear();

(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cur = document.querySelector('.cursor');
  if (!cur) return;
  let x = 0, y = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
  const tick = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(tick);
  };
  tick();

  const hoverable = 'a, summary, button, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverable)) cur.classList.add('hover');
    if (e.target.closest('.topnav')) cur.classList.add('on-nav');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverable)) cur.classList.remove('hover');
    if (e.target.closest('.topnav') && !e.relatedTarget?.closest?.('.topnav')) cur.classList.remove('on-nav');
  });
  document.addEventListener('mousedown', () => cur.classList.add('click'));
  document.addEventListener('mouseup', () => cur.classList.remove('click'));
})();
