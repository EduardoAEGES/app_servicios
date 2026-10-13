/* =========================================================
   PANTALLA: INICIO  (+ modal de emergencia)
   ========================================================= */

function renderInicio() {
  const featured = specialists.filter((s) => s.verified).slice(0, 3);

  const categoriesHtml = categories
    .map(
      (cat) => `
      <button class="cat-btn" data-action="browse-category" data-category="${cat.id}">
        <div class="cat-btn__icon" style="background:${cat.color}18">${cat.icon}</div>
        <span class="cat-btn__label">${cat.label}</span>
      </button>`
    )
    .join("");

  const steps = [
    { n: "01", t: "Busca el servicio", d: "Plomería, electricidad, limpieza y más." },
    { n: "02", t: "Elige tu especialista", d: "Lee reseñas y solicita presupuesto." },
    { n: "03", t: "Paga al finalizar", d: "Solo pagas cuando termina el trabajo." },
  ];

  const guestNotice = state.auth.isGuest
    ? `
    <div class="guest-banner">
      <span>Estás explorando en <strong>modo invitado</strong></span>
      <button class="guest-banner__btn" data-action="open-register">Crear cuenta</button>
    </div>`
    : "";

  return `
    ${guestNotice}
    <div class="hero">
      <div class="hero__circle hero__circle--1"></div>
      <div class="hero__circle hero__circle--2"></div>

      <div class="hero__content">
        <p class="hero__greet">Buenos días 👋</p>
        <h1 class="hero__title">¿Qué necesitas <span>arreglar</span> hoy?</h1>
        <p class="hero__sub">Especialistas verificados, siempre cerca.</p>

        <button class="hero-search" data-action="go-tab" data-tab="busqueda">
          ${icons.search(16)}
          <span>Buscar servicio o especialista…</span>
        </button>

        <!-- Tarjeta destacada de chat con técnico para mostrar averías de casa -->
        <div class="tech-card-cta" data-action="open-tech-diagnosis">
          <div class="tech-card-cta__badge">
            <span class="live-dot live-dot--sm"></span> TÉCNICO EN LÍNEA
          </div>
          <div class="tech-card-cta__main">
            <div class="tech-card-cta__avatar-wrap">
              <img src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop" class="tech-card-cta__avatar" alt="Roberto Medina">
              <span class="verified-dot-corner">✓</span>
            </div>
            <div class="tech-card-cta__info">
              <div class="tech-card-cta__title">¿Avería en casa? Chatea con un técnico</div>
              <p class="tech-card-cta__desc">Envía fotos de tu problema y recibe diagnóstico y presupuesto claro al instante</p>
            </div>
          </div>
          <div class="tech-card-cta__footer">
            <span class="tech-card-cta__chips">💧 Plomería · ⚡ Electricidad · 🔑 Chapa</span>
            <span class="tech-card-cta__btn">Mostrar mi problema →</span>
          </div>
        </div>

        <button class="emergency-btn" data-action="open-emergency">
          <span class="emergency-btn__icon">🚨</span>
          <div class="emergency-btn__text">
            <div class="emergency-btn__title">Solicitud de emergencia</div>
            <div class="emergency-btn__sub">Atención prioritaria en minutos</div>
          </div>
          <span class="emergency-btn__arrow">${icons.chevronRight(16)}</span>
        </button>
      </div>
    </div>

    <div class="home-body">
      <!-- Sección de diagnóstico rápido con fotos -->
      <section class="home-section">
        <div class="section-head">
          <div>
            <span class="section-title">Diagnóstico con técnicos</span>
            <span class="section-sub-tag">Muestra tu problema</span>
          </div>
          <button class="link-btn" data-action="open-tech-diagnosis">Ver chat →</button>
        </div>
        <div class="home-quick-problems">
          ${problemPresets
            .map(
              (p) => `
            <button class="home-problem-chip" data-action="chat-quick-preset" data-preset="${p.id}">
              <img src="${p.photo}" class="home-problem-chip__img" alt="${esc(p.label)}">
              <div class="home-problem-chip__body">
                <span class="home-problem-chip__label">${p.icon} ${esc(p.label)}</span>
                <span class="home-problem-chip__cost">Desde S/.${p.estimatedCost}</span>
              </div>
            </button>`
            )
            .join("")}
        </div>
      </section>

      <section class="home-section">
        <div class="section-head">
          <span class="section-title">Servicios</span>
          <button class="link-btn" data-action="go-tab" data-tab="busqueda">Ver todos →</button>
        </div>
        <div class="cat-grid">${categoriesHtml}</div>
      </section>

      <section class="home-section">
        <div class="section-head">
          <span class="section-title">Mejor calificados</span>
          <button class="link-btn" data-action="go-tab" data-tab="busqueda">Ver todos →</button>
        </div>
        <div class="card-list">${featured.map(specialistCard).join("")}</div>
      </section>

      <div class="how-box">
        <div class="how-box__title">¿Cómo funciona Hogarix?</div>
        <div class="how-box__steps">
          ${steps
            .map(
              (s) => `
            <div class="how-step">
              <div class="how-step__num">${s.n}</div>
              <div>
                <div class="how-step__title">${s.t}</div>
                <div class="how-step__desc">${s.d}</div>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </div>`;
}

/* ---------- Modal de emergencia ---------- */

function renderEmergencyModal() {
  const em = state.emergency;
  if (!em.open) return "";

  let content;
  if (em.sent) {
    content = `
      <div class="success-box">
        <div class="success-box__emoji">✅</div>
        <h3 class="success-box__title">¡Emergencia enviada!</h3>
        <p class="success-box__text">Estamos buscando un especialista disponible.<br>Te contactaremos en los próximos minutos.</p>
        <div class="pulse-row">
          <div class="pulse-dot"></div>
          <span>Buscando especialista…</span>
        </div>
      </div>`;
  } else {
    content = `
      <div class="modal-head">
        <div class="modal-head__icon modal-head__icon--red">🚨</div>
        <div>
          <h3 class="modal-head__title">Solicitud de emergencia</h3>
          <p class="modal-head__sub">Paso ${em.step} de 3</p>
        </div>
        <button class="icon-btn icon-btn--right" data-action="close-emergency">${icons.close(12)}</button>
      </div>

      <div class="progress"><div class="progress__bar" style="width:${(em.step / 3) * 100}%"></div></div>

      ${em.step === 1 ? emergencyStep1() : ""}
      ${em.step === 2 ? emergencyStep2() : ""}
      ${em.step === 3 ? emergencyStep3() : ""}`;
  }

  const disabled = em.step === 1 && !em.category;
  const footer = em.sent
    ? ""
    : `
      <div class="sheet__footer sheet__footer--static">
        ${em.step > 1 ? `<button class="btn btn-ghost" data-action="emergency-back">Atrás</button>` : ""}
        <button class="btn btn-danger btn--wide" data-action="emergency-next" ${disabled ? "disabled" : ""}>
          ${em.step === 3 ? "🚨 Enviar emergencia" : "Continuar →"}
        </button>
      </div>`;

  return `
    <div class="backdrop backdrop--top" data-action="${em.sent ? "" : "close-emergency"}"></div>
    <div class="sheet sheet--top" style="max-height:90svh">
      ${sheetHandle()}
      <div class="sheet__scroll" style="padding-bottom:24px">${content}</div>
      ${footer}
    </div>`;
}

function emergencyStep1() {
  const sel = state.emergency.category;
  return `
    <p class="step-title">¿Qué tipo de emergencia es?</p>
    <div class="em-grid">
      ${emergencyCategories
        .map(
          (cat) => `
        <button class="em-cat ${sel === cat.id ? "is-selected" : ""}" data-action="emergency-category" data-category="${cat.id}">
          <span class="em-cat__icon">${cat.icon}</span>
          <span class="em-cat__label">${cat.label}</span>
        </button>`
        )
        .join("")}
    </div>`;
}

function emergencyStep2() {
  const d = state.emergency.description;
  return `
    <p class="step-title" style="margin-bottom:6px">Describe el problema</p>
    <p class="step-sub">Cuanta más información, más rápido encontramos un especialista.</p>
    <textarea id="em-description" class="textarea ${d.length > 10 ? "is-filled" : ""}" rows="5"
      placeholder="Ej: Hay una fuga de agua debajo del lavabo, el piso ya está mojado y el agua no para de salir…">${esc(d)}</textarea>
    <div class="char-count"><span id="em-count">${d.length}</span> caracteres</div>`;
}

function emergencyStep3() {
  const files = state.emergency.files;
  const list = files
    .map(
      (f, i) => `
      <div class="file-item">
        ${
          f.type.startsWith("image")
            ? `<img class="file-item__thumb" src="${f.url}" alt="${esc(f.name)}">`
            : `<div class="file-item__thumb file-item__thumb--video">🎬</div>`
        }
        <div class="file-item__info">
          <div class="file-item__name">${esc(f.name)}</div>
          <div class="file-item__type">${f.type.startsWith("image") ? "Imagen" : "Video"}</div>
        </div>
        <button class="file-item__remove" data-action="remove-file" data-index="${i}">${icons.close(10)}</button>
      </div>`
    )
    .join("");

  return `
    <p class="step-title" style="margin-bottom:6px">Agrega fotos o videos <span class="step-title__opt">(opcional)</span></p>
    <p class="step-sub" style="margin-bottom:16px">Las imágenes ayudan al especialista a llegar preparado.</p>

    <button class="upload-area" data-action="pick-files">
      <div class="upload-area__icon">📎</div>
      <span class="upload-area__title">Subir fotos o videos</span>
      <span class="upload-area__hint">JPG, PNG, MP4 · Máx. 50 MB c/u</span>
    </button>
    <input id="em-files" type="file" accept="image/*,video/*" multiple hidden>

    ${files.length ? `<div class="file-list">${list}</div>` : ""}`;
}
