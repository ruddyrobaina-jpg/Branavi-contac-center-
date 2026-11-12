document.addEventListener('DOMContentLoaded', () => {
  const progress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('mainNavbar');
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = String(max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (toggle && navbar) toggle.addEventListener('click', () => navbar.classList.toggle('mobile-open'));
  navLinks.forEach((link) => link.addEventListener('click', () => {
    if (navbar) navbar.classList.remove('mobile-open');
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  }));

  const canvas = document.getElementById('neuralCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const context = canvas.getContext('2d');
    const points = [];
    let width = 0;
    let height = 0;
    const mouse = { x: -1000, y: -1000 };
    const resize = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('mousemove', (event) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });
    const count = Math.min(78, Math.floor((window.innerWidth || 1200) / 17));
    for (let i = 0; i < count; i += 1) points.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, r: Math.random() * 1.5 + .7 });
    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        context.beginPath();
        context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        context.fillStyle = 'rgba(147,197,253,.78)';
        context.fill();
        for (let j = index + 1; j < points.length; j += 1) {
          const peer = points[j];
          const distance = Math.hypot(point.x - peer.x, point.y - peer.y);
          if (distance < 125) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(peer.x, peer.y);
            context.strokeStyle = 'rgba(96,165,250,' + ((1 - distance / 125) * .26) + ')';
            context.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    draw();
  }

  const dynamicHeadline = document.getElementById('dynamicHeadline');
  const phrases = ['tus decisiones legales.', 'tu patrimonio.', 'tu familia.', 'tu empresa.'];
  if (dynamicHeadline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let phraseIndex = 0;
    window.setInterval(() => {
      dynamicHeadline.style.opacity = '0';
      window.setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        dynamicHeadline.textContent = phrases[phraseIndex];
        dynamicHeadline.style.opacity = '1';
      }, 250);
    }, 3600);
  }

  const slides = document.querySelectorAll('.hero-slide');
  const title = document.getElementById('heroSlideTitle');
  const tag = document.getElementById('heroSlideTag');
  const slideInfo = [
    ['Estudio Jurídico y Escribanía', 'Atención para personas y empresas'],
    ['Equipo BRANAVI', 'Asesoría jurídica, notarial y empresarial'],
    ['Atención profesional', 'Seguimiento claro de cada consulta'],
    ['Sede de BRANAVI', 'Convención 1343, Piso 9'],
  ];
  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
      if (title) title.textContent = slideInfo[index][0];
      if (tag) tag.textContent = slideInfo[index][1];
    }, 4500);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  document.querySelectorAll('.eco-tab').forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.eco;
    document.querySelectorAll('.eco-tab').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('[data-eco-cat]').forEach((card) => {
      const show = category === 'all' || card.dataset.ecoCat === category;
      card.style.display = show ? '' : 'none';
    });
  }));

  const form = document.getElementById('legalForm');
  const status = document.getElementById('legalStatus');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const getValue = (id) => document.getElementById(id).value.trim();
    const subject = encodeURIComponent('[Consulta web] ' + getValue('lArea') + ' — ' + getValue('lNombre'));
    const body = encodeURIComponent('Nombre: ' + getValue('lNombre') + '\nTeléfono: ' + getValue('lTel') + '\nCorreo: ' + getValue('lEmail') + '\nMotivo: ' + getValue('lArea') + '\n\nConsulta:\n' + getValue('lMensaje'));
    if (status) { status.style.display = 'block'; status.textContent = 'Se abrirá su correo para enviar la consulta a info@estudiobranavi.com.'; }
    window.setTimeout(() => { window.location.href = 'mailto:info@estudiobranavi.com?subject=' + subject + '&body=' + body; }, 300);
  });
});
