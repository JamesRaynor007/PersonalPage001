/* ===================================================================
   ALEJANDRO CÉSAR CASTELLANO — INTERACTIVE CLIENT LOGIC (app.js)
   - Particle Telemetry Canvas
   - Bilingual Translation Engine (EN / ES)
   - Working Capital & Cash Conversion Cycle (CCC) Simulator
   - Portfolio Project Filtering
   - Interactive UX & Clipboard Utilities
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavigation();
  initLanguageSwitcher();
  initFinancialCalculator();
  initProjectFilters();
  initClipboardUtils();
  initContactForm();
});

/* ===================================================================
   1. PARTICLES & TELEMETRY STREAMLINES CANVAS
   =================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.3 ? 'rgba(0, 242, 254, ' : 'rgba(79, 172, 254, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/* ===================================================================
   2. NAVBAR & NAVIGATION
   =================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      toggleBtn.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.innerHTML = '☰';
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* ===================================================================
   3. BILINGUAL TRANSLATION SYSTEM (ENGLISH / SPANISH)
   =================================================================== */
const translations = {
  en: {
    // Navigation
    nav_story: "Life Story",
    nav_education: "Education",
    nav_contracting: "Contracting",
    nav_businesses: "Businesses",
    nav_tool: "Financial Tool",
    nav_motorsports: "MotorSports",
    nav_hobbies: "Hobbies",
    nav_projects: "Projects",
    nav_contact: "Contact",
    btn_hire: "Hire Me",

    // Hero
    hero_avail: "Available for Foreign & Remote Contracts",
    hero_tag_arg: "Argentine CPA · 31 Years",
    hero_tag_ds: "Data Scientist Graduate",
    hero_tag_fs: "Full Stack Track (40% Conquer Blocks)",
    hero_title: "Alejandro César Castellano",
    hero_subtitle: "Certified Public Accountant | Data Scientist | Full Stack Developer",
    hero_desc: "Bridging the gap between Certified Accounting discipline, Big Data engineering, and modern full-stack application development. 31 years old, Argentinean, delivering high-leverage professional contractor services to global clients and tech companies.",
    hero_cta_projects: "Explore Work",
    hero_cta_calc: "Launch CCC Tool",
    hero_spec_age: "31 Years",
    hero_spec_age_lbl: "Single · High Focus",
    hero_spec_repos: "90+ Repos",
    hero_spec_repos_lbl: "GitHub Activity",
    hero_spec_cpa: "UNMdP",
    hero_spec_cpa_lbl: "Certified Accountant",
    hero_spec_ds: "DSPT-12",
    hero_spec_ds_lbl: "Soy Henry Graduate",

    // Metrics Strip
    metric_1_num: "90+",
    metric_1_lbl: "Public Repositories & Implementations",
    metric_2_num: "100%",
    metric_2_lbl: "CPA Degree (UNMdP) & Certified Data Scientist",
    metric_3_num: "40%",
    metric_3_lbl: "Full Stack Track Completed at Conquer Blocks",
    metric_4_num: "Global",
    metric_4_lbl: "Remote Contractor for Overseas Clients",

    // Life Story
    story_tag: "Biography & Perspective",
    story_title: "The Intersection of Financial Rigor & Code",
    story_lead: "Born and based on Argentina's Atlantic coast in Necochea, my mission has always been driven by numbers, systems, and relentless optimization.",
    story_p1: "After graduating with a Certified Public Accountant (CPA) degree from the Facultad de Ciencias Económicas at Universidad Nacional de Mar del Plata (UNMdP), I immersed myself in audits, corporate taxes, financial statements, and business consulting.",
    story_p2: "Yet, working with modern companies revealed a stark bottleneck: manual spreadsheets and fragmented data silos were holding teams back. That spark led me into Data Science — graduating from Soy Henry's intensive bootcamp, mastering Python, SQL, GCP (Google Cloud Platform), machine learning pipelines, and executive dashboards in Power BI.",
    story_p3: "To close the loop and build fully autonomous digital products, I am currently completing the Full Stack Developer curriculum at Conquer Blocks (now at 40%). At 31, single and fully dedicated, I bring a unique dual-mindset as an international contractor: the prudence and precision of a licensed accountant paired with the architectural speed of a modern developer.",
    story_box_title: "Dual Advantage: Financial Prudence + Engineering Speed",
    story_box_text: "Most engineers don't understand balance sheets or cross-border cash conversions; most accountants don't know how to query BigQuery or build full-stack web applications. I bridge both worlds seamlessly.",
    story_stat1_title: "Necochea, Buenos Aires",
    story_stat1_sub: "Coastal roots with global remote reach",
    story_stat2_title: "31 Years Old · Single",
    story_stat2_sub: "Agile, focused, and available for abroad contracts",
    story_stat3_title: "Multi-Disciplinary Stack",
    story_stat3_sub: "Accounting + Data Science + Full-Stack Web",

    // Education
    edu_tag: "Academic & Tech Formation",
    edu_title: "Rigorous Degrees & Specialized Training",
    edu_desc: "A proven trajectory combining traditional university excellence in economic sciences with cutting-edge tech bootcamps.",
    edu_cpa_status: "Graduated Degree",
    edu_cpa_title: "Certified Public Accountant (Contador Público)",
    edu_cpa_inst: "Facultad de Ciencias Económicas · UNMdP",
    edu_cpa_desc: "Comprehensive 5-year university degree covering financial reporting, auditing standards, corporate taxation, managerial cost accounting, corporate finance, and commercial law.",
    edu_ds_status: "Finished Formation",
    edu_ds_title: "Certified Data Scientist",
    edu_ds_inst: "Soy Henry Bootcamp (Cohort DSPT-12)",
    edu_ds_desc: "800+ hours of hands-on data engineering & science. Developed end-to-end Machine Learning pipelines, ETL/ELT flows, Google Cloud Platform (BigQuery) architectures, Python data analysis (Pandas, NumPy, Scikit-learn), and Power BI reporting.",
    edu_fs_status: "In Progress (40%)",
    edu_fs_title: "Full Stack Developer Track",
    edu_fs_inst: "Conquer Blocks Academy",
    edu_fs_desc: "Comprehensive engineering curriculum covering semantic HTML5, modern CSS3 architecture, JavaScript (ES6+), React component ecosystems, Node.js backend integrations, REST APIs, and modern web application development.",
    edu_fs_progress_lbl: "Course Completion Progress",

    // Contractor & Businesses
    bus_tag: "Contracting & Ventures",
    bus_title: "Professional Services & Digital Products",
    bus_desc: "Empowering foreign businesses, international teams, and local clients with automated accounting, fractional controller services, and tailored web applications.",
    contractor_title: "Global Professional Services Contractor",
    contractor_text: "I partner with foreign startups, international agencies, and overseas companies looking for an agile, remote contractor who understands global financial workflows, cash flow predictability, and data automation.",
    perk_1: "Cross-border financial reconciliation & multi-currency reporting",
    perk_2: "Custom automated accounting pipelines & ERP data cleanup",
    perk_3: "Fractional controller & executive KPI dashboard architecture",
    perk_4: "Direct fluent communication & asynchronous delivery",
    contractor_cta_title: "Ready to streamline your finances?",
    contractor_cta_sub: "Direct contractor invoices · Flexible timezones",
    contractor_cta_btn: "Inquire for Services",

    bus_card1_cat: "Financial Tech",
    bus_card1_title: "SoftwareContable & Accounting HUB",
    bus_card1_desc: "Proprietary transaction logging, journal ledger, and automated balance sheet generator designed to streamline bookkeeping and financial closing periods.",
    bus_card2_cat: "Working Capital Tool",
    bus_card2_title: "Cash Conversion Cycle (CCC) Engine",
    bus_card2_desc: "Comprehensive analytical tool designed to model DIO, DSO, and DPO, enabling founders and financial managers to unlock trapped cash flow.",
    bus_card3_cat: "Data Pipeline",
    bus_card3_title: "GCP Automated Ingestion Engine",
    bus_card3_desc: "Cloud-native Python loaders ('cargacrudaGCP001' & 'JsonMergerGCP') designed to feed raw corporate records into BigQuery and data warehouses.",
    bus_card4_cat: "Logistics Web App",
    bus_card4_title: "Transporte LC Platform",
    bus_card4_desc: "Logistics and freight web portal tailored for commercial transport, quote tracking, and fleet visibility.",
    bus_card5_cat: "Sports Portal",
    bus_card5_title: "Club Náutico Tenis Web",
    bus_card5_desc: "Web solution developed for tennis tournaments, member management, court booking notices, and coastal sports scheduling.",
    bus_card6_cat: "E-Commerce",
    bus_card6_title: "Decime Tortuga Store",
    bus_card6_desc: "Custom e-commerce application featuring responsive catalog architecture, checkout workflows, and inventory tracking.",

    // Calculator Tool
    tool_tag: "Interactive Financial Simulator",
    tool_title: "Live Cash Conversion Cycle (CCC) Simulator",
    tool_desc: "Test my financial engineering firsthand. Enter your operational numbers below to simulate your Working Capital efficiency and Cash Conversion Cycle in real-time.",
    tool_lbl_rev: "Annual Revenue ($)",
    tool_lbl_cogs: "Cost of Goods Sold (COGS) ($)",
    tool_lbl_inv: "Average Inventory ($)",
    tool_lbl_ar: "Accounts Receivable (AR) ($)",
    tool_lbl_ap: "Accounts Payable (AP) ($)",
    tool_btn_calc: "Recalculate Cycle",
    tool_result_lbl: "Cash Conversion Cycle (Days)",
    tool_sub_dio: "Days Inventory (DIO)",
    tool_sub_dso: "Days Sales (DSO)",
    tool_sub_dpo: "Days Payable (DPO)",
    tool_margin_lbl: "Gross Margin",

    // MotorSports
    race_tag: "Precision & Telemetry",
    race_title: "MotorSports: The Pursuit of the Limit",
    race_desc: "In racing, as in financial data science, the difference between winning and losing is measured in hundredths of a second and tenths of a percentage point.",
    race_banner_tag: "Telemetry & Performance HUD",
    race_banner_title: "On-Board Analysis & Sim-Racing Telemetry",
    race_banner_sub: "Analyzing Super Formula Barber Park laps, tire thermal degradation, throttle traces, and apex braking deltas.",
    race_card1_title: "Sim-Racing & eMotorsports",
    race_card1_desc: "Active competitive driver in open-wheel and GT simulations (Super Formula, Barber Motorsports Park telemetry, Spa, Suzuka). Passionate about chassis setup, aero balance, and race strategy under changing track conditions.",
    race_card2_title: "Data & Telemetry Extraction",
    race_card2_desc: "Applying data science principles directly to racing: plotting G-force vectors, throttle modulation, braking pressure, and suspension travel to identify micro-second optimizations on every lap.",
    race_card3_title: "Global Motorsport Culture",
    race_card3_desc: "Avid follower of Formula 1, World Endurance Championship (WEC), 24 Hours of Le Mans, World Rally Championship (WRC), and Argentina's legendary national categories like Turismo Carretera.",

    // Hobbies
    hobbies_tag: "Life Beyond Work",
    hobbies_title: "Passions, Hobbies & Wellness",
    hobbies_desc: "Balancing intense analytical focus with dynamic personal passions that keep mind and body sharp.",
    hobby_1_title: "StarCraft II & Sci-Fi",
    hobby_1_desc: "The inspiration behind my handle 'JamesRaynor007'. Passionate about real-time strategy, tactical APM, macro-economy resource management, and sci-fi lore.",
    hobby_2_title: "Tennis Player",
    hobby_2_desc: "Active recreational and competitive tennis player, famous among peers for having a devastating, laser-accurate one-handed backhand.",
    hobby_3_title: "Strength & Yoga",
    hobby_3_desc: "Disciplined physical training combined with regular yoga routines to maintain mental composure, core strength, and ergonomic stamina during long coding and audit sessions.",
    hobby_4_title: "Languages & Culinary",
    hobby_4_desc: "Lifelong linguist advancing English to C2 proficiency and learning conversational Italian. Enthusiastic home cook crafting Mediterranean and Argentine flavors.",

    // Projects
    projects_tag: "Open Source & Repositories",
    projects_title: "Selected GitHub Projects",
    projects_desc: "Highlights from over 90 repositories on GitHub covering accounting systems, data engineering pipelines, web portals, and performance tools.",
    filter_all: "All Projects",
    filter_finance: "Finance & Accounting",
    filter_data: "Data Science & GCP",
    filter_web: "Web Applications",

    // Contact
    contact_tag: "Get in Touch",
    contact_title: "Let's Build Something Exceptional",
    contact_desc: "Whether you need a dedicated contractor for foreign financial operations, an automated data analytics pipeline, or custom software development, I'm just a message away.",
    contact_lead: "Currently accepting overseas contracts, consulting inquiries, and full-stack collaborative roles.",
    contact_email_lbl: "Professional Email",
    contact_li_lbl: "LinkedIn Profile",
    contact_gh_lbl: "GitHub Profile",
    contact_btn_copy: "Copy",
    contact_btn_copied: "Copied!",
    contact_form_name: "Your Name / Company",
    contact_form_email: "Your Email",
    contact_form_service: "Service Required",
    contact_opt_contractor: "Foreign Contractor / Remote Accounting",
    contact_opt_data: "Data Science & Automated Pipelines",
    contact_opt_web: "Full Stack Web Development",
    contact_opt_consult: "General Financial Consulting",
    contact_form_msg: "Tell me about your project or inquiry...",
    contact_btn_send: "Send Direct Message",
    contact_toast: "Thank you! Opening your email client to connect with Alejandro.",

    footer_rights: "© 2026 Alejandro César Castellano. All rights reserved.",
    footer_built: "Engineered with Passion · Necochea, Argentina"
  },

  es: {
    // Navigation
    nav_story: "Mi Historia",
    nav_education: "Educación",
    nav_contracting: "Servicios",
    nav_businesses: "Emprendimientos",
    nav_tool: "Simulador Financiero",
    nav_motorsports: "Automovilismo",
    nav_hobbies: "Pasatiempos",
    nav_projects: "Proyectos",
    nav_contact: "Contacto",
    btn_hire: "Contratarme",

    // Hero
    hero_avail: "Disponible para Contratos en el Exterior y Remotos",
    hero_tag_arg: "Contador Público · 31 Años",
    hero_tag_ds: "Data Scientist Certificado",
    hero_tag_fs: "Full Stack (40% en Conquer Blocks)",
    hero_title: "Alejandro César Castellano",
    hero_subtitle: "Contador Público Nacional | Data Scientist | Full Stack Developer",
    hero_desc: "Uniendo la rigurosidad y disciplina contable con la potencia de la Ciencia de Datos y el desarrollo web moderno. 31 años, argentino, brindando servicios profesionales de contractor para clientes y empresas del exterior.",
    hero_cta_projects: "Ver Trabajos",
    hero_cta_calc: "Simulador CCC",
    hero_spec_age: "31 Años",
    hero_spec_age_lbl: "Soltero · Gran Enfoque",
    hero_spec_repos: "90+ Repos",
    hero_spec_repos_lbl: "Actividad en GitHub",
    hero_spec_cpa: "UNMdP",
    hero_spec_cpa_lbl: "Contador Público",
    hero_spec_ds: "DSPT-12",
    hero_spec_ds_lbl: "Graduado Soy Henry",

    // Metrics Strip
    metric_1_num: "90+",
    metric_1_lbl: "Repositorios Públicos e Implementaciones",
    metric_2_num: "100%",
    metric_2_lbl: "Título Contador (UNMdP) y Data Scientist",
    metric_3_num: "40%",
    metric_3_lbl: "Carrera Full Stack Completada en Conquer Blocks",
    metric_4_num: "Global",
    metric_4_lbl: "Contractor Remoto para Clientes del Exterior",

    // Life Story
    story_tag: "Biografía y Perspectiva",
    story_title: "La Confluencia del Rigor Financiero y el Código",
    story_lead: "Nacido y radicado en la costa atlántica argentina, en Necochea, mi camino siempre ha estado guiado por los números, los sistemas y la optimización continua.",
    story_p1: "Tras graduarme como Contador Público en la Facultad de Ciencias Económicas de la Universidad Nacional de Mar del Plata (UNMdP), me sumergí en auditorías, tributación, balances y consultoría empresarial.",
    story_p2: "Sin embargo, el trabajo con empresas modernas evidenció un cuello de botella crítico: las planillas de cálculo manuales y la información desconectada frenaban el crecimiento. Esa convicción me llevó a la Ciencia de Datos — completando el bootcamp intensivo de Soy Henry, dominando Python, SQL, Google Cloud Platform (BigQuery), modelos de machine learning y dashboards en Power BI.",
    story_p3: "Para cerrar el círculo y crear productos digitales completos, actualmente curso la carrera de Full Stack Developer en Conquer Blocks (con un 40% finalizado). A mis 31 años, soltero y enfocado al máximo, ofrezco como contractor internacional una ventaja única: la prudencia y rigor de un contador matriculado junto a la velocidad constructiva de un programador moderno.",
    story_box_title: "Ventaja Dual: Prudencia Financiera + Velocidad Tecnológica",
    story_box_text: "La mayoría de los programadores desconocen el funcionamiento de un balance o el ciclo de conversión de caja; la mayoría de los contadores no saben consultar BigQuery ni desarrollar una aplicación web. Yo integro ambos mundos con solidez.",
    story_stat1_title: "Necochea, Buenos Aires",
    story_stat1_sub: "Raíces costeras con alcance remoto global",
    story_stat2_title: "31 Años · Soltero",
    story_stat2_sub: "Ágil, enfocado y disponible para contratos abroad",
    story_stat3_title: "Stack Multidisciplinario",
    story_stat3_sub: "Contabilidad + Data Science + Web Full Stack",

    // Education
    edu_tag: "Formación Académica y Tecnológica",
    edu_title: "Títulos Universitarios y Especializaciones",
    edu_desc: "Una trayectoria contrastada que fusiona la excelencia universitaria en ciencias económicas con bootcamps tecnológicos de vanguardia.",
    edu_cpa_status: "Grado Universitario",
    edu_cpa_title: "Contador Público",
    edu_cpa_inst: "Facultad de Ciencias Económicas · UNMdP",
    edu_cpa_desc: "Carrera de grado de 5 años con formación exhaustiva en auditoría externa, regímenes tributarios, confección de estados contables, contabilidad gerencial de costos, finanzas corporativas y derecho societario.",
    edu_ds_status: "Formación Completa",
    edu_ds_title: "Científico de Datos Certificado",
    edu_ds_inst: "Soy Henry Bootcamp (Cohorte DSPT-12)",
    edu_ds_desc: "Más de 800 horas de ingeniería y análisis de datos. Desarrollo de pipelines de Machine Learning, procesos ETL/ELT, arquitectura en Google Cloud Platform (BigQuery), análisis en Python (Pandas, NumPy, Scikit-learn) y reportería en Power BI.",
    edu_fs_status: "En Curso (40%)",
    edu_fs_title: "Carrera Desarrollador Full Stack",
    edu_fs_inst: "Conquer Blocks Academy",
    edu_fs_desc: "Plan integral de ingeniería web que abarca HTML5 semántico, maquetación CSS3 moderna, JavaScript ES6+, ecosistema de componentes React, integración backend con Node.js, APIs RESTful y fundamentos Web3.",
    edu_fs_progress_lbl: "Progreso del Plan de Estudios",

    // Contractor & Businesses
    bus_tag: "Servicios y Emprendimientos",
    bus_title: "Servicios Profesionales y Soluciones Digitales",
    bus_desc: "Potenciando empresas del exterior, equipos internacionales y clientes locales con contabilidad automatizada, controller fractional y aplicaciones a medida.",
    contractor_title: "Contractor de Servicios Profesionales para el Exterior",
    contractor_text: "Trabajo junto a startups extranjeras y empresas que requieren un contractor remoto independiente capaz de gestionar finanzas internacionales, conciliaciones multidivisa y automatizaciones con datos precisos.",
    perk_1: "Conciliación financiera internacional y reportes multi-moneda",
    perk_2: "Automatización de pipelines contables y saneamiento en ERPs",
    perk_3: "Controller fractional y arquitectura de tableros ejecutivos KPI",
    perk_4: "Comunicación directa y entregas asíncronas de alto impacto",
    contractor_cta_title: "¿Necesitas optimizar tus finanzas?",
    contractor_cta_sub: "Facturación directa de servicios · Horarios flexibles",
    contractor_cta_btn: "Solicitar Propuesta",

    bus_card1_cat: "Software Contable",
    bus_card1_title: "SoftwareContable & Accounting HUB",
    bus_card1_desc: "Sistema propio para carga de transacciones, libro diario y generación automatizada de balances, agilizando cierres mensuales y conciliaciones.",
    bus_card2_cat: "Capital de Trabajo",
    bus_card2_title: "Motor Ciclo de Conversión de Efectivo (CCC)",
    bus_card2_desc: "Herramienta analítica para medir días de inventario (DIO), cobro (DSO) y pago (DPO), permitiendo liberar liquidez atrapada.",
    bus_card3_cat: "Data Pipeline",
    bus_card3_title: "Pipeline Automatizado de Carga en GCP",
    bus_card3_desc: "Scripts en Python ('cargacrudaGCP001' y 'JsonMergerGCP') para la ingesta y ordenamiento automático de datos en Google Cloud y BigQuery.",
    bus_card4_cat: "Plataforma Logística",
    bus_card4_title: "Plataforma Transporte LC",
    bus_card4_desc: "Portal web para empresa de logística y carga pesada, con cotizaciones online y seguimiento de flotas.",
    bus_card5_cat: "Portal Deportivo",
    bus_card5_title: "Sitio Web Club Náutico Tenis",
    bus_card5_desc: "Solución web desarrollada para torneos de tenis, gestión de socios, reserva de canchas y cronogramas deportivos.",
    bus_card6_cat: "E-Commerce",
    bus_card6_title: "Tienda Decime Tortuga",
    bus_card6_desc: "Desarrollo de comercio electrónico con catálogo responsive, carrito de compras y control de stock.",

    // Calculator Tool
    tool_tag: "Simulador Financiero en Vivo",
    tool_title: "Simulador de Ciclo de Conversión de Efectivo (CCC)",
    tool_desc: "Prueba mis conocimientos contables y de código en vivo. Ingresa tus variables operativas para calcular en tiempo real la eficiencia del capital de trabajo.",
    tool_lbl_rev: "Ventas / Ingresos Anuales ($)",
    tool_lbl_cogs: "Costo de Ventas (COGS) ($)",
    tool_lbl_inv: "Inventario Promedio ($)",
    tool_lbl_ar: "Cuentas por Cobrar (Créditos) ($)",
    tool_lbl_ap: "Cuentas por Pagar (Proveedores) ($)",
    tool_btn_calc: "Recalcular Ciclo",
    tool_result_lbl: "Ciclo de Conversión de Efectivo (Días)",
    tool_sub_dio: "Días de Inventario (DIO)",
    tool_sub_dso: "Días de Cobro (DSO)",
    tool_sub_dpo: "Días de Pago (DPO)",
    tool_margin_lbl: "Margen Bruto",

    // MotorSports
    race_tag: "Precisión y Telemetría",
    race_title: "Automovilismo: En Busca del Límite",
    race_desc: "En el automovilismo, igual que en las finanzas y la ciencia de datos, la diferencia entre el éxito y el fracaso se mide en centésimas de segundo y décimas porcentuales.",
    race_banner_tag: "HUD de Telemetría y Rendimiento",
    race_banner_title: "Análisis On-Board y Telemetría en Sim-Racing",
    race_banner_sub: "Estudio de giros en Barber Park con Super Formula, degradación térmica de neumáticos, trazas de acelerador y puntos óptimos de frenado.",
    race_card1_title: "Sim-Racing y eMotorsports",
    race_card1_desc: "Piloto activo en simuladores competitivos de monoplazas y GT (Super Formula, Barber Motorsports Park, Spa, Suzuka). Pasión por la puesta a punto de chasis, balance aerodinámico y estrategia de carrera.",
    race_card2_title: "Extracción y Análisis de Datos",
    race_card2_desc: "Aplicación de ciencia de datos a la competición: vectores de fuerza G, modulación de frenada, presión hidráulica y recorrido de suspensión para limar milésimas en cada sector.",
    race_card3_title: "Cultura Automovilística Mundial",
    race_card3_desc: "Seguidor apasionado de la Fórmula 1, el Mundial de Resistencia (WEC), las 24 Horas de Le Mans, el WRC de Rally y categorías icónicas de Argentina como el Turismo Carretera.",

    // Hobbies
    hobbies_tag: "Vida Fuera del Trabajo",
    hobbies_title: "Pasiones, Hobbies y Equilibrio",
    hobbies_desc: "Combinando el rigor intelectual con pasatiempos dinámicos que mantienen la mente lúcida y el cuerpo en forma.",
    hobby_1_title: "StarCraft II y Ciencia Ficción",
    hobby_1_desc: "El origen de mi usuario 'JamesRaynor007'. Pasión por la estrategia en tiempo real, gestión macroeconómica de recursos, micro-tácticas y el universo de ciencia ficción.",
    hobby_2_title: "Jugador de Tenis",
    hobby_2_desc: "Jugador aficionado habitual y competitivo, reconocido entre compañeros por un revés a una mano muy sólido y punzante.",
    hobby_3_title: "Entrenamiento y Yoga",
    hobby_3_desc: "Rutinas diarias de fuerza combinadas con sesiones de yoga para mantener la postura, foco mental y energía durante extensas jornadas de análisis contable y desarrollo de código.",
    hobby_4_title: "Idiomas y Cocina",
    hobby_4_desc: "Estudiante constante perfeccionando el inglés hacia el nivel C2 y aprendiendo italiano. Amante de la cocina gourmet, fusionando recetas mediterráneas y argentinas.",

    // Projects
    projects_tag: "Código Abierto y Repositorios",
    projects_title: "Proyectos Destacados en GitHub",
    projects_desc: "Una selección de mis más de 90 repositorios públicos en GitHub, incluyendo sistemas contables, pipelines de datos en GCP y portales web.",
    filter_all: "Todos los Proyectos",
    filter_finance: "Finanzas y Contabilidad",
    filter_data: "Data Science y Cloud",
    filter_web: "Desarrollo Web",

    // Contact
    contact_tag: "Hablemos",
    contact_title: "Construyamos Algo Extraordinario",
    contact_desc: "Ya sea que busques un contractor para finanzas internacionales, un pipeline automatizado de datos o desarrollo de software a medida, conversemos.",
    contact_lead: "Actualmente disponible para contratos con el exterior, consultoría especializada y roles colaborativos full stack.",
    contact_email_lbl: "Email Profesional",
    contact_li_lbl: "Perfil de LinkedIn",
    contact_gh_lbl: "Perfil de GitHub",
    contact_btn_copy: "Copiar",
    contact_btn_copied: "¡Copiado!",
    contact_form_name: "Tu Nombre / Empresa",
    contact_form_email: "Tu Correo Electrónico",
    contact_form_service: "Servicio Requerido",
    contact_opt_contractor: "Contractor para el Exterior / Finanzas Remotas",
    contact_opt_data: "Data Science y Pipelines Automatizados",
    contact_opt_web: "Desarrollo Web Full Stack",
    contact_opt_consult: "Consultoría Contable General",
    contact_form_msg: "Cuéntame sobre tu proyecto o consulta...",
    contact_btn_send: "Enviar Mensaje Directo",
    contact_toast: "¡Muchas gracias! Abriendo tu gestor de correo para contactar a Alejandro.",

    footer_rights: "© 2026 Alejandro César Castellano. Todos los derechos reservados.",
    footer_built: "Desarrollado con Pasión · Necochea, Argentina"
  }
};

let currentLang = 'en';

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang === currentLang) return;

      currentLang = selectedLang;
      langButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      applyTranslations(currentLang);
      // Trigger a recalculation of the CCC tool to update localized commentary
      calculateCCC();
    });
  });
}

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-ph]');
  placeholders.forEach((el) => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

/* ===================================================================
   4. WORKING CAPITAL & CCC FINANCIAL ENGINE
   =================================================================== */
function initFinancialCalculator() {
  const form = document.getElementById('ccc-calculator-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.addEventListener('input', calculateCCC);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateCCC();
  });

  calculateCCC();
}

function calculateCCC() {
  const revInput = document.getElementById('calc-revenue');
  const cogsInput = document.getElementById('calc-cogs');
  const invInput = document.getElementById('calc-inventory');
  const arInput = document.getElementById('calc-ar');
  const apInput = document.getElementById('calc-ap');

  if (!revInput || !cogsInput || !invInput || !arInput || !apInput) return;

  const revenue = parseFloat(revInput.value) || 0;
  const cogs = parseFloat(cogsInput.value) || 0;
  const inventory = parseFloat(invInput.value) || 0;
  const ar = parseFloat(arInput.value) || 0;
  const ap = parseFloat(apInput.value) || 0;

  // Financial calculations
  const dio = cogs > 0 ? (inventory / cogs) * 365 : 0;
  const dso = revenue > 0 ? (ar / revenue) * 365 : 0;
  const dpo = cogs > 0 ? (ap / cogs) * 365 : 0;
  const ccc = dio + dso - dpo;
  const grossMargin = revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0;

  // DOM update
  const cccValEl = document.getElementById('ccc-value-display');
  const dioValEl = document.getElementById('dio-value-display');
  const dsoValEl = document.getElementById('dso-value-display');
  const dpoValEl = document.getElementById('dpo-value-display');
  const marginValEl = document.getElementById('margin-value-display');
  const commentaryEl = document.getElementById('ccc-commentary-text');

  if (cccValEl) cccValEl.textContent = Math.round(ccc) + ' d';
  if (dioValEl) dioValEl.textContent = Math.round(dio) + ' d';
  if (dsoValEl) dsoValEl.textContent = Math.round(dso) + ' d';
  if (dpoValEl) dpoValEl.textContent = Math.round(dpo) + ' d';
  if (marginValEl) marginValEl.textContent = grossMargin.toFixed(1) + '%';

  if (commentaryEl) {
    let comment = '';
    if (currentLang === 'en') {
      if (ccc < 30) {
        comment = `⚡ Exceptional liquidity! Your cash conversion cycle of ${Math.round(ccc)} days means working capital is rapidly freed up, minimizing external credit dependency.`;
      } else if (ccc < 65) {
        comment = `⚖️ Balanced operating cycle (${Math.round(ccc)} days). Maintaining a healthy gross margin of ${grossMargin.toFixed(1)}%. Optimizing DSO collections could liberate additional cash.`;
      } else {
        comment = `⚠️ Extended cash cycle (${Math.round(ccc)} days). Capital is tied up in inventory (DIO: ${Math.round(dio)}d) or slow receivables (DSO: ${Math.round(dso)}d). Consider negotiating better vendor terms (DPO).`;
      }
    } else {
      if (ccc < 30) {
        comment = `⚡ ¡Liquidez excepcional! Con un ciclo de ${Math.round(ccc)} días, el capital de trabajo se recupera con gran celeridad, minimizando el costo financiero de endeudamiento.`;
      } else if (ccc < 65) {
        comment = `⚖️ Ciclo operativo balanceado (${Math.round(ccc)} días). Margen bruto sólido del ${grossMargin.toFixed(1)}%. Agilizar la cobranza (DSO) podría desbloquear fondos adicionales.`;
      } else {
        comment = `⚠️ Ciclo de efectivo extendido (${Math.round(ccc)} días). Hay fondos inmovilizados en inventario (DIO: ${Math.round(dio)}d) o créditos por cobrar (DSO: ${Math.round(dso)}d). Se sugiere optimizar plazos de pago (DPO).`;
      }
    }
    commentaryEl.textContent = comment;
  }
}

/* ===================================================================
   5. PORTFOLIO PROJECT FILTERING
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. CLIPBOARD & UTILITY ACTIONS
   =================================================================== */
function initClipboardUtils() {
  const copyButtons = document.querySelectorAll('.channel-copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = currentLang === 'en' ? 'Copied!' : '¡Copiado!';
        btn.style.background = 'var(--emerald-accent)';
        btn.style.color = '#fff';
        btn.style.borderColor = 'var(--emerald-accent)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2200);
      });
    });
  });
}

/* ===================================================================
   7. INTERACTIVE CONTACT FORM
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('direct-contact-form');
  const toast = document.getElementById('contact-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;

    const subject = encodeURIComponent(`[Website Inquiry] ${service} - from ${name}`);
    const body = encodeURIComponent(`Hello Alejandro,\n\nMy name is ${name} (${email}).\n\nI am contacting you regarding: ${service}\n\nProject details:\n${message}\n\nBest regards,\n${name}`);

    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => {
        window.location.href = `mailto:ContadorCastellano@Gmail.com?subject=${subject}&body=${body}`;
        toast.style.display = 'none';
      }, 900);
    } else {
      window.location.href = `mailto:ContadorCastellano@Gmail.com?subject=${subject}&body=${body}`;
    }
  });
}
