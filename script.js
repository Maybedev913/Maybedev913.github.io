/* EDIT YOUR LINKS AND PROJECT MEDIA HERE.
   Empty URLs remain visibly marked placeholders; they never open a broken link.
   Media paths can point to PNG, JPG, WebP, SVG, or GIF assets. */
const PORTFOLIO = {
  links: {
    github: 'https://github.com/Maybedev913',
    linkedin: 'https://www.linkedin.com/in/devpathak21',
    resume: '/assets/DevResume2026.pdf',
    email: 'mailto:devpatk@gmail.com',
    racing: 'https://github.com/Maybedev913/PolygenceProject',
    vr: 'https://github.com/Maybedev913/BILVRTHerapy',
    mikloset: 'https://github.com/Maybedev913/mikloset-mobile',
  },
  media: {
    racing: 'assets/projects/racing.gif',
    vr: 'assets/projects/vr.gif',
    mikloset: 'assets/projects/mikloset.gif', // Clear to show the three screenshot slots below instead.
    closet: '', // TODO: e.g. 'assets/projects/closet.webp'
    stylist: '', // TODO: e.g. 'assets/projects/stylist.webp'
    looks: '', // TODO: e.g. 'assets/projects/looks.webp'
  },
};

document.querySelectorAll('[data-link]').forEach(link => {
  const url = PORTFOLIO.links[link.dataset.link];
  if (!url) return;
  link.href = link.dataset.link === 'resume' && location.protocol === 'file:'
    ? new URL('assets/DevResume2026.pdf', location.href).href
    : url;
  link.removeAttribute('aria-disabled');
  if (['racing', 'vr', 'mikloset'].includes(link.dataset.link)) link.textContent = 'View repository ↗';
  if (url.startsWith('https://')) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

const mediaDescriptions = {
  racing: 'Multi-Car Racing reinforcement-learning demonstration',
  vr: 'BLL VR Therapy immersive experience',
  mikloset: 'MIKLOSET mobile application walkthrough',
  closet: 'MIKLOSET digital closet screen',
  stylist: 'MIKLOSET AI stylist screen',
  looks: 'MIKLOSET saved looks screen',
};
document.querySelectorAll('[data-media]').forEach(container => {
  const path = PORTFOLIO.media[container.dataset.media];
  if (!path) return;
  const image = new Image();
  image.className = 'replacement-image';
  image.alt = mediaDescriptions[container.dataset.media];
  image.decoding = 'async';
  image.onload = () => container.replaceChildren(image);
  // Load near the viewport; detached images cannot use native lazy loading.
  if ('IntersectionObserver' in window) {
    const mediaObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      image.src = path;
      mediaObserver.disconnect();
    }, { rootMargin: '300px' });
    mediaObserver.observe(container);
  } else image.src = path;
});

document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.project, .experience-row, .about, .skills-grid').forEach(element => {
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
  const sectionsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionsObserver.observe(section));
}
