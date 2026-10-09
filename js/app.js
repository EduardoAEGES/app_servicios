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
  modalEl.innerHTML = renderSpecialistSheet() + renderEmergencyModal();
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

  if (el.id === "search-input") {
    state.search.query = el.value;
    updateSearchResults();
  }

  if (el.id === "chat-input") {
    state.chat.draft = el.value;
    document.getElementById("send-btn").classList.toggle("is-active", el.value.trim() !== "");
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
const SPLASH_MS = 2000;

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
