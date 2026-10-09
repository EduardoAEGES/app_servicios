import { useState } from "react";
import StarRating from "../components/StarRating";

const bookings = [
  { id: 1, specialist: "Roberto Medina", trade: "Plomería", date: "10 sep 2026", status: "Completado", rating: 5, amount: 700, photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=80&h=80&fit=crop&auto=format" },
  { id: 2, specialist: "Sofía Ramírez", trade: "Limpieza", date: "5 sep 2026", status: "Completado", rating: 5, amount: 400, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format" },
  { id: 3, specialist: "Valentina Cruz", trade: "Electricidad", date: "18 sep 2026", status: "Programado", rating: 0, amount: 840, photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format" },
  { id: 4, specialist: "Andrés Fuentes", trade: "Carpintería", date: "20 sep 2026", status: "Programado", rating: 0, amount: 1100, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Completado: { bg: "#D8F3DC", color: "#2D7A56" },
  Programado: { bg: "#E0F0FF", color: "#2A6DA8" },
  Cancelado: { bg: "#FFE8E0", color: "#B03000" },
};

export default function PerfilTab() {
  const [tab, setTab] = useState<"servicios" | "cuenta">("servicios");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Carlos Mendoza");
  const [phone, setPhone] = useState("+51 902 666 187");
  const [address, setAddress] = useState("Av. Insurgentes Sur 123 - Cayma");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalGastado = bookings.filter((b) => b.status === "Completado").reduce((s, b) => s + b.amount, 0);

  return (
    <div>
      {/* Profile header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0D2B1F 0%, #1B4332 70%)",
          padding: "52px 20px 24px",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format"
              alt={name}
              style={{ width: 68, height: 68, borderRadius: 20, objectFit: "cover", background: "#2D7A56", border: "3px solid rgba(170,255,107,0.3)" }}
            />
            <button style={{ position: "absolute", bottom: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: "#AAFF6B", border: "2px solid #1B4332", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#0D2B1F" strokeWidth="2" strokeLinecap="round">
                <path d="M11.5 2.5a2.12 2.12 0 013 3L5 15H2v-3L11.5 2.5z" />
              </svg>
            </button>
          </div>
          <div>
            <h2 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 20, color: "#FFFFFF", margin: "0 0 3px", letterSpacing: "-0.02em" }}>
              {name}
            </h2>
            <p style={{ color: "#74C69D", fontSize: 12, margin: 0 }}>
              Cliente · Miembro desde ago 2025
            </p>
          </div>
        </div>

        {/* Mini stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 20 }}>
          {[
            { v: bookings.length, l: "Servicios" },
            { v: bookings.filter((b) => b.status === "Completado").length, l: "Completados" },
            { v: `S/.${totalGastado}`, l: "Gastado" },
          ].map((s) => (
            <div key={s.l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 16, color: "#AAFF6B" }}>{s.v}</div>
              <div style={{ fontSize: 10, color: "#74C69D", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 20 }}>
          {(["servicios", "cuenta"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 10,
                border: "none",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                background: tab === t ? "#AAFF6B" : "rgba(255,255,255,0.08)",
                color: tab === t ? "#0D2B1F" : "#74C69D",
                fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
              }}
            >
              {t === "servicios" ? "Mis servicios" : "Mi cuenta"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {tab === "servicios" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {bookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #DCF0E4",
                    borderRadius: 16,
                    padding: "14px",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <img src={b.photo} alt={b.specialist} style={{ width: 46, height: 46, borderRadius: 12, objectFit: "cover", background: "#B7E4C7", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 13, color: "#0D2B1F" }}>
                        {b.specialist}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, ...statusStyle[b.status] }}>
                        {b.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#40916C", fontWeight: 500, marginBottom: 3 }}>{b.trade}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#7A9E8A" }}>📅 {b.date}</span>
                      {b.rating > 0 && <StarRating rating={b.rating} size={10} />}
                    </div>
                  </div>
                  <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 14, color: "#1B4332", flexShrink: 0 }}>
                    S/.{b.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "cuenta" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Personal data */}
            <div style={{ background: "#FFFFFF", border: "1px solid #DCF0E4", borderRadius: 16, padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F" }}>
                  Datos personales
                </span>
                <button
                  onClick={() => setEditing(!editing)}
                  style={{ fontSize: 11, fontWeight: 700, color: "#1B4332", background: "#F0FAF4", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer" }}
                >
                  {editing ? "Cancelar" : "Editar"}
                </button>
              </div>

              {[
                { label: "Nombre", value: name, set: setName },
                { label: "Teléfono", value: phone, set: setPhone },
                { label: "Dirección", value: address, set: setAddress },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#7A9E8A", marginBottom: 4, letterSpacing: "0.05em" }}>
                    {field.label.toUpperCase()}
                  </div>
                  {editing ? (
                    <input
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      style={{
                        width: "100%",
                        fontSize: 13,
                        color: "#0D2B1F",
                        background: "#F0FAF4",
                        border: "1.5px solid #40916C",
                        borderRadius: 10,
                        padding: "9px 12px",
                        outline: "none",
                        fontFamily: "Outfit, system-ui, sans-serif",
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 13, color: "#0D2B1F" }}>{field.value}</div>
                  )}
                </div>
              ))}

              {editing && (
                <button
                  onClick={handleSave}
                  style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "none", background: "#1B4332", color: "#AAFF6B", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}
                >
                  Guardar cambios
                </button>
              )}
              {saved && <p style={{ textAlign: "center", color: "#40916C", fontSize: 12, marginTop: 8 }}>✓ Cambios guardados</p>}
            </div>

            {/* Account security */}
            <div style={{ background: "#FFFFFF", border: "1px solid #DCF0E4", borderRadius: 16, padding: "18px" }}>
              <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F", marginBottom: 14 }}>
                Cuenta y seguridad
              </div>
              {[
                { label: "Correo", value: "carlos.mendoza@gmail.com", badge: "Verificado", badgeColor: { bg: "#D8F3DC", color: "#2D7A56" } },
                { label: "Contraseña", value: "Actualizada jun 2026", badge: "Cambiar", badgeColor: { bg: "#F0FAF4", color: "#40916C" } },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid #F0FAF4" }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#7A9E8A", letterSpacing: "0.05em" }}>{row.label.toUpperCase()}</div>
                    <div style={{ fontSize: 12, color: "#3A5C4A", marginTop: 2 }}>{row.value}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, ...row.badgeColor }}>
                    {row.badge}
                  </span>
                </div>
              ))}
            </div>

            {/* Specialist CTA */}
            <div style={{ background: "linear-gradient(130deg, #1B4332, #2D7A56)", borderRadius: 16, padding: "18px" }}>
              <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 15, color: "#AAFF6B", marginBottom: 4 }}>
                ¿Eres especialista?
              </div>
              <p style={{ fontSize: 12, color: "#B7E4C7", marginBottom: 14 }}>
                Únete y consigue clientes cada semana en tu ciudad.
              </p>
              <button style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: "none", background: "#AAFF6B", color: "#0D2B1F", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>
                Crear perfil profesional
              </button>
            </div>

            {/* Logout */}
            <button style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "1.5px solid #DCF0E4", background: "transparent", color: "#7A9E8A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
