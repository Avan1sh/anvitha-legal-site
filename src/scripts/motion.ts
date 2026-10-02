import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  gsap.registerPlugin(ScrollTrigger);

  // On wider screens, keep the explanation in view while the three steps pass beside it.
  const media = gsap.matchMedia();
  media.add('(min-width: 901px)', () => {
    const intro = document.querySelector('.approach-intro');
    const root = document.querySelector('[data-motion-root]');
    if (!intro || !root) return;
    ScrollTrigger.create({
      trigger: root,
      start: 'top 10%',
      end: 'bottom bottom',
      pin: intro,
      pinSpacing: false
    });
  });

  // Text stays fully readable without script; this gently reveals it during scrolling.
  const title = document.querySelector('[data-text-reveal]');
  if (title) {
    gsap.fromTo(
      title,
      { opacity: 0.45 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: title, start: 'top 85%', end: 'top 35%', scrub: true }
      }
    );
  }
}
