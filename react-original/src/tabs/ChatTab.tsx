import { useState, useRef, useEffect } from "react";
import { conversations } from "../data";
import type { ChatMsg } from "../types";

interface Props {
  openConv: number | null;
  setOpenConv: (id: number | null) => void;
}

export default function ChatTab({ openConv, setOpenConv }: Props) {
  const [convMessages, setConvMessages] = useState<Record<number, ChatMsg[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeConv = openConv !== null ? conversations.find((c) => c.id === openConv) : null;
  const msgs = activeConv ? convMessages[activeConv.id] : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, openConv]);

  const sendMessage = () => {
    if (!draft.trim() || !activeConv) return;
    const newMsg: ChatMsg = { from: "me", text: draft.trim(), time: "Ahora" };
    setConvMessages((prev) => ({
      ...prev,
      [activeConv.id]: [...(prev[activeConv.id] || []), newMsg],
    }));
    setDraft("");
  };

  /* ── Conversation list ── */
  if (!openConv) {
    return (
      <div>
        <div style={{ padding: "52px 20px 20px", borderBottom: "1px solid #DCF0E4", background: "#F2F8F4" }}>
          <h2 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 22, color: "#0D2B1F", margin: 0, letterSpacing: "-0.02em" }}>
            Mensajes
          </h2>
        </div>

        {conversations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
            <p style={{ color: "#7A9E8A", fontSize: 14 }}>No tienes mensajes aún.</p>
          </div>
        ) : (
          <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setOpenConv(conv.id)}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  background: "#FFFFFF",
                  border: "1px solid #DCF0E4",
                  borderRadius: 16,
                  padding: "14px",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={conv.photo}
                    alt={conv.specialist}
                    style={{ width: 50, height: 50, borderRadius: 14, objectFit: "cover", background: "#B7E4C7" }}
                  />
                  {conv.unread > 0 && (
                    <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#1B4332", border: "2px solid #F2F8F4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#AAFF6B", fontSize: 9, fontWeight: 800 }}>{conv.unread}</span>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F" }}>
                      {conv.specialist}
                    </span>
                    <span style={{ fontSize: 11, color: "#7A9E8A" }}>{conv.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#40916C", fontWeight: 500, marginBottom: 2 }}>{conv.trade}</div>
                  <div style={{ fontSize: 12, color: "#7A9E8A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {convMessages[conv.id]?.at(-1)?.text ?? conv.lastMessage}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Open conversation ── */
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100svh" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "52px 16px 14px",
          background: "#FFFFFF",
          borderBottom: "1px solid #DCF0E4",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setOpenConv(null)}
          style={{ background: "#F0FAF4", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <img src={activeConv!.photo} alt={activeConv!.specialist} style={{ width: 40, height: 40, borderRadius: 12, objectFit: "cover", background: "#B7E4C7" }} />
        <div>
          <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F" }}>
            {activeConv!.specialist}
          </div>
          <div style={{ fontSize: 11, color: "#40916C", fontWeight: 500 }}>{activeConv!.trade}</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 16px", display: "flex", flexDirection: "column", gap: 10, background: "#F2F8F4" }}>
        {msgs.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "78%",
                background: msg.from === "me" ? "#1B4332" : "#FFFFFF",
                color: msg.from === "me" ? "#E8FAF0" : "#0D2B1F",
                borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "10px 14px",
                fontSize: 13,
                lineHeight: 1.5,
                border: msg.from === "me" ? "none" : "1px solid #DCF0E4",
              }}
            >
              <p style={{ margin: 0 }}>{msg.text}</p>
              <p style={{ margin: "4px 0 0", fontSize: 10, color: msg.from === "me" ? "#74C69D" : "#7A9E8A", textAlign: "right" }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "12px 16px 24px",
          background: "#FFFFFF",
          borderTop: "1px solid #DCF0E4",
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          placeholder="Escribe un mensaje…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            background: "#F0FAF4",
            border: "1.5px solid #DCF0E4",
            borderRadius: 14,
            padding: "12px 14px",
            fontSize: 13,
            color: "#0D2B1F",
            outline: "none",
            fontFamily: "Outfit, system-ui, sans-serif",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: draft.trim() ? "#1B4332" : "#DCF0E4",
            border: "none",
            cursor: draft.trim() ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={draft.trim() ? "#AAFF6B" : "#7A9E8A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
