/* =========================================================
   HOJA DEL ESPECIALISTA  (+ modal de confirmación y pago)
   ========================================================= */

function currentSpecialist() {
  return specialists.find((s) => s.id === state.specialist.id);
}

/* Calcula precios según tarifa y horas */
function priceInfo(sp) {
  const subtotal = sp.rate > 0 ? sp.rate * state.payment.hours : 0;
  const serviceFee = sp.rate > 0 ? Math.round(subtotal * 0.05) : 0;
  return {
    rateLabel: sp.rate > 0 ? `S/.${sp.rate}/hr` : "Consultar",
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
  };
}

function renderSpecialistSheet() {
  if (state.specialist.id === null) return "";
  const sp = currentSpecialist();
  if (!sp) return "";

  const reviews = reviewsMap[sp.id] || [];
  const { rateLabel } = priceInfo(sp);
  const tab = state.specialist.tab;

  const stats = [
    { label: "Trabajos", value: sp.jobs },
    { label: "Tarifa/hr", value: rateLabel },
    { label: "Disponible", value: sp.availability.split(",")[0] },
  ];

  const info = `
    <p class="bio">${esc(sp.bio)}</p>
    <div class="label-caps">ESPECIALIDADES</div>
    <div class="skills">${sp.skills.map((s) => `<span class="skill">${esc(s)}</span>`).join("")}</div>
    <div class="info-box">📍 ${esc(sp.location)} &nbsp;·&nbsp; 🕐 ${esc(sp.availability)}</div>`;

  const reviewsHtml = `
    <div class="stack">
      ${reviews.length === 0 ? `<p class="muted">Sin reseñas aún.</p>` : ""}
      ${reviews
        .map(
          (r) => `
        <div class="review">
          <div class="review__head">
            <img class="review__avatar" src="${r.avatar}" alt="${esc(r.author)}">
            <div>
              <div class="review__author">${esc(r.author)}</div>
              <div class="review__meta">${starRating(r.rating, 11)}<span>${r.date}</span></div>
            </div>
          </div>
          <p class="review__text">${esc(r.text)}</p>
        </div>`
        )
        .join("")}
    </div>`;

  return `
    <div class="backdrop" data-action="${state.payment.open ? "" : "close-specialist"}"></div>
    <div class="sheet" style="max-height:88svh">
      ${sheetHandle()}
      <div class="sheet__scroll" style="padding-bottom:100px">
        <div class="sp-header">
          <img class="sp-header__photo" src="${sp.photo}" alt="${esc(sp.name)}">
          <div class="sp-header__info">
            <div class="sp-header__name-row">
              <span class="sp-header__name">${esc(sp.name)}</span>
              ${sp.verified ? `<span class="verified-badge">✓ Verificado</span>` : ""}
            </div>
            <div class="sp-header__trade">${esc(sp.trade)} · ${sp.experience} años de exp.</div>
            <div class="sp-header__rating">${starRating(sp.rating, 13)}<span>${sp.rating} · ${sp.reviews} reseñas</span></div>
          </div>
          <button class="icon-btn" data-action="close-specialist">${icons.close(14)}</button>
        </div>

        <div class="stats-grid">
          ${stats
            .map(
              (s) => `
            <div class="stat">
              <div class="stat__value">${s.value}</div>
              <div class="stat__label">${s.label}</div>
            </div>`
            )
            .join("")}
        </div>

        <div class="seg-tabs">
          <button class="seg-tab ${tab === "info" ? "is-active" : ""}" data-action="specialist-tab" data-tab="info">Información</button>
          <button class="seg-tab ${tab === "reviews" ? "is-active" : ""}" data-action="specialist-tab" data-tab="reviews">Reseñas (${reviews.length})</button>
        </div>

        ${tab === "info" ? info : reviewsHtml}
      </div>

      <div class="sheet__footer">
        <button class="btn btn-secondary" data-action="message-specialist">💬 Mensaje</button>
        <button class="btn btn-primary btn--wide" data-action="open-payment">Solicitar servicio</button>
      </div>
    </div>
    ${renderPaymentModal(sp)}`;
}

/* ---------- Modal de pago ---------- */

function renderPaymentModal(sp) {
  const pay = state.payment;
  if (!pay.open) return "";

  let body = "";
  if (pay.step === "done") body = paymentDone(sp);
  if (pay.step === "confirm") body = paymentConfirm(sp);
  if (pay.step === "pay") body = paymentMethod(sp);

  const { total } = priceInfo(sp);
  let footer = "";
  if (pay.step === "confirm") {
    footer = `<button class="btn btn-primary btn--block btn--lg" data-action="payment-continue">Continuar al pago →</button>`;
  }
  if (pay.step === "pay") {
    footer = `<button class="btn btn-primary btn--block btn--lg btn--shadow" data-action="payment-submit">
      ${sp.rate > 0 ? `Pagar S/.${total}` : "Confirmar solicitud"}
    </button>`;
  }

  return `
    <div class="backdrop backdrop--top backdrop--dark"></div>
    <div class="sheet sheet--top" style="max-height:92svh">
      ${sheetHandle()}
      <div class="sheet__scroll" style="padding-bottom:110px">${body}</div>
      ${footer ? `<div class="sheet__footer" style="padding-bottom:28px">${footer}</div>` : ""}
    </div>`;
}

function priceBreakdown(sp, { totalLabel = "Total", feeLabel = "Tarifa de servicio (5%)", big = true } = {}) {
  const { subtotal, serviceFee, total } = priceInfo(sp);
  return `
    <div class="summary-box">
      <div class="price-row"><span>Subtotal (${state.payment.hours}h)</span><strong>S/.${subtotal}</strong></div>
      <div class="price-row price-row--divider"><span>${feeLabel}</span><strong>S/.${serviceFee}</strong></div>
      <div class="price-row price-row--total"><span>${totalLabel}</span><strong class="${big ? "is-big" : ""}">S/.${total}</strong></div>
    </div>`;
}

function paymentDone(sp) {
  const pay = state.payment;
  return `
    <div class="done-box">
      <div class="done-box__emoji">🎉</div>
      <h3 class="done-box__title">¡Servicio confirmado!</h3>
      <p class="done-box__text">
        ${esc(sp.name)} ha recibido tu solicitud.<br>
        Llegará el <strong>${esc(pay.date)}</strong> a las <strong>${esc(pay.time)}</strong>.
      </p>
      ${priceBreakdown(sp, { totalLabel: "Total pagado", feeLabel: "Tarifa de servicio", big: false })}
    </div>`;
}

function paymentConfirm(sp) {
  const pay = state.payment;
  const { rateLabel } = priceInfo(sp);

  return `
    <div class="modal-head modal-head--between">
      <div>
        <h3 class="modal-head__title modal-head__title--lg">Confirmar servicio</h3>
        <p class="modal-head__sub">Revisa los detalles antes de pagar</p>
      </div>
      <button class="icon-btn" data-action="close-payment">${icons.close(12)}</button>
    </div>

    <div class="pay-summary">
      <img class="pay-summary__photo" src="${sp.photo}" alt="${esc(sp.name)}">
      <div>
        <div class="pay-summary__name">${esc(sp.name)}</div>
        <div class="pay-summary__trade">${esc(sp.trade)}</div>
        <div class="pay-summary__rate">${rateLabel}</div>
      </div>
    </div>

    <div class="form-block">
      <div class="form-block__title">Fecha y hora</div>
      <div class="grid-2">
        <div>
          <label class="input-label" for="pay-date">FECHA</label>
          <input id="pay-date" class="input" type="date" min="2026-09-13" value="${pay.date}" data-pay="date">
        </div>
        <div>
          <label class="input-label" for="pay-time">HORA</label>
          <input id="pay-time" class="input" type="time" value="${pay.time}" data-pay="time">
        </div>
      </div>
    </div>

    ${
      sp.rate > 0
        ? `
      <div class="form-block">
        <div class="form-block__title">Horas estimadas</div>
        <div class="hours">
          <button class="hours__btn" data-action="hours-minus">−</button>
          <span class="hours__value">${pay.hours}</span>
          <button class="hours__btn" data-action="hours-plus">+</button>
          <span class="hours__rate">× S/.${sp.rate}/hr</span>
        </div>
      </div>
      ${priceBreakdown(sp)}`
        : ""
    }`;
}

function paymentMethod(sp) {
  const pay = state.payment;
  const { total } = priceInfo(sp);

  const methods = [
    { id: "card", label: "Tarjeta de crédito / débito", icon: "💳" },
    { id: "yape", label: "Yape / Plin", icon: "📱" },
    { id: "efectivo", label: "Efectivo al finalizar", icon: "💵" },
  ];

  let detail = "";
  if (pay.method === "card") {
    detail = `
      <div class="stack">
        <div>
          <label class="input-label input-label--caps">NÚMERO DE TARJETA</label>
          <input class="input input--spaced" data-pay="cardNumber" inputmode="numeric" placeholder="1234 5678 9012 3456" value="${esc(pay.cardNumber)}">
        </div>
        <div>
          <label class="input-label input-label--caps">NOMBRE EN LA TARJETA</label>
          <input class="input input--spaced" data-pay="cardName" placeholder="CARLOS MENDOZA" value="${esc(pay.cardName)}">
        </div>
        <div class="grid-2">
          <div>
            <label class="input-label input-label--caps">VENCIMIENTO</label>
            <input class="input" data-pay="cardExp" inputmode="numeric" placeholder="MM/AA" value="${esc(pay.cardExp)}">
          </div>
          <div>
            <label class="input-label input-label--caps">CVV</label>
            <input class="input" data-pay="cardCvv" type="password" inputmode="numeric" placeholder="•••" value="${esc(pay.cardCvv)}">
          </div>
        </div>
      </div>`;
  }
  if (pay.method === "yape") {
    detail = `
      <div class="yape-box">
        <div class="yape-box__qr">📱</div>
        <p>Escanea el QR con Yape o Plin<br>al momento del servicio.<br><strong>Número: +51 902 777 888</strong></p>
      </div>`;
  }
  if (pay.method === "efectivo") {
    detail = `
      <div class="info-box info-box--text">
        Pagarás <strong>S/.${total > 0 ? total : "según presupuesto"}</strong> en efectivo directamente al especialista al finalizar el trabajo. No se cobra nada por adelantado.
      </div>`;
  }

  return `
    <div class="modal-head">
      <button class="icon-btn icon-btn--dark" data-action="payment-back">${icons.back(14)}</button>
      <div>
        <h3 class="modal-head__title modal-head__title--lg">Método de pago</h3>
        ${sp.rate > 0 ? `<p class="modal-head__sub">Total: S/.${total}</p>` : ""}
      </div>
    </div>

    <div class="methods">
      ${methods
        .map(
          (m) => `
        <button class="method ${pay.method === m.id ? "is-selected" : ""}" data-action="pay-method" data-method="${m.id}">
          <span class="method__icon">${m.icon}</span>
          <span class="method__label">${m.label}</span>
          <span class="radio"></span>
        </button>`
        )
        .join("")}
    </div>

    ${detail}`;
}

/* Formatos de los campos de tarjeta */
const formatters = {
  cardNumber: (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
  cardName: (v) => v.toUpperCase(),
  cardExp: (v) => v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2"),
  cardCvv: (v) => v.replace(/\D/g, "").slice(0, 4),
};
