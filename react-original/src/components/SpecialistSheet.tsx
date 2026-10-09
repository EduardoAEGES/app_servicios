import { useState } from "react";
import StarRating from "./StarRating";
import { specialists, reviewsMap, conversations } from "../data";

interface Props {
  specialistId: number;
  onClose: () => void;
  onChat: (convId: number) => void;
}

type PayMethod = "card" | "yape" | "efectivo";

export default function SpecialistSheet({ specialistId, onClose, onChat }: Props) {
  const sp = specialists.find((s) => s.id === specialistId);
  const [tab, setTab] = useState<"info" | "reviews">("info");
  const [showPayment, setShowPayment] = useState(false);
  const [payStep, setPayStep] = useState<"confirm" | "pay" | "done">("confirm");
  const [hours, setHours] = useState(2);
  const [date, setDate] = useState("2026-09-20");
  const [time, setTime] = useState("09:00");
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  if (!sp) return null;
  const reviews = reviewsMap[sp.id] || [];
  const conv = conversations.find((c) => c.specialistId === sp.id);
  const rateLabel = sp.rate > 0 ? `S/.${sp.rate}/hr` : "Consultar";
  const subtotal = sp.rate > 0 ? sp.rate * hours : 0;
  const serviceFee = sp.rate > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + serviceFee;

  const openPayment = () => {
    setPayStep("confirm");
    setShowPayment(true);
  };

  const handlePay = () => {
    setPayStep("done");
    setTimeout(() => {
      setShowPayment(false);
      onClose();
    }, 3000);
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (val: string) =>
    val.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={showPayment ? undefined : onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(13,43,31,0.5)", zIndex: 200 }}
      />

      {/* Specialist sheet */}
      <div
        style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 480, background: "#FFFFFF",
          borderRadius: "24px 24px 0 0", zIndex: 201,
          maxHeight: "88svh", display: "flex", flexDirection: "column", overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#DCF0E4" }} />
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 100px" }}>
          {/* Header */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 0 20px", borderBottom: "1px solid #F0FAF4" }}>
            <img src={sp.photo} alt={sp.name} style={{ width: 72, height: 72, borderRadius: 18, objectFit: "cover", background: "#B7E4C7", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 18, color: "#0D2B1F" }}>{sp.name}</span>
                {sp.verified && (
                  <span style={{ background: "#D8F3DC", color: "#2D7A56", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>✓ Verificado</span>
                )}
              </div>
              <div style={{ color: "#40916C", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{sp.trade} · {sp.experience} años de exp.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <StarRating rating={sp.rating} size={13} />
                <span style={{ fontSize: 12, color: "#7A9E8A" }}>{sp.rating} · {sp.reviews} reseñas</span>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "#F0FAF4", border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#7A9E8A" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "16px 0", borderBottom: "1px solid #F0FAF4" }}>
            {[
              { label: "Trabajos", value: sp.jobs },
              { label: "Tarifa/hr", value: rateLabel },
              { label: "Disponible", value: sp.availability.split(",")[0] },
            ].map((s) => (
              <div key={s.label} style={{ background: "#F0FAF4", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
                <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 15, color: "#1B4332" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#7A9E8A", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, padding: "14px 0 0", marginBottom: 14 }}>
            {(["info", "reviews"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: tab === t ? "#1B4332" : "#F0FAF4", color: tab === t ? "#AAFF6B" : "#7A9E8A", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>
                {t === "info" ? "Información" : `Reseñas (${reviews.length})`}
              </button>
            ))}
          </div>

          {tab === "info" && (
            <div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#3A5C4A", marginBottom: 16 }}>{sp.bio}</p>
              <div style={{ marginBottom: 6, fontWeight: 700, fontSize: 12, color: "#0D2B1F", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>ESPECIALIDADES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {sp.skills.map((s) => (
                  <span key={s} style={{ background: "#F0FAF4", color: "#2D7A56", fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20, border: "1px solid #DCF0E4" }}>{s}</span>
                ))}
              </div>
              <div style={{ padding: "12px 14px", background: "#F0FAF4", borderRadius: 14, fontSize: 12, color: "#3A5C4A" }}>
                📍 {sp.location} &nbsp;·&nbsp; 🕐 {sp.availability}
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {reviews.length === 0 && <p style={{ color: "#7A9E8A", fontSize: 13 }}>Sin reseñas aún.</p>}
              {reviews.map((rev, i) => (
                <div key={i} style={{ background: "#F0FAF4", borderRadius: 14, padding: "14px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    <img src={rev.avatar} alt={rev.author} style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover", background: "#B7E4C7" }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#0D2B1F" }}>{rev.author}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <StarRating rating={rev.rating} size={11} />
                        <span style={{ fontSize: 11, color: "#7A9E8A" }}>{rev.date}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.6, color: "#3A5C4A", margin: 0 }}>{rev.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA footer */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 20px 24px", background: "#FFFFFF", borderTop: "1px solid #F0FAF4", display: "flex", gap: 10 }}>
          <button
            onClick={() => conv && onChat(conv.id)}
            style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: "1.5px solid #DCF0E4", background: "#F0FAF4", color: "#1B4332", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}
          >
            💬 Mensaje
          </button>
          <button
            onClick={openPayment}
            style={{ flex: 2, padding: "14px 0", borderRadius: 14, border: "none", background: "#1B4332", color: "#AAFF6B", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}
          >
            Solicitar servicio
          </button>
        </div>
      </div>

      {/* ── Payment / Confirmation modal ── */}
      {showPayment && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(13,43,31,0.65)", zIndex: 300 }} />
          <div
            style={{
              position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: "100%", maxWidth: 480, background: "#FFFFFF",
              borderRadius: "24px 24px 0 0", zIndex: 301,
              maxHeight: "92svh", display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "#DCF0E4" }} />
            </div>

            <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 110px" }}>

              {/* ── DONE ── */}
              {payStep === "done" && (
                <div style={{ textAlign: "center", padding: "52px 20px" }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 22, color: "#0D2B1F", margin: "0 0 8px" }}>¡Servicio confirmado!</h3>
                  <p style={{ fontSize: 13, color: "#7A9E8A", lineHeight: 1.7, marginBottom: 20 }}>
                    {sp.name} ha recibido tu solicitud.<br />Llegará el <strong style={{ color: "#1B4332" }}>{date}</strong> a las <strong style={{ color: "#1B4332" }}>{time}</strong>.
                  </p>
                  <div style={{ background: "#F0FAF4", borderRadius: 16, padding: "16px 20px", textAlign: "left" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#7A9E8A" }}>Subtotal ({hours}h)</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#0D2B1F" }}>S/.{subtotal}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #DCF0E4" }}>
                      <span style={{ fontSize: 13, color: "#7A9E8A" }}>Tarifa de servicio</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#0D2B1F" }}>S/.{serviceFee}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0D2B1F" }}>Total pagado</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#1B4332", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>S/.{total}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CONFIRM step ── */}
              {payStep === "confirm" && (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 20px", borderBottom: "1px solid #F0FAF4" }}>
                    <div>
                      <h3 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 18, color: "#0D2B1F", margin: "0 0 3px" }}>Confirmar servicio</h3>
                      <p style={{ fontSize: 12, color: "#7A9E8A", margin: 0 }}>Revisa los detalles antes de pagar</p>
                    </div>
                    <button onClick={() => setShowPayment(false)} style={{ background: "#F0FAF4", border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#7A9E8A" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
                    </button>
                  </div>

                  {/* Specialist summary */}
                  <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px", background: "#F0FAF4", borderRadius: 16, margin: "16px 0" }}>
                    <img src={sp.photo} alt={sp.name} style={{ width: 50, height: 50, borderRadius: 14, objectFit: "cover", background: "#B7E4C7", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F" }}>{sp.name}</div>
                      <div style={{ fontSize: 12, color: "#40916C", fontWeight: 500 }}>{sp.trade}</div>
                      <div style={{ fontSize: 12, color: "#7A9E8A" }}>{rateLabel}</div>
                    </div>
                  </div>

                  {/* Date & time */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0D2B1F", marginBottom: 10, fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>Fecha y hora</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div>
                        <label style={{ fontSize: 11, color: "#7A9E8A", fontWeight: 600, display: "block", marginBottom: 4 }}>FECHA</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min="2026-09-13"
                          style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: "1.5px solid #DCF0E4", background: "#FFFFFF", fontSize: 13, color: "#0D2B1F", outline: "none", fontFamily: "Outfit, system-ui, sans-serif" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, color: "#7A9E8A", fontWeight: 600, display: "block", marginBottom: 4 }}>HORA</label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                          style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: "1.5px solid #DCF0E4", background: "#FFFFFF", fontSize: 13, color: "#0D2B1F", outline: "none", fontFamily: "Outfit, system-ui, sans-serif" }} />
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  {sp.rate > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#0D2B1F", marginBottom: 10, fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>Horas estimadas</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button onClick={() => setHours((h) => Math.max(1, h - 1))} style={{ width: 40, height: 40, borderRadius: 12, border: "1.5px solid #DCF0E4", background: "#FFFFFF", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1B4332", fontWeight: 700 }}>−</button>
                        <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 20, color: "#0D2B1F", minWidth: 24, textAlign: "center" }}>{hours}</span>
                        <button onClick={() => setHours((h) => Math.min(12, h + 1))} style={{ width: 40, height: 40, borderRadius: 12, border: "1.5px solid #DCF0E4", background: "#FFFFFF", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1B4332", fontWeight: 700 }}>+</button>
                        <span style={{ fontSize: 12, color: "#7A9E8A" }}>× S/.{sp.rate}/hr</span>
                      </div>
                    </div>
                  )}

                  {/* Price breakdown */}
                  {sp.rate > 0 && (
                    <div style={{ background: "#F0FAF4", borderRadius: 16, padding: "16px", marginBottom: 4 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "#7A9E8A" }}>Subtotal ({hours}h)</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#0D2B1F" }}>S/.{subtotal}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #DCF0E4" }}>
                        <span style={{ fontSize: 13, color: "#7A9E8A" }}>Tarifa de servicio (5%)</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#0D2B1F" }}>S/.{serviceFee}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0D2B1F" }}>Total</span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: "#1B4332", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>S/.{total}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ── PAY step ── */}
              {payStep === "pay" && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0 20px", borderBottom: "1px solid #F0FAF4" }}>
                    <button onClick={() => setPayStep("confirm")} style={{ background: "#F0FAF4", border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                    </button>
                    <div>
                      <h3 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 18, color: "#0D2B1F", margin: 0 }}>Método de pago</h3>
                      {sp.rate > 0 && <p style={{ fontSize: 12, color: "#7A9E8A", margin: 0 }}>Total: S/.{total}</p>}
                    </div>
                  </div>

                  {/* Payment method selection */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "16px 0" }}>
                    {([
                      { id: "card", label: "Tarjeta de crédito / débito", icon: "💳" },
                      { id: "yape", label: "Yape / Plin", icon: "📱" },
                      { id: "efectivo", label: "Efectivo al finalizar", icon: "💵" },
                    ] as { id: PayMethod; label: string; icon: string }[]).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPayMethod(m.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                          borderRadius: 14, border: "1.5px solid", cursor: "pointer", textAlign: "left",
                          borderColor: payMethod === m.id ? "#1B4332" : "#DCF0E4",
                          background: payMethod === m.id ? "#F0FAF4" : "#FFFFFF",
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{m.icon}</span>
                        <span style={{ fontWeight: 600, fontSize: 13, color: payMethod === m.id ? "#1B4332" : "#0D2B1F" }}>{m.label}</span>
                        <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", border: "2px solid", borderColor: payMethod === m.id ? "#1B4332" : "#DCF0E4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {payMethod === m.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1B4332" }} />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Card form */}
                  {payMethod === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "#7A9E8A", display: "block", marginBottom: 5, letterSpacing: "0.05em" }}>NÚMERO DE TARJETA</label>
                        <input
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCard(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #DCF0E4", fontSize: 14, color: "#0D2B1F", outline: "none", fontFamily: "Outfit, system-ui, sans-serif", letterSpacing: "0.05em" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "#7A9E8A", display: "block", marginBottom: 5, letterSpacing: "0.05em" }}>NOMBRE EN LA TARJETA</label>
                        <input
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          placeholder="CARLOS MENDOZA"
                          style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #DCF0E4", fontSize: 13, color: "#0D2B1F", outline: "none", fontFamily: "Outfit, system-ui, sans-serif", letterSpacing: "0.05em" }}
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 700, color: "#7A9E8A", display: "block", marginBottom: 5, letterSpacing: "0.05em" }}>VENCIMIENTO</label>
                          <input
                            value={cardExp}
                            onChange={(e) => setCardExp(formatExp(e.target.value))}
                            placeholder="MM/AA"
                            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #DCF0E4", fontSize: 13, color: "#0D2B1F", outline: "none", fontFamily: "Outfit, system-ui, sans-serif" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 700, color: "#7A9E8A", display: "block", marginBottom: 5, letterSpacing: "0.05em" }}>CVV</label>
                          <input
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="•••"
                            type="password"
                            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #DCF0E4", fontSize: 13, color: "#0D2B1F", outline: "none", fontFamily: "Outfit, system-ui, sans-serif" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {payMethod === "yape" && (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <div style={{ width: 120, height: 120, borderRadius: 16, background: "#F0FAF4", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>📱</div>
                      <p style={{ fontSize: 13, color: "#7A9E8A", lineHeight: 1.6 }}>
                        Escanea el QR con Yape o Plin<br />
                        al momento del servicio.<br />
                        <strong style={{ color: "#1B4332" }}>Número: +51 902 777 888</strong>
                      </p>
                    </div>
                  )}

                  {payMethod === "efectivo" && (
                    <div style={{ background: "#F0FAF4", borderRadius: 14, padding: "16px", marginTop: 4 }}>
                      <p style={{ fontSize: 13, color: "#3A5C4A", lineHeight: 1.7, margin: 0 }}>
                        Pagarás <strong>S/.{total > 0 ? total : "según presupuesto"}</strong> en efectivo directamente al especialista al finalizar el trabajo. No se cobra nada por adelantado.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {payStep !== "done" && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 20px 28px", background: "#FFFFFF", borderTop: "1px solid #F0FAF4" }}>
                {payStep === "confirm" && (
                  <button
                    onClick={() => setPayStep("pay")}
                    style={{ width: "100%", padding: "16px 0", borderRadius: 16, border: "none", background: "#1B4332", color: "#AAFF6B", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}
                  >
                    Continuar al pago →
                  </button>
                )}
                {payStep === "pay" && (
                  <button
                    onClick={handlePay}
                    style={{ width: "100%", padding: "16px 0", borderRadius: 16, border: "none", background: "#1B4332", color: "#AAFF6B", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", boxShadow: "0 4px 20px rgba(27,67,50,0.25)" }}
                  >
                    {sp.rate > 0 ? `Pagar S/.${total}` : "Confirmar solicitud"}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
