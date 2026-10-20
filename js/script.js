/**
 * ANIRUDDHA M. MAGAR — PORTFOLIO INTERACTIVE LOGIC
 * High-performance vanilla JS engine for modals, counters, filtering & clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initMetricCounters();
  initProjectFiltering();
  initCaseStudyModals();
  initClipboardActions();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add blurred backdrop intensity on scroll
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll Spy active link
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      if (mobileMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initMetricCounters() {
  const countElements = document.querySelectorAll('[data-target]');
  if (!countElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        const suffix = el.getAttribute('data-suffix') || '';

        animateCounter(el, target, isDecimal, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  countElements.forEach(el => observer.observe(el));
}

function animateCounter(element, target, isDecimal, suffix) {
  let start = 0;
  const duration = 1600;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic curve
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * easeOut;

    if (isDecimal) {
      element.textContent = current.toFixed(2) + suffix;
    } else {
      element.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (isDecimal) {
        element.textContent = target.toFixed(2) + suffix;
      } else {
        element.textContent = target + suffix;
      }
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   CASE STUDY MODALS DATA & ENGINE
   ========================================================================== */
const CASE_STUDIES = {
  safeher: {
    title: 'SafeHer — Women Safety Android App',
    subtitle: 'Production-Grade Android Safety Platform with AI-Based Risk Prediction & Dual-Cloud Sync',
    badge: 'Google Play Live App • IEEE TechSangam Finalist',
    year: '2025',
    overview: `SafeHer is an end-to-end women's safety ecosystem engineered in Kotlin & Jetpack Compose. Conceived and prototyped in a 24-hour national hackathon (IEEE TechSangam 2025 Finalist) and subsequently polished and launched live onto the Google Play Store. It features hardware-accelerated shake detection, real-time GPS telemetry, and a failover-safe dual-cloud architecture.`,
    stats: [
      { num: 'Live', label: 'Google Play Store' },
      { num: '24h', label: 'Hackathon Build' },
      { num: '99.9%', label: 'Sync Resilience' },
      { num: '100%', label: 'Test Suite Coverage' }
    ],
    architecture: {
      client: 'Android 14 / Compose / MVVM + Hilt DI / Room / Sensors',
      cloudSync: 'Firebase Firestore + Custom Node.js / Express & MongoDB',
      automation: 'Self-hosted n8n on Docker (Suspicious Login Triggers via Gmail Webhook)',
      portal: 'Emergency Contacts Live Real-Time Web Tracking Portal'
    },
    deepDivePoints: [
      '<strong>Dual-Cloud Resilience:</strong> Architected a hybrid backend where critical SOS signals instantly dispatch across Firebase Realtime DB and an external Node.js/MongoDB microservice to prevent single point of failure in zero-connectivity or server outage situations.',
      '<strong>Hardware Sensor & Background Services:</strong> Implemented low-latency accelerometer listener for emergency shake detection that operates seamlessly in foreground and background services without excessive battery drain.',
      '<strong>Dockerized n8n Security Pipeline:</strong> Self-hosted an automated n8n pipeline on Docker to inspect suspicious phone-login attempts, trigger Webhooks, and automatically alert the user via Gmail without blocking main application threads.',
      '<strong>Comprehensive Testing:</strong> Authored a full manual test suite covering functional, edge-case, and regression scenarios across SOS dispatch, offline GPS caching, shake sensitivity thresholds, and push notifications.'
    ],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.safeher.official',
    techStack: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt DI', 'Room DB', 'DataStore', 'Firebase', 'Node.js', 'MongoDB', 'n8n', 'Docker']
  },

  lingua: {
    title: 'Lingua — AI Language Learning App',
    subtitle: 'Cross-Platform Real-Time Speech-to-Speech Voice Tutor Powered by OpenAI Realtime & WebRTC',
    badge: 'Cross-Platform • AI Realtime Voice Agent',
    year: '2026',
    overview: `Lingua introduces "Luna", an ultra-responsive AI voice teacher that engages learners in natural spoken dialogue. Built with React Native and Expo, Lingua utilizes bi-directional WebRTC streams connected to an OpenAI Realtime API backend through a high-performance Python FastAPI microservice.`,
    stats: [
      { num: '<400ms', label: 'Voice Latency' },
      { num: 'iOS & Android', label: 'Cross-Platform' },
      { num: 'FastAPI', label: 'Python Service' },
      { num: 'Zero-Leak', label: 'Server-Side Keys' }
    ],
    architecture: {
      client: 'React Native / Expo / TypeScript / NativeWind UI',
      stream: 'Stream WebRTC Bi-directional Audio Channels',
      backend: 'Python FastAPI Microservice (Agent Call Lifecycle & Echo Mute)',
      ai: 'OpenAI Realtime API (Speech-to-Speech Voice Model)',
      authAnalytics: 'Clerk Authentication + PostHog Product Telemetry'
    },
    deepDivePoints: [
      '<strong>Full-Duplex Speech-to-Speech:</strong> Integrated Luna using Stream WebRTC and OpenAI Realtime API for sub-second conversational latency, providing learners with an authentic natural language immersion experience.',
      '<strong>Echo Cancellation & Auto-Mute:</strong> Engineered custom audio threshold detection in the FastAPI layer to prevent acoustic loopback echo between student speech and Luna’s synthesized voice output.',
      '<strong>Live Synchronized Captions:</strong> Implemented real-time token streaming to render synchronized dual captions (target language + translation) while voice audio plays.',
      '<strong>Enterprise Security & Secret Isolation:</strong> Enforced complete isolation of OpenAI and Stream private keys using Expo Router server-side API routes, preventing client bundle extraction.'
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'FastAPI', 'Python', 'OpenAI Realtime API', 'Stream WebRTC', 'Clerk', 'PostHog', 'NativeWind']
  },

  stylish: {
    title: 'Stylish — E-Commerce Android Application',
    subtitle: 'Engineered at Codec Technologies with Clean Architecture & Modern Jetpack Compose',
    badge: 'Industry Internship • Clean Architecture',
    year: '2026',
    overview: `Developed during an App Developer Internship at Codec Technologies, "Stylish" is a modular, scalable mobile commerce platform built with Kotlin and Jetpack Compose. The project served as a benchmark for Clean Architecture implementation, separating Presentation, Domain, and Data layers with reactive StateFlow state handling.`,
    stats: [
      { num: 'Clean Arch', label: 'Pattern' },
      { num: '100% Compose', label: 'Declarative UI' },
      { num: 'Coroutines', label: 'Async Flow' },
      { num: 'REST API', label: 'Sync' }
    ],
    architecture: {
      presentation: 'Jetpack Compose UI, ViewModels, StateFlow, Navigation Compose',
      domain: 'Pure Kotlin UseCases, Repository Interfaces, Business Models',
      data: 'Retrofit REST Client, Room Offline Cache, Repository Implementations',
      di: 'Dagger Hilt Dependency Injection across all build modules'
    },
    deepDivePoints: [
      '<strong>Clean Architecture Separation:</strong> Built strict modular boundaries between Presentation (Compose + ViewModel), Domain (Business UseCases), and Data (Local cache + Remote REST API) to guarantee testability and scalability.',
      '<strong>Reactive State Modeling:</strong> Designed unidirectional data flow (UDF) using Kotlin Coroutines and StateFlow, ensuring single-source-of-truth across catalog, shopping cart, and checkout flows.',
      '<strong>Offline Resilience:</strong> Implemented Room caching layer with network-bound resource strategy for instant screen load times regardless of network connectivity.',
      '<strong>Componentized UI System:</strong> Crafted reusable design tokens, buttons, product carousels, and animation transitions in Jetpack Compose.'
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'Hilt DI', 'Room DB', 'Retrofit', 'Coroutines', 'StateFlow']
  },

  crop_system: {
    title: 'Crop Recommendation System (Machine Learning)',
    subtitle: 'Precision Agriculture Predictive Model Trained on Soil & Weather Datasets',
    badge: 'Edunet Foundation Trainee • Machine Learning',
    year: '2025',
    overview: `Built during the AI with Green Technology training program at Edunet Foundation. Developed a machine learning pipeline that analyzes nitrogen, phosphorus, potassium (NPK), soil pH, temperature, humidity, and rainfall to recommend the most fertile crop species for regional farming conditions.`,
    stats: [
      { num: '98%+', label: 'Model Accuracy' },
      { num: '7+', label: 'Soil/Climate Features' },
      { num: 'Python', label: 'Jupyter & Pandas' },
      { num: 'Green Tech', label: 'Impact' }
    ],
    architecture: {
      dataPrep: 'Pandas, NumPy, Outlier Detection, Normalization',
      eda: 'Seaborn & Matplotlib Correlation Heatmaps and Feature Distributions',
      modeling: 'Random Forest, Decision Tree, Support Vector Machine (SVM)',
      evaluation: 'Cross-Validation, Confusion Matrix, Classification Metrics'
    },
    deepDivePoints: [
      '<strong>Feature Engineering & Soil Science:</strong> Formulated predictive indicators combining NPK nutrient ratios with regional rainfall and temperature variances.',
      '<strong>Comparative Model Tuning:</strong> Benchmarked multiple classification algorithms (Random Forest, SVM, Decision Trees) to maximize recommendation precision and prevent overfitting.',
      '<strong>Data Preprocessing:</strong> Handled missing values, feature scaling, and high-dimensional variance in Jupyter Notebook environments.'
    ],
    techStack: ['Python', 'Machine Learning', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib']
  }
};

function initCaseStudyModals() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContentBox = document.getElementById('modal-container-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('[data-case-study]');

  if (!modalBackdrop || !modalContentBox) return;

  function openModal(projectKey) {
    const data = CASE_STUDIES[projectKey];
    if (!data) return;

    let statsHtml = data.stats.map(s => `
      <div class="cockpit-metric" style="padding: 0.85rem;">
        <div class="num" style="font-size: 1.25rem;">${s.num}</div>
        <div class="lbl">${s.label}</div>
      </div>
    `).join('');

    let highlightsHtml = data.deepDivePoints.map(p => `
      <li style="margin-bottom: 0.8rem; display: flex; gap: 0.65rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.65;">
        <i class="fas fa-check-circle" style="color: var(--accent-cyan); margin-top: 0.35rem; flex-shrink: 0;"></i>
        <div>${p}</div>
      </li>
    `).join('');

    let techChips = data.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('');

    let archBlock = '';
    if (projectKey === 'safeher') {
      archBlock = `
        <div class="arch-diagram-box">
          <div style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 0.05em;">
            <i class="fas fa-project-diagram"></i> SafeHer Resilient Dual-Cloud System Flow
          </div>
          <div class="arch-flow-row">
            <div class="arch-node highlight-cyan">
              <div class="arch-node-title">Mobile Client</div>
              <div class="arch-node-tech">Kotlin • Jetpack Compose<br>Shake Detector • Room Cache</div>
            </div>
            <div class="arch-node highlight-purple">
              <div class="arch-node-title">Dual-Cloud Sync Engine</div>
              <div class="arch-node-tech">Firebase Firestore (Realtime)<br>+ Node.js / Express & MongoDB</div>
            </div>
            <div class="arch-node highlight-emerald">
              <div class="arch-node-title">Emergency Automation</div>
              <div class="arch-node-tech">n8n Docker Container<br>Emergency Web Tracker Portal</div>
            </div>
          </div>
        </div>
      `;
    } else if (projectKey === 'lingua') {
      archBlock = `
        <div class="arch-diagram-box">
          <div style="font-size: 0.85rem; font-weight: 700; color: #a78bfa; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 0.05em;">
            <i class="fas fa-microphone-alt"></i> Luna Speech-to-Speech Audio Stream Topology
          </div>
          <div class="arch-flow-row">
            <div class="arch-node highlight-purple">
              <div class="arch-node-title">Expo Client</div>
              <div class="arch-node-tech">React Native • TypeScript<br>Audio Capture • Dual Captions</div>
            </div>
            <div class="arch-node highlight-cyan">
              <div class="arch-node-title">Stream WebRTC & FastAPI</div>
              <div class="arch-node-tech">Bi-directional WebRTC Stream<br>Python Echo Auto-Muter</div>
            </div>
            <div class="arch-node highlight-emerald">
              <div class="arch-node-title">OpenAI Realtime AI</div>
              <div class="arch-node-tech">Sub-400ms Voice Synthesis<br>Secret Isolation via Expo Router</div>
            </div>
          </div>
        </div>
      `;
    }

    modalContentBox.innerHTML = `
      <div class="modal-header-meta">
        <span class="badge-playstore" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">${data.badge}</span>
        <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-faint);">${data.year}</span>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
        ${statsHtml}
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title"><i class="fas fa-info-circle"></i> Project Architecture & Problem Solved</h4>
        <p style="color: var(--text-secondary); font-size: 1.02rem; line-height: 1.8;">${data.overview}</p>
      </div>

      ${archBlock}

      <div class="modal-section">
        <h4 class="modal-section-title"><i class="fas fa-layer-group"></i> Key Engineering Highlights</h4>
        <ul style="list-style: none;">${highlightsHtml}</ul>
      </div>

      <div class="modal-section" style="margin-bottom: 1.5rem;">
        <h4 class="modal-section-title"><i class="fas fa-code"></i> Production Stack & Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${techChips}</div>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08);">
        ${projectKey === 'safeher' ? `
          <a href="https://play.google.com/store/apps/details?id=com.safeher.official" target="_blank" rel="noopener noreferrer" class="btn-playstore" style="padding: 0.75rem 1.4rem;">
            <i class="fab fa-google-play"></i> View SafeHer Shield on Google Play
          </a>
        ` : ''}
        <a href="https://github.com/Aniruddha3011" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.75rem 1.4rem;">
          <i class="fab fa-github"></i> Inspect Code on GitHub
        </a>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-case-study');
      openModal(projectKey);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CLIPBOARD ACTIONS & TOAST
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast-notification');

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-cyan); font-size: 1.1rem;"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard!';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(label);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });

  function fallbackCopyText(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(label);
    } catch (err) {
      alert('Copied: ' + text);
    }
    document.body.removeChild(textArea);
  }
}

/* ==========================================================================
   CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || 'Friend';
    const email = form.querySelector('[name="email"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    // Direct mailto link fallback with prefilled content
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:aniruddhamagar.nbnstic.comp@gmail.com?subject=${subject}&body=${body}`;

    // Prompt user to open their mail client or confirm message
    if (toast) {
      toast.innerHTML = `<i class="fas fa-paper-plane" style="color: var(--accent-emerald);"></i> <span>Thank you, ${name}! Opening mail client...</span>`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);

    form.reset();
  });
}

/* ==========================================================================
   BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
