/**
 * BRANAVI CONTACT CENTER & BPO | LÓGICA INTERACTIVA CORPORATIVA
 * Sitio Oficial: https://branaviconnect.com | https://estudiobranavi.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Sticky & Menú Móvil
  const navbar = document.getElementById('mainNavbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-open');
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 2. Filtro Interactivo de Soluciones BPO & Ciclo de Cobranzas
  const tabBtns = document.querySelectorAll('.bpo-tab-btn');
  const serviceCards = document.querySelectorAll('#servicesGrid .service-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Galería Interactiva de Infraestructura (Fotos Reales Sede Montevideo)
  const infraMainImg = document.getElementById('infraMainImg');
  const infraMainTitle = document.getElementById('infraMainTitle');
  const infraMainDesc = document.getElementById('infraMainDesc');
  const infraThumbs = document.querySelectorAll('.infra-thumb');

  infraThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const imgSrc = thumb.getAttribute('data-img');
      const title = thumb.getAttribute('data-title');
      const desc = thumb.getAttribute('data-desc');

      infraThumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');

      if (infraMainImg) {
        infraMainImg.style.opacity = '0.35';
        setTimeout(() => {
          infraMainImg.src = imgSrc;
          if (infraMainTitle) infraMainTitle.textContent = title;
          if (infraMainDesc) infraMainDesc.textContent = desc;
          infraMainImg.style.opacity = '1';
        }, 160);
      }
    });
  });

  // 4. Formulario de Autogestión / Quiero Pagar (Deudores y Titulares)
  const quickPayForm = document.getElementById('quickPayForm');
  if (quickPayForm) {
    quickPayForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('qpNombre').value.trim();
      const cedula = document.getElementById('qpCedula').value.trim();
      const tel = document.getElementById('qpTelefono').value.trim();
      const motivo = document.getElementById('qpMotivo').value;

      const subject = encodeURIComponent(`Autogestión de Pago - CI ${cedula} - ${nombre}`);
      const body = encodeURIComponent(
        `Solicitud desde Portal de Autogestión BRANAVI Contact Center:\n\n` +
        `• Titular: ${nombre}\n` +
        `• Cédula de Identidad: ${cedula}\n` +
        `• Celular de contacto: ${tel}\n` +
        `• Gestión solicitada: ${motivo}\n`
      );
      window.location.href = `mailto:info@estudiobranavi.com?subject=${subject}&body=${body}`;
    });
  }

  // 5. Selector Dual del Formulario de Contacto (Empresas B2B vs Trabajá con Nosotros RRHH)
  const modeBtns = document.querySelectorAll('.form-mode-btn');
  const lblEmpresa = document.getElementById('lblEmpresa');
  const inpEmpresa = document.getElementById('corpEmpresa');
  const lblServicio = document.getElementById('lblServicio');
  const selServicio = document.getElementById('corpServicio');
  const lblMensaje = document.getElementById('lblMensaje');
  const txtMensaje = document.getElementById('corpMensaje');
  const corporateForm = document.getElementById('corporateForm');
  const formFeedback = document.getElementById('formFeedback');

  let currentMode = 'empresa';

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentMode = btn.getAttribute('data-mode');
      modeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (currentMode === 'rrhh') {
        lblEmpresa.textContent = 'Cargo al que se postula / Experiencia *';
        inpEmpresa.placeholder = 'Ej: Operador de Cobranzas / Supervisor / Telemarketing';
        lblServicio.textContent = 'Disponibilidad Horaria *';
        selServicio.innerHTML = `
          <option value="Postulación Operador Turno Mañana / Tarde">Operador de Contact Center (Turno Mañana / Tarde)</option>
          <option value="Postulación Gestor de Cobranza Avanzada">Gestor Especializado en Cobranza Tardía / Pre-Judicial</option>
          <option value="Postulación Telemarketing y Ventas">Agente de Telemarketing y Ventas Outbound</option>
          <option value="Postulación Supervisión / Calidad">Supervisión Operativa / Auditoría de Calidad</option>
        `;
        lblMensaje.textContent = 'Resumen de Experiencia Laboral en Call Center o Cobranzas *';
        txtMensaje.placeholder = 'Indicanos tu experiencia previa en atención telefónica, cobranzas o ventas y tu barrio de residencia en Montevideo...';
      } else {
        lblEmpresa.textContent = 'Empresa / Institución *';
        inpEmpresa.placeholder = 'Nombre de su compañía';
        lblServicio.textContent = 'Servicio de Interés Principal *';
        selServicio.innerHTML = `
          <option value="Gestión Integral de Cobranzas (Mora Temprana, Tardía y Judicial)">Gestión Integral de Cobranzas (Mora Preventiva, Temprana, Tardía y Judicial)</option>
          <option value="Contact Center Outbound / Telemarketing y Ventas">Contact Center Outbound / Telemarketing y Ventas</option>
          <option value="Atención Omnicanal Inbound y Customer Care">Atención Omnicanal Inbound y Customer Care</option>
          <option value="Campañas Masivas Voice Blaster, IVR y Bots 24/7">Campañas Masivas Voice Blaster, IVR y Bots 24/7</option>
          <option value="Patrocinio y Ejecución Legal con Estudio Jurídico BRANAVI">Patrocinio y Ejecución Legal con Estudio Jurídico BRANAVI</option>
        `;
        lblMensaje.textContent = 'Detalle de la Operativa o Volumen Estimado *';
        txtMensaje.placeholder = 'Cuéntenos brevemente sobre su cartera o necesidad operativa para preparar una propuesta a medida...';
      }
    });
  });

  if (corporateForm) {
    corporateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('corpNombre').value.trim();
      const empresa = inpEmpresa.value.trim();
      const email = document.getElementById('corpEmail').value.trim();
      const tel = document.getElementById('corpTel').value.trim();
      const servicio = selServicio.value;
      const mensaje = txtMensaje.value.trim();

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.textContent = `Solicitud registrada para ${nombre}. Abriendo su cliente de correo para envío directo a info@estudiobranavi.com...`;
      }

      const tipo = currentMode === 'rrhh' ? 'Postulación RRHH' : 'Propuesta Comercial B2B';
      const subject = encodeURIComponent(`[BRANAVI Web] ${tipo} - ${empresa} (${nombre})`);
      const body = encodeURIComponent(
        `Contacto recibido desde la Web Oficial BRANAVI Contact Center (branaviconnect.com):\n\n` +
        `• Tipo de Solicitud: ${tipo}\n` +
        `• Nombre y Apellido: ${nombre}\n` +
        `• Empresa / Perfil: ${empresa}\n` +
        `• Email: ${email}\n` +
        `• Teléfono: ${tel}\n` +
        `• Área / Servicio: ${servicio}\n\n` +
        `Mensaje:\n${mensaje}\n`
      );

      setTimeout(() => {
        window.location.href = `mailto:info@estudiobranavi.com?subject=${subject}&body=${body}`;
      }, 450);
    });
  }
});

