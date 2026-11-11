/**
 * BRANAVI™ | MOTOR DE ANIMACIONES, RED NEURONAL INTERACTIVA Y SIMULADORES EN VIVO
 * Propuesta V2 (Animada Moderna) — Mantiene Propuesta V1 en version_1_clasica.html
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. BARRA DE PROGRESO DE SCROLL & NAVBAR DINÁMICO
     ========================================================================== */
  const scrollProgress = document.getElementById('scrollProgress');
  const mainNavbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${pct}%`;

    if (scrollTop > 40) {
      mainNavbar.classList.add('scrolled');
    } else {
      mainNavbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mainNavbar.classList.toggle('mobile-open');
    });
  }

  navLinks.forEach((lnk) => {
    lnk.addEventListener('click', () => {
      mainNavbar.classList.remove('mobile-open');
      navLinks.forEach((a) => a.classList.remove('active'));
      lnk.classList.add('active');
    });
  });

  /* ==========================================================================
     2. CANVAS DE RED NEURONAL OMNICANAL INTERACTIVA EN EL HERO
     ========================================================================== */
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    const count = Math.min(55, Math.floor((window.innerWidth || 1200) / 26));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        r: Math.random() * 2 + 1.2,
      });
    }

    const animateNetwork = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.65)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist / 135) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 170) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - mdist / 170) * 0.48})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateNetwork);
    };

    animateNetwork();
  }

  /* ==========================================================================
     3. ROTADOR DE TEXTO TIPOGRÁFICO EN EL HERO (QUÉ HACE BRANAVI)
     ========================================================================== */
  const dynamicHeadline = document.getElementById('dynamicHeadline');
  const phrases = [
    'las cobranzas ES HOY.',
    'tu Contact Center BPO.',
    'la auditoría con IA.',
    'la omnicanalidad 24/7.',
    'el recupero de activos.',
  ];
  let phraseIdx = 0;
  let charIdx = phrases[0].length;
  let isDeleting = true;

  const runTypewriter = () => {
    if (!dynamicHeadline) return;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
      dynamicHeadline.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(runTypewriter, 260);
      } else {
        setTimeout(runTypewriter, 32);
      }
    } else {
      charIdx++;
      dynamicHeadline.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(runTypewriter, 2600);
      } else {
        setTimeout(runTypewriter, 58);
      }
    }
  };

  setTimeout(runTypewriter, 2500);

  /* ==========================================================================
     4. EFECTO 3D TILT + SLIDESHOW AUTOMÁTICO + TICKER EN EL CENTRO DE COMANDO
     ========================================================================== */
  const heroTiltCard = document.getElementById('heroTiltCard');
  if (heroTiltCard) {
    heroTiltCard.addEventListener('mousemove', (e) => {
      const rect = heroTiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      heroTiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroTiltCard.addEventListener('mouseleave', () => {
      heroTiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // Rotador automático de fotos reales de la sede en el Hero + Ticker en vivo
  const heroSlideImg = document.getElementById('heroSlideImg');
  const heroSlideTag = document.getElementById('heroSlideTag');
  const heroSlideTitle = document.getElementById('heroSlideTitle');
  const liveTickerBadge = document.getElementById('liveTickerBadge');
  const liveTickerText = document.getElementById('liveTickerText');

  const heroSlides = [
    {
      img: 'assets/oficina_panoramica.jpg',
      tag: 'Planta Operativa Convención 1343',
      title: 'Doble Sala de Contact Center & Estudio Jurídico',
      badge: 'IA AUDIT',
      ticker: 'Transcribiendo y analizando sentimiento en 100% de llamadas...',
    },
    {
      img: 'assets/oficina_operadores_1.jpg',
      tag: 'Equipos Estables • Baja Rotación',
      title: '+30 Agentes Especializados en Recupero y Ventas',
      badge: 'PREDICTIVO',
      ticker: '+250.000 llamadas mensuales con conexión inmediata...',
    },
    {
      img: 'assets/oficina_boxes_2.jpg',
      tag: 'Boxes Fonoabsorbentes IP',
      title: 'Omnicanalidad: Voz, WhatsApp, SMS y Redes Sociales',
      badge: 'VOICE BLASTER',
      ticker: '+200.000 disparos IVR mensuales y Bots activos 24/7...',
    },
    {
      img: 'assets/oficina_isla_3.jpg',
      tag: 'Respaldo Pre-Judicial In-House',
      title: 'Sinergia Directa con Estudio Jurídico BRANAVI',
      badge: 'EJECUTIVO',
      ticker: 'Escalamiento pre-judicial y judicial sin intermediarios...',
    },
  ];

  let slideIdx = 0;
  setInterval(() => {
    slideIdx = (slideIdx + 1) % heroSlides.length;
    const s = heroSlides[slideIdx];
    if (heroSlideImg) {
      heroSlideImg.style.opacity = '0.35';
      setTimeout(() => {
        heroSlideImg.src = s.img;
        if (heroSlideTag) heroSlideTag.textContent = s.tag;
        if (heroSlideTitle) heroSlideTitle.textContent = s.title;
        if (liveTickerBadge) liveTickerBadge.textContent = s.badge;
        if (liveTickerText) liveTickerText.textContent = s.ticker;
        heroSlideImg.style.opacity = '1';
      }, 240);
    }
  }, 4500);

  /* ==========================================================================
     5. SCROLL REVEAL & CONTADORES NUMÉRICOS ANIMADOS
     ========================================================================== */
  const revealEls = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.js-counter');
  let countersStarted = false;

  // Los contadores arrancan en 0 y suben hasta su cifra al entrar en pantalla
  counters.forEach((c) => { c.textContent = '0'; });

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2600;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(step);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (!countersStarted && entry.target.querySelector('.js-counter')) {
            countersStarted = true;
            animateCounters();
          }
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* ==========================================================================
     6. SPOTLIGHT LUMINOSO Y FILTRO DEL ECOSISTEMA "QUÉ HACEMOS"
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  const ecoTabs = document.querySelectorAll('.eco-tab');
  const ecoCards = document.querySelectorAll('#ecosystemGrid .tilt-card');

  ecoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-eco');
      ecoTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      ecoCards.forEach((card) => {
        const cat = card.getAttribute('data-eco-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. CONSOLA INTERACTIVA DE TECNOLOGÍA & AUDITORÍA CON IA
     ========================================================================== */
  const aiItems = document.querySelectorAll('.ai-feature-item');
  const aiConsoleTitle = document.getElementById('aiConsoleTitle');
  const aiLineAgent = document.getElementById('aiLineAgent');
  const aiLineClient = document.getElementById('aiLineClient');
  const aiScore1 = document.getElementById('aiScore1');
  const aiScore2 = document.getElementById('aiScore2');
  const aiScore3 = document.getElementById('aiScore3');
  const aiBar1 = document.getElementById('aiBar1');
  const aiBar2 = document.getElementById('aiBar2');
  const aiBar3 = document.getElementById('aiBar3');

  aiItems.forEach((item) => {
    item.addEventListener('click', () => {
      aiItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');

      if (aiConsoleTitle) aiConsoleTitle.textContent = item.getAttribute('data-ai-title');
      if (aiLineAgent) aiLineAgent.innerHTML = `<strong>Operativa BRANAVI:</strong> ${item.getAttribute('data-ai-agent')}`;
      if (aiLineClient) aiLineClient.innerHTML = `<strong>Respuesta / Impacto:</strong> ${item.getAttribute('data-ai-client')}`;

      const s1 = item.getAttribute('data-ai-score1');
      const s2 = item.getAttribute('data-ai-score2');
      const s3 = item.getAttribute('data-ai-score3');
      if (aiScore1) aiScore1.textContent = s1;
      if (aiScore2) aiScore2.textContent = s2;
      if (aiScore3) aiScore3.textContent = s3;
      if (aiBar1) aiBar1.style.width = s1;
      if (aiBar2) aiBar2.style.width = s2;
      if (aiBar3) aiBar3.style.width = s3;
    });
  });

  /* ==========================================================================
     8. GALERÍA INTERACTIVA DE INFRAESTRUCTURA (SEDE MONTEVIDEO)
     ========================================================================== */
  const galleryMainPhoto = document.getElementById('galleryMainPhoto');
  const galleryMainHeading = document.getElementById('galleryMainHeading');
  const galleryMainSub = document.getElementById('galleryMainSub');
  const galleryThumbs = document.querySelectorAll('.gallery-thumb-item');

  galleryThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      galleryThumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');

      const photo = thumb.getAttribute('data-photo');
      const heading = thumb.getAttribute('data-heading');
      const sub = thumb.getAttribute('data-sub');

      if (galleryMainPhoto) {
        galleryMainPhoto.style.opacity = '0.3';
        setTimeout(() => {
          galleryMainPhoto.src = photo;
          if (galleryMainHeading) galleryMainHeading.textContent = heading;
          if (galleryMainSub) galleryMainSub.textContent = sub;
          galleryMainPhoto.style.opacity = '1';
        }, 160);
      }
    });
  });

  /* ==========================================================================
     9. FORMULARIO INTELIGENTE TRIPLE (EMPRESAS / QUIERO PAGAR / RRHH)
     ========================================================================== */
  const modePillBtns = document.querySelectorAll('.mode-pill-btn');
  const lblExtra = document.getElementById('lblExtra');
  const fExtra = document.getElementById('fExtra');
  const lblServicio = document.getElementById('lblServicio');
  const fServicio = document.getElementById('fServicio');
  const lblMensaje = document.getElementById('lblMensaje');
  const fMensaje = document.getElementById('fMensaje');
  const btnSubmitForm = document.getElementById('btnSubmitForm');
  const unifiedContactForm = document.getElementById('unifiedContactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');

  let activeFormMode = 'empresa';

  const setFormMode = (mode) => {
    activeFormMode = mode;
    modePillBtns.forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-form-mode') === mode);
    });

    if (mode === 'deudor') {
      lblExtra.textContent = 'Cédula de Identidad (sin puntos ni guiones) *';
      fExtra.placeholder = 'Ej: 41234567';
      lblServicio.textContent = 'Gestión de Pago Solicitada *';
      fServicio.innerHTML = `
        <option value="Conocer saldo actualizado y opciones de quita contado">Conocer mi saldo actualizado y opciones de quita contado</option>
        <option value="Solicitar plan de refinanciación en cuotas">Solicitar plan de refinanciación en cuotas</option>
        <option value="Informar un pago o comprobante ya realizado">Informar un pago o comprobante ya realizado</option>
        <option value="Solicitar constancia de cancelación / Libre de deuda">Solicitar constancia de cancelación / Libre de deuda</option>
      `;
      lblMensaje.textContent = 'Entidad Acreedora o Comentario Adicional *';
      fMensaje.placeholder = 'Indicá la empresa acreedora o el horario en que preferís recibir tu propuesta por WhatsApp...';
      btnSubmitForm.textContent = 'Solicitar Propuesta de Regularización';
    } else if (mode === 'rrhh') {
      lblExtra.textContent = 'Puesto al que te Postulás / Barrio *';
      fExtra.placeholder = 'Ej: Operador de Cobranzas / Centro, Cordón...';
      lblServicio.textContent = 'Área y Disponibilidad *';
      fServicio.innerHTML = `
        <option value="Operador Telefónico de Cobranzas (Mañana / Tarde)">Operador Telefónico de Cobranzas (Mañana / Tarde)</option>
        <option value="Agente de Televentas y Atención Omnicanal">Agente de Televentas y Atención Omnicanal</option>
        <option value="Gestor Avanzado Pre-Judicial / Estudio Jurídico">Gestor Avanzado Pre-Judicial / Estudio Jurídico</option>
        <option value="Supervisión / Auditoría de Calidad">Supervisión / Auditoría de Calidad</option>
      `;
      lblMensaje.textContent = 'Resumen de tu Experiencia en Call Center o Área Legal *';
      fMensaje.placeholder = 'Contanos brevemente tu experiencia previa en cobranzas, ventas o atención telefónica...';
      btnSubmitForm.textContent = 'Enviar Postulación a RRHH BRANAVI™';
    } else {
      lblExtra.textContent = 'Empresa / Razón Social *';
      fExtra.placeholder = 'Nombre de la empresa o institución';
      lblServicio.textContent = 'Servicio de Contact Center Requerido *';
      fServicio.innerHTML = `
        <option value="Gestión Integral de Cobranzas (Mora Preventiva, Temprana, Tardía y Pre-Judicial)">Gestión Integral de Cobranzas (Mora Preventiva, Temprana, Tardía y Pre-Judicial)</option>
        <option value="Telemarketing, Televentas Outbound y Teleagendamiento">Telemarketing, Televentas Outbound y Teleagendamiento</option>
        <option value="Atención al Cliente Inbound Omnicanal y Retención">Atención al Cliente Inbound Omnicanal y Retención</option>
        <option value="Campañas Masivas Voice Blaster, IVR Interactivo y Bots 24/7">Campañas Masivas Voice Blaster, IVR Interactivo y Bots 24/7</option>
        <option value="Enriquecimiento de Bases de Datos (BBDD), Encuestas y Back Office">Enriquecimiento de Bases de Datos (BBDD), Encuestas y Back Office</option>
      `;
      lblMensaje.textContent = 'Volumen Estimado o Detalle de la Operativa *';
      fMensaje.placeholder = 'Contanos brevemente sobre tu cartera o campaña para preparar una propuesta comercial a medida...';
      btnSubmitForm.textContent = 'Solicitar Propuesta a BRANAVI Connect';
    }
  };

  modePillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setFormMode(btn.getAttribute('data-form-mode'));
    });
  });

  // Botones del navbar/hero que preseleccionan el modo del formulario
  document.querySelectorAll('[data-select-mode]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetMode = trigger.getAttribute('data-select-mode');
      if (targetMode) setFormMode(targetMode);
    });
  });

  if (unifiedContactForm) {
    unifiedContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('fNombre').value.trim();
      const extra = fExtra.value.trim();
      const email = document.getElementById('fEmail').value.trim();
      const tel = document.getElementById('fTel').value.trim();
      const servicio = fServicio.value;
      const mensaje = fMensaje.value.trim();

      const etiquetas = {
        empresa: 'Consulta Comercial / Jurídica',
        deudor: 'Autogestión de Deuda (Quiero Pagar)',
        rrhh: 'Postulación Laboral RRHH',
      };

      const tipo = etiquetas[activeFormMode] || 'Contacto Web';

      if (formStatusMsg) {
        formStatusMsg.style.display = 'block';
        formStatusMsg.textContent = `¡Gracias, ${nombre}! Preparando el envío directo a info@estudiobranavi.com...`;
      }

      const subject = encodeURIComponent(`[BRANAVI Web] ${tipo} - ${nombre} (${extra})`);
      const body = encodeURIComponent(
        `Solicitud enviada desde el Portal Web BRANAVI™:\n\n` +
        `• Categoría: ${tipo}\n` +
        `• Nombre y Apellido: ${nombre}\n` +
        `• Empresa / CI / Perfil: ${extra}\n` +
        `• Correo Electrónico: ${email}\n` +
        `• Teléfono: ${tel}\n` +
        `• Servicio / Gestión: ${servicio}\n\n` +
        `Detalle:\n${mensaje}\n`
      );

      setTimeout(() => {
        window.location.href = `mailto:info@estudiobranavi.com?subject=${subject}&body=${body}`;
      }, 400);
    });
  }
});
