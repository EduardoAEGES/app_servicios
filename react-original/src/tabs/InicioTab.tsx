import { useState, useRef } from "react";
import SpecialistCard from "../components/SpecialistCard";
import { categories, specialists } from "../data";

interface Props {
  onSpecialist: (id: number) => void;
  onBrowse: () => void;
}

interface AttachedFile {
  name: string;
  type: string;
  url: string;
}

const emergencyCategories = [
  { id: "plomeria", label: "Plomería", icon: "💧" },
  { id: "electricidad", label: "Electricidad", icon: "⚡" },
  { id: "gas", label: "Gas", icon: "🔥" },
  { id: "cerrajeria", label: "Cerrajería", icon: "🔑" },
  { id: "climatizacion", label: "Clima / AC", icon: "❄️" },
  { id: "estructural", label: "Estructural", icon: "🏗️" },
  { id: "limpieza", label: "Limpieza urgente", icon: "🧹" },
  { id: "otro", label: "Otro", icon: "🔧" },
];

export default function InicioTab({ onSpecialist, onBrowse }: Props) {
  const featured = specialists.filter((s) => s.verified).slice(0, 3);
  const [showEmergency, setShowEmergency] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCat, setSelectedCat] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [sent, setSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openEmergency = () => {
    setStep(1);
    setSelectedCat("");
    setDescription("");
    setFiles([]);
    setSent(false);
    setShowEmergency(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const mapped: AttachedFile[] = selected.map((f) => ({
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setShowEmergency(false);
      setSent(false);
    }, 3000);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0D2B1F 0%, #1B4332 55%, #2D7A56 100%)",
          padding: "52px 20px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(170,255,107,0.07)" }} />
        <div style={{ position: "absolute", top: 20, right: 30, width: 90, height: 90, borderRadius: "50%", background: "rgba(170,255,107,0.06)" }} />

        <div style={{ position: "relative" }}>
          <p style={{ color: "#74C69D", fontSize: 12, fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em" }}>
            Buenos días 👋
          </p>
          <h1
            style={{
              fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
              color: "#FFFFFF",
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.2,
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            ¿Qué necesitas{" "}
            <span style={{ color: "#AAFF6B" }}>arreglar</span>{" "}
            hoy?
          </h1>
          <p style={{ color: "#74C69D", fontSize: 13, margin: "0 0 20px" }}>
            Especialistas verificados, siempre cerca.
          </p>

          {/* Search bar */}
          <button
            onClick={onBrowse}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 14,
              padding: "13px 16px",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              marginBottom: 14,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#74C69D" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              Buscar servicio o especialista…
            </span>
          </button>

          {/* Emergency button */}
          <button
            onClick={openEmergency}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#FF3B30",
              border: "none",
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,59,48,0.4)",
            }}
          >
            <span style={{ fontSize: 18 }}>🚨</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 14, fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", lineHeight: 1.2 }}>
                Solicitud de emergencia
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>
                Atención prioritaria en minutos
              </div>
            </div>
            <svg style={{ marginLeft: "auto" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Categories */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 15, color: "#0D2B1F" }}>
              Servicios
            </span>
            <button onClick={onBrowse} style={{ fontSize: 12, color: "#40916C", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
              Ver todos →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={onBrowse}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  background: "#FFFFFF",
                  border: "1px solid #DCF0E4",
                  borderRadius: 16,
                  padding: "14px 8px 10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: cat.color + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {cat.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#3A5C4A", textAlign: "center", lineHeight: 1.2 }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 15, color: "#0D2B1F" }}>
              Mejor calificados
            </span>
            <button onClick={onBrowse} style={{ fontSize: 12, color: "#40916C", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
              Ver todos →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {featured.map((sp) => (
              <SpecialistCard key={sp.id} sp={sp} onClick={() => onSpecialist(sp.id)} />
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ background: "#F0FAF4", borderRadius: 20, padding: "20px", marginBottom: 8 }}>
          <div style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 14, color: "#0D2B1F", marginBottom: 16 }}>
            ¿Cómo funciona ArreglaYa?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { n: "01", t: "Busca el servicio", d: "Plomería, electricidad, limpieza y más." },
              { n: "02", t: "Elige tu especialista", d: "Lee reseñas y solicita presupuesto." },
              { n: "03", t: "Paga al finalizar", d: "Solo pagas cuando termina el trabajo." },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#1B4332", color: "#AAFF6B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0D2B1F", marginBottom: 2 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: "#7A9E8A" }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Emergency modal ── */}
      {showEmergency && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => !sent && setShowEmergency(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(13,43,31,0.55)", zIndex: 300 }}
          />

          {/* Sheet */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 480,
              background: "#FFFFFF",
              borderRadius: "24px 24px 0 0",
              zIndex: 301,
              maxHeight: "90svh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "#DCF0E4" }} />
            </div>

            {/* Scrollable content */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 24px" }}>
              {sent ? (
                /* ── Success state ── */
                <div style={{ textAlign: "center", padding: "48px 20px" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 20, color: "#0D2B1F", margin: "0 0 8px" }}>
                    ¡Emergencia enviada!
                  </h3>
                  <p style={{ fontSize: 13, color: "#7A9E8A", lineHeight: 1.6 }}>
                    Estamos buscando un especialista disponible.<br />Te contactaremos en los próximos minutos.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 16, background: "#FFF3F2", borderRadius: 12, padding: "10px 16px" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3B30", animation: "pulse 1s infinite" }} />
                    <span style={{ fontSize: 12, color: "#FF3B30", fontWeight: 600 }}>Buscando especialista…</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0 20px", borderBottom: "1px solid #F0FAF4" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF3F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      🚨
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 800, fontSize: 17, color: "#0D2B1F", margin: 0 }}>
                        Solicitud de emergencia
                      </h3>
                      <p style={{ fontSize: 12, color: "#7A9E8A", margin: 0 }}>Paso {step} de 3</p>
                    </div>
                    <button
                      onClick={() => setShowEmergency(false)}
                      style={{ marginLeft: "auto", background: "#F0FAF4", border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#7A9E8A" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 1l12 12M13 1L1 13" />
                      </svg>
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: 4, background: "#F0FAF4", borderRadius: 2, margin: "0 0 20px" }}>
                    <div style={{ height: "100%", borderRadius: 2, background: "#FF3B30", width: `${(step / 3) * 100}%`, transition: "width 0.3s" }} />
                  </div>

                  {/* Step 1: Specialty */}
                  {step === 1 && (
                    <div>
                      <p style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F", marginBottom: 14 }}>
                        ¿Qué tipo de emergencia es?
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                        {emergencyCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCat(cat.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "14px 12px",
                              borderRadius: 14,
                              border: "1.5px solid",
                              borderColor: selectedCat === cat.id ? "#FF3B30" : "#DCF0E4",
                              background: selectedCat === cat.id ? "#FFF3F2" : "#FFFFFF",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            <span style={{ fontSize: 22 }}>{cat.icon}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: selectedCat === cat.id ? "#FF3B30" : "#0D2B1F", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>
                              {cat.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Description */}
                  {step === 2 && (
                    <div>
                      <p style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F", marginBottom: 6 }}>
                        Describe el problema
                      </p>
                      <p style={{ fontSize: 12, color: "#7A9E8A", marginBottom: 14 }}>
                        Cuanta más información, más rápido encontramos un especialista.
                      </p>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ej: Hay una fuga de agua debajo del lavabo, el piso ya está mojado y el agua no para de salir…"
                        rows={5}
                        style={{
                          width: "100%",
                          background: "#F0FAF4",
                          border: "1.5px solid",
                          borderColor: description.length > 10 ? "#40916C" : "#DCF0E4",
                          borderRadius: 14,
                          padding: "14px",
                          fontSize: 13,
                          color: "#0D2B1F",
                          lineHeight: 1.6,
                          outline: "none",
                          resize: "none",
                          fontFamily: "Outfit, system-ui, sans-serif",
                          transition: "border-color 0.2s",
                        }}
                      />
                      <div style={{ textAlign: "right", fontSize: 11, color: "#B7E4C7", marginTop: 4 }}>
                        {description.length} caracteres
                      </div>
                    </div>
                  )}

                  {/* Step 3: Photos/Videos */}
                  {step === 3 && (
                    <div>
                      <p style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "#0D2B1F", marginBottom: 6 }}>
                        Agrega fotos o videos <span style={{ fontWeight: 400, color: "#7A9E8A" }}>(opcional)</span>
                      </p>
                      <p style={{ fontSize: 12, color: "#7A9E8A", marginBottom: 16 }}>
                        Las imágenes ayudan al especialista a llegar preparado.
                      </p>

                      {/* Upload area */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          width: "100%",
                          border: "2px dashed #DCF0E4",
                          borderRadius: 16,
                          padding: "28px 20px",
                          background: "#F0FAF4",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 14,
                        }}
                      >
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "1px solid #DCF0E4" }}>
                          📎
                        </div>
                        <span style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 13, color: "#1B4332" }}>
                          Subir fotos o videos
                        </span>
                        <span style={{ fontSize: 11, color: "#7A9E8A" }}>
                          JPG, PNG, MP4 · Máx. 50 MB c/u
                        </span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />

                      {/* Attached files */}
                      {files.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {files.map((f, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                background: "#FFFFFF",
                                border: "1px solid #DCF0E4",
                                borderRadius: 12,
                                padding: "10px 12px",
                              }}
                            >
                              {f.type.startsWith("image") ? (
                                <img src={f.url} alt={f.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", background: "#DCF0E4" }} />
                              ) : (
                                <div style={{ width: 44, height: 44, borderRadius: 8, background: "#F0FAF4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                                  🎬
                                </div>
                              )}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#0D2B1F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {f.name}
                                </div>
                                <div style={{ fontSize: 10, color: "#7A9E8A" }}>{f.type.startsWith("image") ? "Imagen" : "Video"}</div>
                              </div>
                              <button
                                onClick={() => removeFile(i)}
                                style={{ background: "#FFF3F2", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                              >
                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round">
                                  <path d="M1 1l12 12M13 1L1 13" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer CTA */}
            {!sent && (
              <div style={{ padding: "12px 20px 28px", borderTop: "1px solid #F0FAF4", background: "#FFFFFF", display: "flex", gap: 10 }}>
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: "1.5px solid #DCF0E4", background: "transparent", color: "#7A9E8A", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}
                  >
                    Atrás
                  </button>
                )}
                <button
                  onClick={() => {
                    if (step < 3) setStep((s) => (s + 1) as 2 | 3);
                    else handleSend();
                  }}
                  disabled={step === 1 && !selectedCat}
                  style={{
                    flex: 2,
                    padding: "14px 0",
                    borderRadius: 14,
                    border: "none",
                    background: step === 1 && !selectedCat ? "#DCF0E4" : "#FF3B30",
                    color: step === 1 && !selectedCat ? "#7A9E8A" : "#FFFFFF",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: step === 1 && !selectedCat ? "default" : "pointer",
                    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                    boxShadow: step === 1 && !selectedCat ? "none" : "0 4px 16px rgba(255,59,48,0.35)",
                    transition: "all 0.2s",
                  }}
                >
                  {step === 3 ? "🚨 Enviar emergencia" : "Continuar →"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
