/* =========================================================
   PANTALLA: CHAT INTERACTIVO CON TÉCNICO & FOTOS DE AVERÍAS
   ========================================================= */

function renderChat() {
  return state.chat.openId === null ? renderConversationList() : renderConversation();
}

/* ---------- Lista de conversaciones ---------- */
function renderConversationList() {
  if (conversations.length === 0) {
    return `
      <div class="page-header"><h2 class="page-title">Mensajes</h2></div>
      <div class="empty" style="padding:80px 20px">
        <div class="empty__emoji" style="font-size:48px">💬</div>
        <p>No tienes mensajes aún.</p>
      </div>`;
  }

  const items = conversations
    .map((conv) => {
      const msgs = state.chat.messages[conv.id] || [];
      const last = msgs.length ? msgs[msgs.length - 1].text : "";
      const isOnline = conv.status === "En línea";

      return `
        <button class="conv-item" data-action="open-conversation" data-id="${conv.id}">
          <div class="conv-item__photo-wrap">
            <img class="conv-item__photo" src="${conv.photo}" alt="${esc(conv.specialist)}">
            ${isOnline ? `<span class="conv-online-dot"></span>` : ""}
            ${conv.unread > 0 ? `<div class="unread-badge">${conv.unread}</div>` : ""}
          </div>
          <div class="conv-item__body">
            <div class="conv-item__top">
              <span class="conv-item__name">${esc(conv.specialist)}</span>
              <span class="conv-item__time">${conv.time}</span>
            </div>
            <div class="conv-item__trade-row">
              <span class="conv-item__trade">${esc(conv.trade)}</span>
              ${conv.badge ? `<span class="conv-badge">${conv.badge}</span>` : ""}
            </div>
            <div class="conv-item__last">${esc(last)}</div>
          </div>
        </button>`;
      })
    .join("");

  return `
    <div class="page-header">
      <div class="page-header__top-row">
        <h2 class="page-title">Mensajes con técnicos</h2>
        <button class="btn btn-primary btn--sm" data-action="open-tech-diagnosis">
          + Nueva consulta
        </button>
      </div>
      <p class="page-header__sub">Consulta averías, envía fotos y recibe presupuestos en directo.</p>
    </div>
    <div class="conv-list">${items}</div>`;
}

/* ---------- Conversación abierta ---------- */
function renderConversation() {
  const conv = conversations.find((c) => c.id === state.chat.openId) || conversations[0];
  const hasDraft = state.chat.draft.trim() !== "" || state.chat.attachedPhoto !== null;
  const isOnline = conv.status === "En línea";

  // Chips de averías frecuentes para prueba rápida
  const quickChips = problemPresets
    .map(
      (p) => `
      <button class="chat-chip" data-action="chat-select-preset" data-preset="${p.id}">
        <span>${p.icon}</span> ${esc(p.label)}
      </button>`
    )
    .join("");

  return `
    <div class="chat-screen">
      <!-- Encabezado de la conversación -->
      <div class="chat-header">
        <button class="icon-btn icon-btn--lg icon-btn--dark" data-action="close-conversation" title="Volver">${icons.back(16)}</button>
        <div class="chat-header__avatar-wrap">
          <img class="chat-header__photo" src="${conv.photo}" alt="${esc(conv.specialist)}">
          ${isOnline ? `<span class="chat-header__online-dot"></span>` : ""}
        </div>
        <div class="chat-header__meta">
          <div class="chat-header__name-row">
            <span class="chat-header__name">${esc(conv.specialist)}</span>
            <span class="verified-dot-inline" title="Técnico verificado">✓</span>
          </div>
          <div class="chat-header__status-row">
            <span class="chat-header__trade">${esc(conv.trade)}</span>
            <span class="chat-header__status ${isOnline ? "is-online" : ""}">
              ${isOnline ? "🟢 En línea ahora" : "Última vez hoy"}
            </span>
          </div>
        </div>
        <button class="icon-btn icon-btn--dark chat-header__info-btn" data-action="open-specialist" data-id="${conv.specialistId}" title="Ver ficha técnica">
          ℹ️
        </button>
      </div>

      <!-- Barra de averías rápidas sugeridas -->
      <div class="chat-quick-bar">
        <span class="chat-quick-label">⚡ Probar avería:</span>
        <div class="chat-quick-scroll">
          ${quickChips}
        </div>
      </div>

      <!-- Historial de mensajes -->
      <div id="messages" class="messages">
        ${renderMessages(conv.id)}
        ${
          state.chat.isTyping
            ? `
          <div class="msg-row">
            <div class="bubble bubble--typing">
              <div class="typing-head">
                <span class="live-dot live-dot--sm"></span>
                <span>${esc(conv.specialist)} está respondiendo</span>
              </div>
              <div class="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>`
            : ""
        }
      </div>

      <!-- Previsualización de foto adjunta antes de enviar -->
      ${
        state.chat.attachedPhoto
          ? `
        <div class="chat-photo-preview">
          <img src="${state.chat.attachedPhoto.url}" alt="Foto adjunta" class="chat-photo-preview__img">
          <div class="chat-photo-preview__info">
            <div class="chat-photo-preview__title">📷 Foto de la avería adjunta</div>
            <div class="chat-photo-preview__sub">${esc(state.chat.attachedPhoto.label || "Lista para enviar al técnico")}</div>
          </div>
          <button class="chat-photo-preview__remove" data-action="chat-remove-photo" title="Quitar foto">${icons.close(12)}</button>
        </div>`
          : ""
      }

      <!-- Barra de entrada con botón de cámara / adjunto -->
      <div class="chat-input-bar">
        <button class="chat-attach-btn" data-action="chat-open-file" title="Subir foto de mi problema de casa">
          ${icons.camera(20)}
        </button>
        <input id="chat-file-input" type="file" accept="image/*" hidden>

        <input
          id="chat-input"
          class="chat-input"
          type="text"
          placeholder="Describe tu avería o envía tu foto…"
          value="${esc(state.chat.draft)}"
          autocomplete="off"
        >

        <button id="send-btn" class="send-btn ${hasDraft ? "is-active" : ""}" data-action="send-message" title="Enviar">
          ${icons.send(18)}
        </button>
      </div>
    </div>`;
}

/* ---------- Pintado de mensajes individuales ---------- */
function renderMessages(convId) {
  const msgs = state.chat.messages[convId] || [];

  return msgs
    .map((m, idx) => {
      const isMe = m.from === "me";
      const isAudioActive = state.chat.audioPlaying === idx;

      return `
        <div class="msg-row ${isMe ? "msg-row--me" : ""}">
          <div class="bubble ${isMe ? "bubble--me" : ""}">
            <!-- Foto adjunta de la avería -->
            ${
              m.photo
                ? `
              <div class="bubble-photo-wrap">
                <img class="bubble-photo" src="${m.photo}" alt="${esc(m.photoLabel || "Avería")}" onclick="window.open('${m.photo}', '_blank')">
                <div class="bubble-photo-badge">
                  📷 ${esc(m.photoLabel || "Foto de avería adjunta")}
                </div>
              </div>`
                : ""
            }

            <!-- Texto del mensaje -->
            ${m.text ? `<p class="bubble-text">${esc(m.text)}</p>` : ""}

            <!-- Nota de voz del técnico simulada -->
            ${
              m.audioNote
                ? `
              <div class="audio-note ${isAudioActive ? "is-playing" : ""}" data-action="toggle-audio-note" data-index="${idx}">
                <button class="audio-note__btn" type="button">
                  ${isAudioActive ? icons.pause(14) : icons.play(14)}
                </button>
                <div class="audio-note__body">
                  <div class="audio-note__wave">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div class="audio-note__info">
                    <span class="audio-note__title">🎙️ Audio explicativo del técnico</span>
                    <span class="audio-note__time">${m.audioNote.duration || "0:24"}</span>
                  </div>
                </div>
              </div>`
                : ""
            }

            <!-- Tarjeta de presupuesto sugerido en el chat -->
            ${
              m.quote
                ? `
              <div class="quote-card">
                <div class="quote-card__top">
                  <div>
                    <div class="quote-card__tag">PRESUPUESTO ESTIMADO</div>
                    <div class="quote-card__title">${esc(m.quote.title)}</div>
                  </div>
                  <div class="quote-card__amount">S/.${m.quote.amount}</div>
                </div>
                ${m.quote.desc ? `<p class="quote-card__desc">${esc(m.quote.desc)}</p>` : ""}
                <button class="btn btn-primary btn--block btn--sm" data-action="open-payment" style="margin-top:8px">
                  📅 Agendar visita técnica ahora
                </button>
              </div>`
                : ""
            }

            <p class="bubble__time">${m.time}</p>
          </div>
        </div>`;
    })
    .join("");
}

function scrollMessagesToBottom() {
  const box = document.getElementById("messages");
  if (box) {
    box.scrollTop = box.scrollHeight;
  }
}

/* Envío de mensaje y simulación inteligente de respuesta del técnico */
function sendMessage() {
  const text = state.chat.draft.trim();
  const photo = state.chat.attachedPhoto;

  if ((!text && !photo) || state.chat.openId === null) return;

  const convId = state.chat.openId;
  const userMsg = {
    from: "me",
    text: text || (photo ? "Adjunto la foto de la avería en mi casa para que me des tu diagnóstico." : ""),
    photo: photo ? photo.url : null,
    photoLabel: photo ? photo.label : null,
    time: "Ahora",
  };

  state.chat.messages[convId].push(userMsg);
  state.chat.draft = "";
  state.chat.attachedPhoto = null;

  if (typeof storage !== "undefined") {
    storage.saveChatMessages(state.chat.messages);
  }

  render();
  scrollMessagesToBottom();

  // Simulación de respuesta inteligente del técnico
  triggerTechnicianReply(convId, text, photo);
}

function triggerTechnicianReply(convId, userText, photoObj) {
  state.chat.isTyping = true;
  render();
  scrollMessagesToBottom();

  setTimeout(() => {
    state.chat.isTyping = false;

    // Detectar palabras clave o responder según contexto
    const lower = (userText || "").toLowerCase();
    let replyText = "¡Hola! He recibido tu consulta y la descripción de la avería. Estoy revisando la mejor forma de ayudarte con una solución definitiva.";
    let estCost = 60;
    let desc = "Revisión técnica en domicilio + reparación básica";

    if (photoObj || lower.includes("fuga") || lower.includes("agua") || lower.includes("tubo") || lower.includes("lavabo")) {
      replyText = "¡Hola! Acabo de analizar la foto y los detalles. Parece ser un problema en la junta o empaque de presión. Cierra la llave de paso inferior para no arruinar el piso. Tengo repuestos nuevos y teflón para repararlo hoy mismo.";
      estCost = 65;
      desc = "Mano de obra + cambio de empaque y sellado hidráulico";
    } else if (lower.includes("luz") || lower.includes("chispa") || lower.includes("enchufe") || lower.includes("cortocircuito") || lower.includes("térmica")) {
      replyText = "¡Atención! Por seguridad no toques los contactos ni intentes forzar la llave térmica. Es un recalentamiento en los bornes. Llevo equipo de medición de voltaje y repuestos para cambiar el tomacorriente de forma segura.";
      estCost = 75;
      desc = "Diagnóstico con multímetro + recambio de tomacorriente Bticino";
    } else if (lower.includes("chapa") || lower.includes("puerta") || lower.includes("llave") || lower.includes("cerradura")) {
      replyText = "Hola. Por los síntomas, los pernos del cilindro están trabados. No hagas palanca con la llave para evitar que se rompa. Puedo llegar con extractor y lubricante especializado en 20 minutos.";
      estCost = 50;
      desc = "Apertura técnica sin daños + lubricación de bombín";
    } else if (lower.includes("humedad") || lower.includes("pared") || lower.includes("pintura") || lower.includes("techo")) {
      replyText = "Hola. Veo señales de humedad por filtración interna. Recomiendo medir con detector de humedad antes de sellar y repintar con producto impermeabilizante para que no vuelva a brotar.";
      estCost = 90;
      desc = "Inspección técnica + raspado y aplicación de sellador antihongos";
    }

    state.chat.messages[convId].push({
      from: "them",
      text: replyText,
      audioNote: { duration: "0:25" },
      quote: {
        title: "Presupuesto sugerido",
        amount: estCost,
        desc: desc,
      },
      time: "Ahora",
    });

    if (typeof storage !== "undefined") {
      storage.saveChatMessages(state.chat.messages);
    }

    render();
    scrollMessagesToBottom();
  }, 1600);
}
