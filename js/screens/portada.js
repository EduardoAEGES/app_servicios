/* =========================================================
   PANTALLA: PORTADA DE BIENVENIDA & AUTENTICACIÓN
   Portada previa al registro y acceso directo a chat de diagnóstico.
   ========================================================= */

function renderPortada() {
  const p = portadaData;

  const presetsHtml = problemPresets
    .map(
      (pr) => `
      <div class="portada-card" data-action="chat-quick-preset" data-preset="${pr.id}">
        <div class="portada-card__img-wrap">
          <img class="portada-card__img" src="${pr.photo}" alt="${esc(pr.title)}">
          <span class="portada-card__pill">${pr.icon} ${esc(pr.label)}</span>
        </div>
        <div class="portada-card__body">
          <h4 class="portada-card__title">${esc(pr.title)}</h4>
          <p class="portada-card__sub">${esc(pr.subtitle)}</p>
          <div class="portada-card__footer">
            <span class="portada-card__cost">Desde S/.${pr.estimatedCost}</span>
            <span class="portada-card__action">Ver diagnóstico →</span>
          </div>
        </div>
      </div>`
    )
    .join("");

  const featuresHtml = p.features
    .map(
      (f) => `
      <div class="portada-feat">
        <div class="portada-feat__icon">${f.icon}</div>
        <div>
          <h4 class="portada-feat__title">${esc(f.title)}</h4>
          <p class="portada-feat__desc">${esc(f.desc)}</p>
        </div>
      </div>`
    )
    .join("");

  const testimonialsHtml = p.testimonials
    .map(
      (t) => `
      <div class="portada-testi">
        <div class="portada-testi__head">
          <img class="portada-testi__avatar" src="${t.photo}" alt="${esc(t.name)}">
          <div>
            <div class="portada-testi__name">${esc(t.name)}</div>
            <div class="portada-testi__dist">${esc(t.district)} · <strong>${esc(t.service)}</strong></div>
          </div>
        </div>
        <p class="portada-testi__text">“${esc(t.text)}”</p>
        <div class="portada-testi__stars">${starRating(t.rating, 12)}</div>
      </div>`
    )
    .join("");

  return `
    <div class="portada">
      <!-- Barra superior de la portada -->
      <header class="portada-nav">
        <div class="portada-nav__logo">
          <div class="splash__logo" style="width:36px;height:36px;border-radius:10px;padding:6px">
            <svg viewBox="0 0 512 512" width="22" height="22">
              <path d="M128 236 256 140l128 96v144a16 16 0 0 1-16 16H144a16 16 0 0 1-16-16z" fill="none" stroke="#AAFF6B" stroke-width="36" stroke-linejoin="round" />
              <path d="M216 396v-96h80v96" fill="none" stroke="#AAFF6B" stroke-width="36" stroke-linejoin="round" />
            </svg>
          </div>
          <span class="portada-nav__name">Arregla<span>Ya</span></span>
        </div>

        <div class="portada-nav__actions">
          <button class="portada-btn-link" data-action="open-login">Iniciar sesión</button>
          <button class="btn btn-primary btn--sm" data-action="open-register">Registrarme</button>
        </div>
      </header>

      <!-- Hero principal -->
      <section class="portada-hero">
        <div class="portada-hero__glow"></div>
        <div class="portada-tag">${icons.sparkles(14)} ${esc(p.hero.tag)}</div>

        <h1 class="portada-hero__title">
          ¿Problemas en tu hogar? <span>Muestra tu avería</span> y conversa con un técnico en directo
        </h1>

        <p class="portada-hero__desc">
          ${esc(p.hero.subtitle)}
        </p>

        <!-- Botones de llamada a la acción -->
        <div class="portada-cta-box">
          <button class="btn btn-primary btn--lg btn--block portada-cta-main" data-action="open-tech-diagnosis">
            <span class="live-dot"></span>
            <span>Chatear con un técnico ahora</span>
            <span class="btn-arrow">${icons.arrowRight(16)}</span>
          </button>

          <div class="portada-cta-row">
            <button class="btn btn-secondary btn--block" data-action="open-register">
              ${icons.userCircle(16)} Crear mi cuenta
            </button>
            <button class="btn btn-ghost btn--block" data-action="continue-guest">
              Explorar app sin cuenta →
            </button>
          </div>
        </div>

        <!-- Estadísticas de impacto -->
        <div class="portada-stats">
          ${p.hero.stats
            .map(
              (s) => `
            <div class="portada-stat">
              <div class="portada-stat__num">${s.num}</div>
              <div class="portada-stat__label">${s.label}</div>
            </div>`
            )
            .join("")}
        </div>
      </section>

      <!-- Banner de técnico en vivo y diagnóstico -->
      <section class="portada-section">
        <div class="portada-tech-banner">
          <div class="portada-tech-banner__badge">
            <span class="live-dot"></span> TÉCNICO EN LÍNEA
          </div>
          <div class="portada-tech-banner__head">
            <img class="portada-tech-banner__photo" src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop" alt="Roberto Medina">
            <div>
              <div class="portada-tech-banner__name">Roberto Medina <span class="verified-dot-inline">✓</span></div>
              <div class="portada-tech-banner__trade">Plomería & Detección de averías · 14 años exp.</div>
            </div>
          </div>
          <div class="portada-tech-banner__bubble">
            “Hola, si tienes una fuga, corte eléctrico o chapa trabada, tómale una foto y envíamela. Te diré qué ocurre y cuánto costará repararlo antes de que gaste un solo sol.”
          </div>
          <button class="btn btn-primary btn--block btn--sm" data-action="open-tech-diagnosis">
            💬 Probar chat con Roberto ahora
          </button>
        </div>
      </section>

      <!-- Selector de averías comunes con foto para probar -->
      <section class="portada-section">
        <div class="portada-sec-head">
          <span class="portada-sec-tag">DIAGNÓSTICO EN VIVO</span>
          <h2 class="portada-sec-title">¿Qué avería tienes en casa?</h2>
          <p class="portada-sec-sub">Selecciona una avería para ver cómo el técnico te responde con diagnóstico y cotización:</p>
        </div>

        <div class="portada-grid">
          ${presetsHtml}
        </div>
      </section>

      <!-- Beneficios clave -->
      <section class="portada-section">
        <div class="portada-sec-head">
          <span class="portada-sec-tag">¿POR QUÉ ARREGLAYA?</span>
          <h2 class="portada-sec-title">Tu tranquilidad garantizada</h2>
        </div>

        <div class="portada-feats">
          ${featuresHtml}
        </div>
      </section>

      <!-- Testimonios de clientes en Arequipa -->
      <section class="portada-section">
        <div class="portada-sec-head">
          <span class="portada-sec-tag">TESTIMONIOS REALES</span>
          <h2 class="portada-sec-title">Lo que dicen en tu ciudad</h2>
        </div>

        <div class="portada-testis">
          ${testimonialsHtml}
        </div>
      </section>

      <!-- Footer de llamada final -->
      <footer class="portada-footer">
        <div class="portada-footer__box">
          <h3 class="portada-footer__title">¿Listo para solucionar tu problema de casa?</h3>
          <p class="portada-footer__desc">Regístrate en menos de 1 minuto y recibe atención prioritaria.</p>
          <div class="portada-footer__buttons">
            <button class="btn btn-primary btn--wide" data-action="open-register">Registrarme gratis</button>
            <button class="btn btn-ghost" data-action="continue-guest">Entrar como invitado</button>
          </div>
        </div>
        <p class="portada-footer__copy">ArreglaYa © 2026 · Soluciones profesionales para el hogar · Arequipa, Perú</p>
      </footer>
    </div>`;
}

/* ---------- Modal de Autenticación (Registro / Iniciar Sesión) ---------- */
function renderAuthModal() {
  const auth = state.auth;
  if (!auth.modal) return "";

  const isReg = auth.modal === "register";

  return `
    <div class="backdrop backdrop--top backdrop--dark" data-action="close-auth-modal"></div>
    <div class="sheet sheet--top auth-sheet" style="max-height:92svh">
      ${sheetHandle()}
      <div class="sheet__scroll" style="padding-bottom:30px">
        <div class="modal-head modal-head--between">
          <div>
            <h3 class="modal-head__title modal-head__title--lg">
              ${isReg ? "Crear cuenta en ArreglaYa" : "Iniciar sesión"}
            </h3>
            <p class="modal-head__sub">
              ${isReg ? "Accede a técnicos verificados y guarda tus servicios" : "Ingresa a tu cuenta para ver tus solicitudes"}
            </p>
          </div>
          <button class="icon-btn" data-action="close-auth-modal">${icons.close(12)}</button>
        </div>

        <!-- Pestañas de cambio rápido -->
        <div class="auth-tabs">
          <button class="auth-tab ${isReg ? "is-active" : ""}" data-action="auth-tab" data-tab="register">
            Crear cuenta
          </button>
          <button class="auth-tab ${!isReg ? "is-active" : ""}" data-action="auth-tab" data-tab="login">
            Ya tengo cuenta
          </button>
        </div>

        ${auth.error ? `<div class="auth-error-box">${esc(auth.error)}</div>` : ""}

        ${isReg ? authRegisterForm() : authLoginForm()}

        <div class="auth-guest-row">
          <span class="auth-guest-line"></span>
          <span class="auth-guest-text">o también</span>
          <span class="auth-guest-line"></span>
        </div>

        <button class="btn btn-ghost btn--block" data-action="continue-guest">
          Continuar explorando como invitado →
        </button>
      </div>
    </div>`;
}

function authRegisterForm() {
  const f = state.auth.form;
  return `
    <form class="auth-form" onsubmit="event.preventDefault();">
      <div class="form-block">
        <label class="input-label" for="reg-name">NOMBRE Y APELLIDO *</label>
        <input id="reg-name" class="input" type="text" placeholder="Ej: Carlos Mendoza" value="${esc(f.name)}" data-auth="name">
      </div>

      <div class="form-block">
        <label class="input-label" for="reg-phone">NÚMERO DE CELULAR *</label>
        <input id="reg-phone" class="input" type="tel" placeholder="+51 902 666 187" value="${esc(f.phone)}" data-auth="phone">
      </div>

      <div class="form-block">
        <label class="input-label" for="reg-address">DIRECCIÓN O DISTRITO EN AREQUIPA *</label>
        <input id="reg-address" class="input" type="text" placeholder="Ej: Av. Ejército 400 - Cayma" value="${esc(f.address)}" data-auth="address">
      </div>

      <div class="form-block">
        <label class="input-label" for="reg-email">CORREO ELECTRÓNICO</label>
        <input id="reg-email" class="input" type="email" placeholder="ejemplo@correo.com" value="${esc(f.email)}" data-auth="email">
      </div>

      <div class="form-block">
        <label class="input-label" for="reg-pass">CONTRASEÑA</label>
        <input id="reg-pass" class="input" type="password" placeholder="Mínimo 6 caracteres" value="${esc(f.password)}" data-auth="password">
      </div>

      <button class="btn btn-primary btn--block btn--lg" data-action="auth-submit-register">
        Registrarme y acceder a ArreglaYa →
      </button>
    </form>`;
}

function authLoginForm() {
  const f = state.auth.form;
  return `
    <form class="auth-form" onsubmit="event.preventDefault();">
      <div class="form-block">
        <label class="input-label" for="login-email">CORREO O CELULAR</label>
        <input id="login-email" class="input" type="text" placeholder="carlos.mendoza@gmail.com" value="${esc(f.email || f.phone)}" data-auth="email">
      </div>

      <div class="form-block">
        <label class="input-label" for="login-pass">CONTRASEÑA</label>
        <input id="login-pass" class="input" type="password" placeholder="Tu contraseña" value="${esc(f.password)}" data-auth="password">
      </div>

      <div class="auth-demo-hint">
        <span>💡 ¿Quieres probar rápido?</span>
        <button class="auth-demo-btn" data-action="auth-fill-demo">Usar cuenta demo (Carlos Mendoza)</button>
      </div>

      <button class="btn btn-primary btn--block btn--lg" data-action="auth-submit-login">
        Iniciar sesión →
      </button>
    </form>`;
}
