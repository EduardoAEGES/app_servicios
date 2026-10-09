/* =========================================================
   ESTADO DE LA APP
   Todo lo que cambia mientras se usa la app vive aquí.
   Después de modificarlo, llama a render() para repintar.
   ========================================================= */

const state = {
  /* Pestaña activa: "inicio" | "busqueda" | "chat" | "perfil" */
  tab: "inicio",

  /* Búsqueda */
  search: { query: "", category: "all", sortBy: "rating" },

  /* Chat: conversación abierta (id) y mensajes de cada una */
  chat: {
    openId: null,
    draft: "",
    messages: Object.fromEntries(conversations.map((c) => [c.id, c.messages.slice()])),
  },

  /* Hoja de especialista (null = cerrada) */
  specialist: { id: null, tab: "info" },

  /* Modal de pago: step = "confirm" | "pay" | "done" */
  payment: {
    open: false,
    step: "confirm",
    hours: 2,
    date: "2026-09-20",
    time: "09:00",
    method: "card", // "card" | "yape" | "efectivo"
    cardNumber: "",
    cardName: "",
    cardExp: "",
    cardCvv: "",
  },

  /* Modal de emergencia: step = 1 | 2 | 3 */
  emergency: { open: false, step: 1, category: "", description: "", files: [], sent: false },

  /* Perfil */
  perfil: {
    tab: "servicios", // "servicios" | "cuenta"
    editing: false,
    saved: false,
    name: userProfile.name,
    phone: userProfile.phone,
    address: userProfile.address,
  },
};
