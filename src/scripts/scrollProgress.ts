const rail = document.querySelector<HTMLElement>('[data-scroll-progress]');
const scroller = document.scrollingElement;

if (rail && scroller) {
  let updateFrame = 0;

  const maxScroll = () => Math.max(0, scroller.scrollHeight - scroller.clientHeight);

  const update = () => {
    updateFrame = 0;
    const max = maxScroll();
    const hasOverflow = max > 1;
    rail.hidden = !hasOverflow;
    rail.tabIndex = hasOverflow ? 0 : -1;
    document.documentElement.classList.toggle('has-scroll-progress', hasOverflow);

    if (!hasOverflow) return;

    const progress = Math.min(1, Math.max(0, scroller.scrollTop / max));
    rail.style.setProperty('--scroll-progress', String(progress));
    rail.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
  };

  const scheduleUpdate = () => {
    if (!updateFrame) updateFrame = window.requestAnimationFrame(update);
  };

  const scrollToPointer = (clientY: number) => {
    const bounds = rail.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (clientY - bounds.top) / bounds.height));
    window.scrollTo({ top: progress * maxScroll(), behavior: 'instant' });
  };

  rail.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    rail.setPointerCapture(event.pointerId);
    scrollToPointer(event.clientY);
  });

  rail.addEventListener('pointermove', (event) => {
    if (rail.hasPointerCapture(event.pointerId)) scrollToPointer(event.clientY);
  });

  rail.addEventListener('pointerup', (event) => {
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
  });

  rail.addEventListener('keydown', (event) => {
    const pageStep = window.innerHeight * 0.9;
    const lineStep = 80;
    let target: number | undefined;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        target = scroller.scrollTop + lineStep;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        target = scroller.scrollTop - lineStep;
        break;
      case 'PageDown':
        target = scroller.scrollTop + pageStep;
        break;
      case 'PageUp':
        target = scroller.scrollTop - pageStep;
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = maxScroll();
        break;
    }

    if (target === undefined) return;
    event.preventDefault();
    window.scrollTo({ top: target, behavior: 'instant' });
  });

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate, { once: true });
  new ResizeObserver(scheduleUpdate).observe(document.body);
  update();
}
