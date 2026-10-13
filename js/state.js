/* =========================================================
   ESTADO DE LA APP & PERSISTENCIA LOCALSTORAGE
   Guarda y recupera datos de usuario, perfil, chats y reservas.
   ========================================================= */

const storage = {
  get(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Error leyendo de localStorage:", e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Error guardando en localStorage:", e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  },

  // Helpers específicos
  getUser() {
    return this.get("hogarix_user", null);
  },

  saveUser(user) {
    this.set("hogarix_user", user);
  },

  getChatMessages() {
    return this.get("hogarix_chat_messages", null);
  },

  saveChatMessages(messages) {
    this.set("hogarix_chat_messages", messages);
  },

  getBookings() {
    return this.get("hogarix_bookings", null);
  },

  saveBookings(bookingsList) {
    this.set("hogarix_bookings", bookingsList);
  },
};

// Cargar datos previos de localStorage si existen
const savedUser = storage.getUser();
const savedMessages = storage.getChatMessages();
const savedBookings = storage.getBookings();

if (savedBookings && Array.isArray(savedBookings) && savedBookings.length > 0) {
  bookings.length = 0;
  bookings.push(...savedBookings);
}

const defaultMessages = Object.fromEntries(conversations.map((c) => [c.id, c.messages.slice()]));
const initialMessages = savedMessages ? { ...defaultMessages, ...savedMessages } : defaultMessages;

const state = {
  /* Portada y Autenticación */
  auth: {
    showPortada: savedUser ? !savedUser.isLoggedIn : true, // Si ya inició sesión, entra a la app; si no, muestra la portada
    isLoggedIn: savedUser ? Boolean(savedUser.isLoggedIn) : false,
    isGuest: savedUser ? Boolean(savedUser.isGuest) : false,
    modal: null, // "register" | "login" | null
    tab: "register", // Pestaña del modal: "register" | "login"
    error: "",
    toast: "",
    form: {
      name: savedUser && savedUser.name ? savedUser.name : "",
      phone: savedUser && savedUser.phone ? savedUser.phone : "+51 ",
      address: savedUser && savedUser.address ? savedUser.address : "Cayma, Arequipa",
      email: savedUser && savedUser.email ? savedUser.email : "",
      password: "",
    },
  },

  /* Pestaña activa: "inicio" | "busqueda" | "chat" | "perfil" */
  tab: "inicio",

  /* Búsqueda */
  search: { query: "", category: "all", sortBy: "rating" },

  /* Chat: conversación abierta, mensajes, fotos adjuntas y simulación de técnico */
  chat: {
    openId: null,
    draft: "",
    attachedPhoto: null, // { url: string, label: string }
    showPresetPicker: false,
    isTyping: false,
    audioPlaying: null, // índice o id de nota de voz en reproducción
    messages: initialMessages,
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
    name: savedUser && savedUser.name ? savedUser.name : userProfile.name,
    phone: savedUser && savedUser.phone ? savedUser.phone : userProfile.phone,
    address: savedUser && savedUser.address ? savedUser.address : userProfile.address,
  },
};
