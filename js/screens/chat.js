/* =========================================================
   PANTALLA: CHAT
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
      const msgs = state.chat.messages[conv.id];
      const last = msgs.length ? msgs[msgs.length - 1].text : "";
      return `
        <button class="conv-item" data-action="open-conversation" data-id="${conv.id}">
          <div class="conv-item__photo-wrap">
            <img class="conv-item__photo" src="${conv.photo}" alt="${esc(conv.specialist)}">
            ${conv.unread > 0 ? `<div class="unread-badge">${conv.unread}</div>` : ""}
          </div>
          <div class="conv-item__body">
            <div class="conv-item__top">
              <span class="conv-item__name">${esc(conv.specialist)}</span>
              <span class="conv-item__time">${conv.time}</span>
            </div>
            <div class="conv-item__trade">${esc(conv.trade)}</div>
            <div class="conv-item__last">${esc(last)}</div>
          </div>
        </button>`;
    })
    .join("");

  return `
    <div class="page-header"><h2 class="page-title">Mensajes</h2></div>
    <div class="conv-list">${items}</div>`;
}

/* ---------- Conversación abierta ---------- */
function renderConversation() {
  const conv = conversations.find((c) => c.id === state.chat.openId);
  const hasDraft = state.chat.draft.trim() !== "";

  return `
    <div class="chat-screen">
      <div class="chat-header">
        <button class="icon-btn icon-btn--lg icon-btn--dark" data-action="close-conversation">${icons.back(16)}</button>
        <img class="chat-header__photo" src="${conv.photo}" alt="${esc(conv.specialist)}">
        <div>
          <div class="chat-header__name">${esc(conv.specialist)}</div>
          <div class="chat-header__trade">${esc(conv.trade)}</div>
        </div>
      </div>

      <div id="messages" class="messages">${renderMessages(conv.id)}</div>

      <div class="chat-input-bar">
        <input id="chat-input" class="chat-input" type="text" placeholder="Escribe un mensaje…" value="${esc(state.chat.draft)}">
        <button id="send-btn" class="send-btn ${hasDraft ? "is-active" : ""}" data-action="send-message">${icons.send(18)}</button>
      </div>
    </div>`;
}

function renderMessages(convId) {
  return state.chat.messages[convId]
    .map(
      (m) => `
      <div class="msg-row ${m.from === "me" ? "msg-row--me" : ""}">
        <div class="bubble ${m.from === "me" ? "bubble--me" : ""}">
          <p>${esc(m.text)}</p>
          <p class="bubble__time">${m.time}</p>
        </div>
      </div>`
    )
    .join("");
}

function scrollMessagesToBottom() {
  const box = document.getElementById("messages");
  if (box) box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  const text = state.chat.draft.trim();
  if (!text || state.chat.openId === null) return;

  state.chat.messages[state.chat.openId].push({ from: "me", text, time: "Ahora" });
  state.chat.draft = "";

  document.getElementById("messages").innerHTML = renderMessages(state.chat.openId);
  const input = document.getElementById("chat-input");
  input.value = "";
  input.focus();
  document.getElementById("send-btn").classList.remove("is-active");
  scrollMessagesToBottom();
}
