/* =========================================================
   APP PRINCIPAL
   - render(): pinta la pantalla según el estado
   - Clics: cualquier elemento con data-action="..."
   - Escritura: inputs con id o data-* (ver onInput)
   ========================================================= */

const viewEl = document.getElementById("view");
const modalEl = document.getElementById("modal-root");
const navEl = document.getElementById("bottom-nav");

const screens = {
  inicio: renderInicio,
  busqueda: renderBusqueda,
  chat: renderChat,
  perfil: renderPerfil,
};

/* ---------- Pintado ---------- */

function render() {
  // Si está activa la portada de bienvenida (antes de registrarse)
  if (state.auth.showPortada) {
    viewEl.innerHTML = renderPortada();
    navEl.style.display = "none";
    viewEl.classList.remove("view--chat-open");
    modalEl.innerHTML = renderAuthModal();
    return;
  }

  // Vista principal de la aplicación
  navEl.style.display = "";
  viewEl.innerHTML = screens[state.tab]();
  if (state.tab === "busqueda") updateSearchResults();
  if (state.tab === "chat") scrollMessagesToBottom();
  viewEl.classList.toggle("view--chat-open", state.tab === "chat" && state.chat.openId !== null);
  renderModals();
  renderNav();
}

function renderModals() {
  // Conserva el scroll de las hojas abiertas al repintarlas
  const scrolls = [...modalEl.querySelectorAll(".sheet__scroll")].map((s) => s.scrollTop);
  modalEl.innerHTML = renderSpecialistSheet() + renderEmergencyModal() + renderAuthModal();
  modalEl.querySelectorAll(".sheet__scroll").forEach((s, i) => (s.scrollTop = scrolls[i] || 0));
}

function renderNav() {
  const tabs = [
    { id: "inicio", label: "Inicio", icon: icons.navInicio },
    { id: "busqueda", label: "Búsqueda", icon: icons.navBusqueda },
    { id: "chat", label: "Chat", icon: icons.navChat },
    { id: "perfil", label: "Perfil", icon: icons.navPerfil },
  ];
  navEl.innerHTML = tabs
    .map((t) => {
      const active = state.tab === t.id;
      return `
        <button class="nav-btn ${active ? "is-active" : ""}" data-action="go-tab" data-tab="${t.id}">
          <div class="nav-btn__icon">${t.icon(active)}</div>
          <span class="nav-btn__label">${t.label}</span>
        </button>`;
    })
    .join("");
}

function goTab(tab) {
  state.tab = tab;
  render();
  window.scrollTo(0, 0);
}

/* ---------- Acciones de clic ---------- */

const actions = {
  /* Portada & Autenticación */
  "open-register": () => {
    state.auth.modal = "register";
    state.auth.error = "";
    render();
  },
  "open-login": () => {
    state.auth.modal = "login";
    state.auth.error = "";
    render();
  },
  "auth-tab": (el) => {
    state.auth.modal = el.dataset.tab;
    state.auth.error = "";
    render();
  },
  "close-auth-modal": () => {
    state.auth.modal = null;
    state.auth.error = "";
    render();
  },
  "auth-fill-demo": () => {
    state.auth.form.name = userProfile.name;
    state.auth.form.email = userProfile.email;
    state.auth.form.phone = userProfile.phone;
    state.auth.form.address = userProfile.address;
    state.auth.form.password = "123456";
    render();
  },
  "auth-submit-register": () => {
    const f = state.auth.form;
    if (!f.name || f.name.trim().length < 3) {
      state.auth.error = "Por favor ingresa tu nombre y apellido.";
      render();
      return;
    }
    if (!f.phone || f.phone.trim().length < 8) {
      state.auth.error = "Por favor ingresa un número de celular válido.";
      render();
      return;
    }

    const userData = {
      name: f.name.trim(),
      phone: f.phone.trim(),
      address: f.address.trim() || "Arequipa, Perú",
      email: f.email.trim() || "",
      isLoggedIn: true,
      isGuest: false,
      registeredAt: new Date().toISOString(),
    };
    storage.saveUser(userData);

    // Actualizar perfil del usuario
    state.perfil.name = userData.name;
    state.perfil.phone = userData.phone;
    state.perfil.address = userData.address;
    state.auth.isLoggedIn = true;
    state.auth.isGuest = false;
    state.auth.showPortada = false;
    state.auth.modal = null;
    state.auth.error = "";
    state.tab = "inicio";
    render();
    window.scrollTo(0, 0);
  },
  "auth-submit-login": () => {
    const existing = storage.getUser() || {};
    const f = state.auth.form;
    const userData = {
      name: existing.name || (f.name && f.name.trim()) || userProfile.name,
      phone: existing.phone || f.phone || userProfile.phone,
      address: existing.address || f.address || userProfile.address,
      email: f.email.trim() || existing.email || userProfile.email,
      isLoggedIn: true,
      isGuest: false,
      loggedInAt: new Date().toISOString(),
    };
    storage.saveUser(userData);

    state.perfil.name = userData.name;
    state.perfil.phone = userData.phone;
    state.perfil.address = userData.address;
    state.auth.isLoggedIn = true;
    state.auth.isGuest = false;
    state.auth.showPortada = false;
    state.auth.modal = null;
    state.auth.error = "";
    state.tab = "inicio";
    render();
    window.scrollTo(0, 0);
  },
  "continue-guest": () => {
    state.auth.isGuest = true;
    state.auth.isLoggedIn = false;
    state.auth.showPortada = false;
    state.auth.modal = null;
    state.auth.error = "";
    const existing = storage.getUser() || {};
    existing.isGuest = true;
    existing.isLoggedIn = false;
    storage.saveUser(existing);
    render();
    window.scrollTo(0, 0);
  },
  "logout": () => {
    const existing = storage.getUser() || {};
    existing.isLoggedIn = false;
    existing.isGuest = false;
    storage.saveUser(existing);
    state.auth.showPortada = true;
    state.auth.isLoggedIn = false;
    state.auth.isGuest = false;
    state.auth.modal = null;
    render();
    window.scrollTo(0, 0);
  },

  /* Diagnóstico en Vivo & Averías en Casa */
  "open-tech-diagnosis": () => {
    state.auth.showPortada = false;
    state.chat.openId = 1; // Roberto Medina (Plomero & Técnico de guardia)
    goTab("chat");
  },
  "chat-quick-preset": (el) => {
    const pr = problemPresets.find((p) => p.id === el.dataset.preset);
    if (!pr) return;
    state.auth.showPortada = false;
    state.chat.openId = pr.specialistId || 1;
    state.chat.attachedPhoto = { url: pr.photo, label: pr.title };
    state.chat.draft = pr.userPrompt;
    goTab("chat");
  },
  "chat-select-preset": (el) => {
    const pr = problemPresets.find((p) => p.id === el.dataset.preset);
    if (!pr) return;
    state.chat.attachedPhoto = { url: pr.photo, label: pr.title };
    state.chat.draft = pr.userPrompt;
    render();
    const input = document.getElementById("chat-input");
    if (input) input.focus();
  },
  "chat-open-file": () => {
    const input = document.getElementById("chat-file-input");
    if (input) input.click();
  },
  "chat-remove-photo": () => {
    state.chat.attachedPhoto = null;
    render();
  },
  "toggle-audio-note": (el) => {
    const idx = Number(el.dataset.index);
    state.chat.audioPlaying = state.chat.audioPlaying === idx ? null : idx;
    render();
  },
  "open-payment-direct": (el) => {
    const spId = Number(el.dataset.id || 1);
    state.specialist = { id: spId, tab: "info" };
    state.payment.open = true;
    state.payment.step = "confirm";
    renderModals();
  },

  /* Navegación */
  "go-tab": (el) => goTab(el.dataset.tab),
  "browse-category": (el) => {
    state.search.category = el.dataset.category;
    goTab("busqueda");
  },

  /* Búsqueda */
  "set-category": (el) => {
    state.search.category = el.dataset.category;
    render();
  },
  "clear-search": () => {
    state.search.query = "";
    document.getElementById("search-input").value = "";
    updateSearchResults();
  },

  /* Especialista */
  "open-specialist": (el) => {
    state.specialist = { id: Number(el.dataset.id), tab: "info" };
    renderModals();
  },
  "close-specialist": () => {
    state.specialist.id = null;
    renderModals();
  },
  "specialist-tab": (el) => {
    state.specialist.tab = el.dataset.tab;
    renderModals();
  },
  "message-specialist": () => {
    const conv = conversations.find((c) => c.specialistId === state.specialist.id);
    if (!conv) return;
    state.specialist.id = null;
    state.chat.openId = conv.id;
    goTab("chat");
  },

  /* Pago */
  "open-payment": () => {
    state.payment.open = true;
    state.payment.step = "confirm";
    renderModals();
  },
  "close-payment": () => {
    state.payment.open = false;
    renderModals();
  },
  "hours-minus": () => {
    state.payment.hours = Math.max(1, state.payment.hours - 1);
    renderModals();
  },
  "hours-plus": () => {
    state.payment.hours = Math.min(12, state.payment.hours + 1);
    renderModals();
  },
  "payment-continue": () => {
    state.payment.step = "pay";
    renderModals();
  },
  "payment-back": () => {
    state.payment.step = "confirm";
    renderModals();
  },
  "pay-method": (el) => {
    state.payment.method = el.dataset.method;
    renderModals();
  },
  "payment-submit": () => {
    state.payment.step = "done";
    const sp = currentSpecialist();
    if (sp) {
      const pInfo = priceInfo(sp);
      bookings.unshift({
        id: Date.now(),
        specialist: sp.name,
        trade: sp.trade,
        date: state.payment.date,
        status: "Programado",
        rating: 0,
        amount: pInfo.total || 120,
        photo: sp.photo,
      });
      storage.saveBookings(bookings);
    }
    renderModals();
    setTimeout(() => {
      state.payment.open = false;
      state.specialist.id = null;
      renderModals();
    }, 3000);
  },

  /* Emergencia */
  "open-emergency": () => {
    state.emergency = { open: true, step: 1, category: "", description: "", files: [], sent: false };
    renderModals();
  },
  "close-emergency": () => {
    state.emergency.open = false;
    renderModals();
  },
  "emergency-category": (el) => {
    state.emergency.category = el.dataset.category;
    renderModals();
  },
  "emergency-back": () => {
    state.emergency.step--;
    renderModals();
  },
  "emergency-next": () => {
    const em = state.emergency;
    if (em.step === 1 && !em.category) return;
    if (em.step < 3) {
      em.step++;
    } else {
      em.sent = true;
      setTimeout(() => {
        em.open = false;
        em.sent = false;
        renderModals();
      }, 3000);
    }
    renderModals();
  },
  "pick-files": () => document.getElementById("em-files").click(),
  "remove-file": (el) => {
    state.emergency.files.splice(Number(el.dataset.index), 1);
    renderModals();
  },

  /* Chat */
  "open-conversation": (el) => {
    state.chat.openId = Number(el.dataset.id);
    render();
  },
  "close-conversation": () => {
    state.chat.openId = null;
    state.chat.draft = "";
    state.chat.attachedPhoto = null;
    render();
  },
  "send-message": sendMessage,

  /* Perfil */
  "perfil-tab": (el) => {
    state.perfil.tab = el.dataset.tab;
    render();
  },
  "toggle-edit": () => {
    state.perfil.editing = !state.perfil.editing;
    render();
  },
  "save-profile": () => {
    state.perfil.editing = false;
    state.perfil.saved = true;
    const existing = storage.getUser() || {};
    existing.name = state.perfil.name;
    existing.phone = state.perfil.phone;
    existing.address = state.perfil.address;
    storage.saveUser(existing);
    render();
    setTimeout(() => {
      state.perfil.saved = false;
      if (state.tab === "perfil") render();
    }, 2000);
  },
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const fn = actions[el.dataset.action];
  if (fn) fn(el);
});

/* ---------- Escritura en campos ---------- */

document.addEventListener("input", (e) => {
  const el = e.target;

  if (el.dataset.auth) {
    state.auth.form[el.dataset.auth] = el.value;
  }

  if (el.id === "search-input") {
    state.search.query = el.value;
    updateSearchResults();
  }

  if (el.id === "chat-input") {
    state.chat.draft = el.value;
    const sendBtn = document.getElementById("send-btn");
    if (sendBtn) {
      sendBtn.classList.toggle("is-active", el.value.trim() !== "" || state.chat.attachedPhoto !== null);
    }
  }

  if (el.id === "em-description") {
    state.emergency.description = el.value;
    document.getElementById("em-count").textContent = el.value.length;
    el.classList.toggle("is-filled", el.value.length > 10);
  }

  if (el.dataset.pay) {
    const key = el.dataset.pay;
    const value = formatters[key] ? formatters[key](el.value) : el.value;
    el.value = value;
    state.payment[key] = value;
  }

  if (el.dataset.field) {
    state.perfil[el.dataset.field] = el.value;
  }
});

document.addEventListener("change", (e) => {
  const el = e.target;

  if (el.id === "sort-select") {
    state.search.sortBy = el.value;
    updateSearchResults();
  }

  // Subir foto real en el chat
  if (el.id === "chat-file-input" && el.files && el.files[0]) {
    const file = el.files[0];
    state.chat.attachedPhoto = {
      url: URL.createObjectURL(file),
      label: file.name,
    };
    render();
    const input = document.getElementById("chat-input");
    if (input) input.focus();
  }

  if (el.id === "em-files") {
    const added = Array.from(el.files || []).map((f) => ({
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    state.emergency.files.push(...added);
    renderModals();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.id === "chat-input") sendMessage();
});

/* ---------- Inicio ---------- */

render();

/* Splash screen: se muestra al menos SPLASH_MS y luego se desvanece */
const SPLASH_MS = 1400;

function hideSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;
  splash.classList.add("is-hidden");
  splash.addEventListener("transitionend", () => splash.remove(), { once: true });
}

setTimeout(hideSplash, SPLASH_MS);

/* Service worker (solo funciona servido por http/https, no con file://) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => console.warn("SW no registrado:", err));
  });
}
