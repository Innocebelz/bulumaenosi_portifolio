/* ==========================================================================
   RENDER + INTERACTION LOGIC
   Reads from data.js and populates index.html. You shouldn't need to edit
   this file to update content — edit js/data.js instead.
   ========================================================================== */

// ---------- small helpers ----------
const el = (tag, cls, html) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html !== undefined) node.innerHTML = html;
  return node;
};

/**
 * Builds an <img> with a graceful fallback to a Lucide icon if the image
 * is missing or fails to load — so the site never shows a broken-image icon,
 * whether or not you've dropped a real photo in yet.
 *
 * secondarySrc (optional) is tried once before giving up on a photo entirely —
 * used for the avatar, which falls back to a generated initials avatar
 * (ui-avatars.com) before falling back to a plain icon.
 */
function imageWithFallback({ src, secondarySrc, alt, fallbackIcon, wrapperClass, iconClass }) {
  const wrapper = el('div', wrapperClass);
  const img = el('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  const fallback = el('div', 'fallback-icon');
  fallback.innerHTML = `<i data-lucide="${fallbackIcon}" class="${iconClass}"></i>`;
  fallback.style.display = 'none';

  let triedSecondary = false;
  img.addEventListener('error', () => {
    if (secondarySrc && !triedSecondary) {
      triedSecondary = true;
      img.src = secondarySrc;
      return;
    }
    img.style.display = 'none';
    fallback.style.display = 'flex';
  });

  wrapper.appendChild(img);
  wrapper.appendChild(fallback);
  return wrapper;
}

/** Generated initials avatar, used as a fallback before a real photo exists. */
function initialsAvatarUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111827&color=22D3EE&size=256&bold=true`;
}

// ---------- HERO ----------
function renderHero() {
  document.getElementById('hero-avatar').replaceWith(
      Object.assign(
          imageWithFallback({
            src: PROFILE.avatar,
            secondarySrc: initialsAvatarUrl(PROFILE.name),
            alt: PROFILE.name,
            fallbackIcon: 'user',
            wrapperClass: 'avatar-frame w-20 h-20 mb-6',
            iconClass: 'w-8 h-8 text-cyan',
          }),
          { id: 'hero-avatar' }
      )
  );

  document.getElementById('hero-name').innerHTML =
      PROFILE.name.split(' ')[0] + ' <span class="grad-text">' + PROFILE.name.split(' ').slice(1).join(' ') + '</span>';

  document.getElementById('hero-intro').textContent = PROFILE.intro;
  document.getElementById('hero-cv').href = PROFILE.cvUrl;

  const socials = document.getElementById('hero-socials');
  socials.innerHTML = `
    <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-slate-400 hover:text-cyan transition-colors"><i data-lucide="github" class="w-5 h-5"></i></a>
    <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-slate-400 hover:text-cyan transition-colors"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
    <a href="mailto:${PROFILE.email}" aria-label="Email" class="text-slate-400 hover:text-cyan transition-colors"><i data-lucide="mail" class="w-5 h-5"></i></a>
  `;

  document.getElementById('footer-socials').innerHTML = `
    <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-slate-400 hover:text-cyan transition-colors"><i data-lucide="github" class="w-4 h-4"></i></a>
    <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-slate-400 hover:text-cyan transition-colors"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
    <a href="mailto:${PROFILE.email}" aria-label="Email" class="text-slate-400 hover:text-cyan transition-colors"><i data-lucide="mail" class="w-4 h-4"></i></a>
  `;

  const first = PROFILE.name.split(' ')[0].toLowerCase();
  document.getElementById('hero-terminal-body').innerHTML = `
    <p class="text-slate-500">$ python whoami.py</p>
    <p class="mt-2"><span class="text-cyan">${first}</span>.name = <span class="text-emerald">"${PROFILE.name}"</span></p>
    <p><span class="text-cyan">${first}</span>.based_in = <span class="text-emerald">"${PROFILE.location}"</span></p>
    <p><span class="text-cyan">${first}</span>.focus = [<span class="text-emerald">"AI"</span>, <span class="text-emerald">"ML"</span>, <span class="text-emerald">"Systems"</span>]</p>
    <p><span class="text-cyan">${first}</span>.status = <span class="text-emerald">"building &amp; learning"</span></p>
    <p class="text-slate-500 mt-2">$ <span class="animate-pulse">_</span></p>
  `;
}

// ---------- ABOUT ----------
function renderAbout() {
  const bio = document.getElementById('about-bio');
  bio.innerHTML = PROFILE.bio.map(p => `<p>${p}</p>`).join('');

  const highlights = document.getElementById('about-highlights');
  ABOUT_HIGHLIGHTS.forEach(h => {
    const accentText = h.accent === 'cyan' ? 'text-cyan' : 'text-emerald';
    highlights.appendChild(el('div', 'glass rounded-2xl p-5', `
      <i data-lucide="${h.icon}" class="w-6 h-6 ${accentText} mb-3"></i>
      <p class="font-display font-semibold text-slate-100 mb-1">${h.title}</p>
      <p class="text-xs text-slate-400">${h.desc}</p>
    `));
  });
}

// ---------- EDUCATION ----------
function renderEducation() {
  const timeline = document.getElementById('education-timeline');
  EDUCATION_DATA.forEach((e, idx) => {
    const item = el('div', 'relative pb-4');
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', String(idx * 100));
    item.innerHTML = `
      <span class="absolute -left-[34px] top-1 w-4 h-4 rounded-full bg-bg border-2 border-cyan shadow-[0_0_12px_rgba(34,211,238,0.6)]"></span>
      <div class="glass rounded-2xl p-7">
        <div class="flex flex-wrap items-center gap-3 justify-between mb-2">
          <h3 class="font-display text-xl font-bold text-slate-50">${e.program}</h3>
          <span class="font-mono-ui text-xs text-emerald bg-emerald/10 px-3 py-1 rounded-full">${e.status}</span>
        </div>
        <p class="text-cyan font-medium mb-1">${e.institution}</p>
        <p class="text-sm text-slate-500 mb-5 flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${e.location}</p>
        <p class="text-sm text-slate-400 mb-3 font-medium">Relevant coursework</p>
        <div class="flex flex-wrap gap-2">
          ${e.coursework.map(c => `<span class="text-xs font-mono-ui px-3 py-1.5 rounded-full bg-white/5 border border-slate-700 text-slate-300">${c}</span>`).join('')}
        </div>
      </div>
    `;
    timeline.appendChild(item);
  });
}

// ---------- SKILLS ----------
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  SKILLS_DATA.forEach((cat, idx) => {
    const accentText = cat.accent === 'cyan' ? 'text-cyan' : 'text-emerald';
    const accentBg = cat.accent === 'cyan' ? 'bg-cyan' : 'bg-emerald';
    const card = el('div', 'glass glow-border rounded-2xl p-6');
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String((idx % 3) * 100));
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-5">
        <span class="w-9 h-9 rounded-lg ${cat.accent === 'cyan' ? 'bg-cyan/10' : 'bg-emerald/10'} flex items-center justify-center">
          <i data-lucide="${cat.icon}" class="w-4 h-4 ${accentText}"></i>
        </span>
        <h3 class="font-display font-semibold text-slate-100">${cat.title}</h3>
      </div>
      <div class="space-y-3">
        ${cat.items.map(([name, level]) => `
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-slate-300">${name}</span>
              <span class="text-slate-500 font-mono-ui">${level}%</span>
            </div>
            <div class="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div class="skill-fill h-full rounded-full ${accentBg}" data-level="${level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ---------- PROJECTS ----------
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  PROJECTS_DATA.forEach((p, idx) => {
    const isLarge = p.size === 'large';
    const card = el('article', `glass glow-border rounded-2xl overflow-hidden flex flex-col group ${isLarge ? 'md:col-span-2 lg:flex-row' : ''}`);
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String((idx % 2) * 100));

    const media = imageWithFallback({
      src: p.image,
      alt: p.title,
      fallbackIcon: p.icon,
      wrapperClass: `project-media ${isLarge ? 'lg:w-2/5 min-h-[220px]' : 'h-48'}`,
      iconClass: 'w-14 h-14 text-cyan/50',
    });
    card.appendChild(media);

    const body = el('div', 'p-6 sm:p-7 flex-1 flex flex-col');
    let techHtml = '';
    if (p.tech.length) {
      techHtml = `<div class="flex flex-wrap gap-2 mb-5">${p.tech.map((t, i) =>
          `<span class="text-xs font-mono-ui px-2.5 py-1 rounded-md ${i % 2 === 0 ? 'bg-cyan/10 text-cyan' : 'bg-emerald/10 text-emerald'}">${t}</span>`
      ).join('')}</div>`;
    }

    let highlightsHtml = '';
    if (p.highlights.length) {
      if (p.listStyle) {
        highlightsHtml = `<div class="grid sm:grid-cols-2 gap-2 text-sm text-slate-300 mb-2">${p.highlights.map(h =>
            `<span class="flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-cyan"></i> ${h}</span>`
        ).join('')}</div>`;
      } else {
        highlightsHtml = `<ul class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-400 mb-6">${p.highlights.map(h =>
            `<li class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald"></i> ${h}</li>`
        ).join('')}</ul>`;
      }
    }

    const linksHtml = `<div class="flex gap-3 mt-auto pt-2">
      ${p.github ? `<a href="${p.github}" class="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-slate-700 hover:border-cyan/60 hover:text-cyan transition-colors"><i data-lucide="github" class="w-4 h-4"></i> GitHub</a>` : ''}
      ${p.demo ? `<a href="${p.demo}" class="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-cyan/90 text-bg hover:bg-cyan transition-colors"><i data-lucide="external-link" class="w-4 h-4"></i> Live Demo</a>` : ''}
    </div>`;

    body.innerHTML = `
      <h3 class="font-display text-lg sm:text-xl font-bold text-slate-50 mb-2">${p.title}</h3>
      <p class="text-sm text-slate-400 leading-relaxed mb-4">${p.description}</p>
      ${techHtml}
      ${highlightsHtml}
      ${linksHtml}
    `;
    card.appendChild(body);
    grid.appendChild(card);
  });
}

// ---------- LEADERSHIP ----------
function renderLeadership() {
  const container = document.getElementById('leadership-card');
  container.innerHTML = `
    <div class="glass glow-border rounded-2xl p-8 sm:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-start">
      <div class="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center">
        <i data-lucide="${LEADERSHIP_DATA.icon}" class="w-7 h-7 text-emerald"></i>
      </div>
      <div>
        <h3 class="font-display text-xl font-bold text-slate-50 mb-3">${LEADERSHIP_DATA.title}</h3>
        <p class="text-slate-400 leading-relaxed">${LEADERSHIP_DATA.description}</p>
      </div>
    </div>
  `;
}

// ---------- LEARNING ----------
function renderLearning() {
  const current = document.getElementById('learning-current');
  current.innerHTML = LEARNING_DATA.current.map(item =>
      `<li class="flex items-center gap-3 text-sm text-slate-300"><span class="w-1.5 h-1.5 rounded-full bg-cyan"></span> ${item}</li>`
  ).join('');

  const future = document.getElementById('learning-future');
  future.innerHTML = LEARNING_DATA.future.map(item =>
      `<span class="text-xs font-mono-ui px-3 py-1.5 rounded-full border border-emerald/30 text-emerald/90">${item}</span>`
  ).join('');
}

// ---------- ACHIEVEMENTS ----------
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  ACHIEVEMENTS_DATA.forEach((a, idx) => {
    const item = el('div');
    item.setAttribute('data-aos', 'zoom-in');
    item.setAttribute('data-aos-delay', String(idx * 80));
    if (a.type === 'counter') {
      item.innerHTML = `
        <p class="font-display text-3xl sm:text-4xl font-bold grad-text counter" data-target="${a.target}" data-suffix="${a.suffix}">0</p>
        <p class="text-xs text-slate-500 mt-2 font-mono-ui">${a.label}</p>
      `;
    } else {
      item.innerHTML = `
        <p class="font-display text-2xl sm:text-3xl font-bold grad-text">${a.value}</p>
        <p class="text-xs text-slate-500 mt-2 font-mono-ui">${a.label}</p>
      `;
    }
    grid.appendChild(item);
  });
}

// ---------- PHILOSOPHY ----------
function renderPhilosophy() {
  document.getElementById('philosophy-quote').textContent = `"${PROFILE.quote}"`;
}

// ---------- CONTACT ----------
function renderContact() {
  const cards = document.getElementById('contact-cards');
  cards.innerHTML = `
    <a href="mailto:${PROFILE.email}" class="glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan/50 transition-colors">
      <span class="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0"><i data-lucide="mail" class="w-5 h-5 text-cyan"></i></span>
      <div><p class="text-xs text-slate-500 font-mono-ui">Email</p><p class="text-sm text-slate-200">${PROFILE.email}</p></div>
    </a>
    <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" class="glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan/50 transition-colors">
      <span class="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0"><i data-lucide="github" class="w-5 h-5 text-cyan"></i></span>
      <div><p class="text-xs text-slate-500 font-mono-ui">GitHub</p><p class="text-sm text-slate-200">${PROFILE.github.replace('https://','')}</p></div>
    </a>
    <a href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer" class="glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan/50 transition-colors">
      <span class="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0"><i data-lucide="linkedin" class="w-5 h-5 text-cyan"></i></span>
      <div><p class="text-xs text-slate-500 font-mono-ui">LinkedIn</p><p class="text-sm text-slate-200">${PROFILE.linkedin.replace('https://','')}</p></div>
    </a>
    <div class="glass rounded-2xl p-5 flex items-center gap-4">
      <span class="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0"><i data-lucide="map-pin" class="w-5 h-5 text-emerald"></i></span>
      <div><p class="text-xs text-slate-500 font-mono-ui">Location</p><p class="text-sm text-slate-200">${PROFILE.location}</p></div>
    </div>
  `;
}

// ---------- Run all renderers, then wire up icons + interactions ----------
renderHero();
renderAbout();
renderEducation();
renderSkills();
renderProjects();
renderLeadership();
renderLearning();
renderAchievements();
renderPhilosophy();
renderContact();

lucide.createIcons();
AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 60 });

window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hide'), 400);
});

if (window.Typed) {
  new Typed('#typed-role', {
    strings: PROFILE.roles,
    typeSpeed: 42,
    backSpeed: 22,
    backDelay: 1400,
    loop: true,
    smartBackspace: true,
  });
}

// ---------- Scroll progress + navbar state + active link ----------
const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';

  navbar.classList.toggle('bg-bg/80', scrollTop > 20);
  navbar.classList.toggle('backdrop-blur-md', scrollTop > 20);
  navbar.classList.toggle('border-b', scrollTop > 20);
  navbar.classList.toggle('border-slate-800/60', scrollTop > 20);

  backToTop.classList.toggle('show', scrollTop > 500);

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (scrollTop >= top) current = sec.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  menuBtn.setAttribute('aria-expanded', 'false');
}
menuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!isHidden));
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) closeMobileMenu();
});

// ---------- CV download safety net ----------
// If PROFILE.cvUrl in data.js is still a placeholder ("#"), let the person
// know instead of navigating to a dead link. Once you set a real cvUrl this
// no-ops and the download just works.
document.getElementById('hero-cv').addEventListener('click', (e) => {
  if (!PROFILE.cvUrl || PROFILE.cvUrl === '#') {
    e.preventDefault();
    alert('CV PDF coming soon — please contact me via email for the latest resume.');
  }
});

// ---------- Mouse glow ----------
const glow = document.getElementById('mouse-glow');
window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
}, { passive: true });

// ---------- Animated counters ----------
function animateCounter(node) {
  const target = parseInt(node.dataset.target, 10);
  const suffix = node.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.counter').forEach(node => counterObserver.observe(node));

// ---------- Skill bar fill on scroll into view ----------
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(node => skillObserver.observe(node));

// ---------- Contact form ----------
// No backend on a static site, so this opens the visitor's email client with
// the message pre-filled. Swap this handler for a Formspree/EmailJS call if
// you add a real backend later.
const form = document.getElementById('contact-form');
const status = document.getElementById('cf-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${body}`;

  status.textContent = "Opening your email client…";
  status.classList.remove('hidden');
  window.location.href = mailto;
  form.reset();
  setTimeout(() => status.classList.add('hidden'), 5000);
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Particle background (constellation effect, retina-sharp, pauses off-tab) ----------
(function initParticles() {
  const canvas = document.getElementById('particles');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { canvas.style.display = 'none'; return; }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;
  let width = 0, height = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = document.documentElement.scrollHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function initParticleArray() {
    const count = Math.min(70, Math.floor((width * height) / 26000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      c: Math.random() > 0.5 ? '34,211,238' : '16,185,129',
      a: Math.random() * 0.5 + 0.15,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.a})`;
      ctx.fill();

      // constellation lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    rafId = requestAnimationFrame(draw);
  }

  resize();
  initParticleArray();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); initParticleArray(); }, 150);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else draw();
  });
})();
