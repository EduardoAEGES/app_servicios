/* =========================================================
   PANTALLA: PERFIL
   ========================================================= */

const statusClass = {
  Completado: "status--done",
  Programado: "status--scheduled",
  Cancelado: "status--cancelled",
};

function renderPerfil() {
  const p = state.perfil;
  const completed = bookings.filter((b) => b.status === "Completado");
  const totalSpent = completed.reduce((sum, b) => sum + b.amount, 0);

  const stats = [
    { v: bookings.length, l: "Servicios" },
    { v: completed.length, l: "Completados" },
    { v: `S/.${totalSpent}`, l: "Gastado" },
  ];

  return `
    <div class="profile-hero">
      <div class="profile-hero__top">
        <div class="avatar-wrap">
          <img class="avatar" src="${userProfile.photo}" alt="${esc(p.name)}">
          <button class="avatar-edit">${icons.pencil(10)}</button>
        </div>
        <div>
          <h2 class="profile-name">${esc(p.name)}</h2>
          <p class="profile-sub">Cliente · Miembro desde ago 2025</p>
        </div>
      </div>

      <div class="mini-stats">
        ${stats
          .map(
            (s) => `
          <div class="mini-stat">
            <div class="mini-stat__value">${s.v}</div>
            <div class="mini-stat__label">${s.l}</div>
          </div>`
          )
          .join("")}
      </div>

      <div class="profile-tabs">
        <button class="profile-tab ${p.tab === "servicios" ? "is-active" : ""}" data-action="perfil-tab" data-tab="servicios">Mis servicios</button>
        <button class="profile-tab ${p.tab === "cuenta" ? "is-active" : ""}" data-action="perfil-tab" data-tab="cuenta">Mi cuenta</button>
      </div>
    </div>

    <div class="profile-body">
      ${p.tab === "servicios" ? renderBookings() : renderAccount()}
    </div>`;
}

function renderBookings() {
  return `
    <div class="card-list">
      ${bookings
        .map(
          (b) => `
        <div class="booking">
          <img class="booking__photo" src="${b.photo}" alt="${esc(b.specialist)}">
          <div class="booking__body">
            <div class="booking__top">
              <span class="booking__name">${esc(b.specialist)}</span>
              <span class="status ${statusClass[b.status] || ""}">${b.status}</span>
            </div>
            <div class="booking__trade">${esc(b.trade)}</div>
            <div class="booking__meta">
              <span>📅 ${b.date}</span>
              ${b.rating > 0 ? starRating(b.rating, 10) : ""}
            </div>
          </div>
          <div class="booking__amount">S/.${b.amount}</div>
        </div>`
        )
        .join("")}
    </div>`;
}

function renderAccount() {
  const p = state.perfil;
  const fields = [
    { key: "name", label: "Nombre" },
    { key: "phone", label: "Teléfono" },
    { key: "address", label: "Dirección" },
  ];

  const security = [
    { label: "Correo", value: userProfile.email, badge: "Verificado", cls: "badge--green" },
    { label: "Contraseña", value: "Actualizada jun 2026", badge: "Cambiar", cls: "badge--soft" },
  ];

  return `
    <div class="stack">
      <div class="box">
        <div class="box__head">
          <span class="box__title">Datos personales</span>
          <button class="small-btn" data-action="toggle-edit">${p.editing ? "Cancelar" : "Editar"}</button>
        </div>

        ${fields
          .map(
            (f) => `
          <div class="field">
            <div class="field__label">${f.label.toUpperCase()}</div>
            ${
              p.editing
                ? `<input class="field__input" data-field="${f.key}" value="${esc(p[f.key])}">`
                : `<div class="field__value">${esc(p[f.key])}</div>`
            }
          </div>`
          )
          .join("")}

        ${p.editing ? `<button class="btn btn-primary btn--block btn--sm" data-action="save-profile">Guardar cambios</button>` : ""}
        ${p.saved ? `<p class="saved-msg">✓ Cambios guardados</p>` : ""}
      </div>

      <div class="box">
        <div class="box__title" style="margin-bottom:14px">Cuenta y seguridad</div>
        ${security
          .map(
            (row) => `
          <div class="security-row">
            <div>
              <div class="field__label">${row.label.toUpperCase()}</div>
              <div class="security-row__value">${esc(row.value)}</div>
            </div>
            <span class="badge ${row.cls}">${row.badge}</span>
          </div>`
          )
          .join("")}
      </div>

      <div class="cta-box">
        <div class="cta-box__title">¿Eres especialista?</div>
        <p class="cta-box__text">Únete y consigue clientes cada semana en tu ciudad.</p>
        <button class="cta-box__btn">Crear perfil profesional</button>
      </div>

      <button class="logout-btn">Cerrar sesión</button>
    </div>`;
}
