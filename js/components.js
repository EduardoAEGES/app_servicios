/* =========================================================
   COMPONENTES REUTILIZABLES
   Funciones que devuelven HTML (texto) para pintar en pantalla.
   ========================================================= */

/* Escapa texto escrito por el usuario para insertarlo en HTML */
function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------- Íconos SVG ---------- */
const icons = {
  close: (size = 14) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>`,
  back: (size = 14) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>`,
  search: (size = 16) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>`,
  chevronRight: (size = 16) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>`,
  send: (size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>`,
  check: (size = 9) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pencil: (size = 10) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11.5 2.5a2.12 2.12 0 013 3L5 15H2v-3L11.5 2.5z"/></svg>`,
  camera: (size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  image: (size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  play: (size = 14) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: (size = 14) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  shieldCheck: (size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  sparkles: (size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>`,
  userCircle: (size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`,
  arrowRight: (size = 16) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,

  /* Íconos de la barra inferior (cambian si la pestaña está activa) */
  navInicio: (a) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="${a ? "#1B4332" : "none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
  navBusqueda: (a) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7" fill="${a ? "#D8F3DC" : "none"}"/><path d="m21 21-4.35-4.35"/></svg>`,
  navChat: (a) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="${a ? "#D8F3DC" : "none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  navPerfil: (a) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="${a ? "#D8F3DC" : "none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
};

/* ---------- Estrellas de calificación ---------- */
function starRating(rating, size = 13) {
  let html = '<span class="stars">';
  for (let n = 1; n <= 5; n++) {
    const fill = n <= Math.round(rating) ? "#40916C" : "#DCF0E4";
    html += `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.4 4.4 12.5l.7-4L2.2 5.7l4-.6L8 1.5z" fill="${fill}"/></svg>`;
  }
  return html + "</span>";
}

/* ---------- Tarjeta de especialista ---------- */
function specialistCard(sp) {
  return `
    <button class="sp-card" data-action="open-specialist" data-id="${sp.id}">
      <div class="sp-card__photo-wrap">
        <img class="sp-card__photo" src="${sp.photo}" alt="${esc(sp.name)}">
        ${sp.verified ? `<div class="verified-dot">${icons.check()}</div>` : ""}
      </div>
      <div class="sp-card__body">
        <div class="sp-card__top">
          <span class="sp-card__name">${esc(sp.name)}</span>
          ${sp.rate > 0 ? `<span class="sp-card__rate">S/.${sp.rate}/hr</span>` : ""}
        </div>
        <div class="sp-card__trade">${esc(sp.trade)} · ${esc(sp.location)}</div>
        <div class="sp-card__meta">
          ${starRating(sp.rating, 11)}
          <span>${sp.rating} (${sp.reviews})</span>
          <span class="dot-sep">·</span>
          <span>${sp.jobs} trabajos</span>
        </div>
      </div>
    </button>`;
}

/* ---------- Asa superior de las hojas (bottom sheets) ---------- */
function sheetHandle() {
  return '<div class="sheet__handle"><div></div></div>';
}
