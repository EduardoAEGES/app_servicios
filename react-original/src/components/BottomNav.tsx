import type { ReactElement } from "react";
import type { Tab } from "../types";

interface Props {
  active: Tab;
  setActive: (t: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: (active: boolean) => ReactElement }[] = [
  {
    id: "inicio",
    label: "Inicio",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "#1B4332" : "none"} stroke={a ? "#1B4332" : "#7A9E8A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: "busqueda",
    label: "Búsqueda",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? "#1B4332" : "#7A9E8A"} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" fill={a ? "#D8F3DC" : "none"} />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Chat",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "#D8F3DC" : "none"} stroke={a ? "#1B4332" : "#7A9E8A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: "perfil",
    label: "Perfil",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "#D8F3DC" : "none"} stroke={a ? "#1B4332" : "#7A9E8A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function BottomNav({ active, setActive }: Props) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        background: "#FFFFFF",
        borderTop: "1px solid #DCF0E4",
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        zIndex: 100,
      }}
    >
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "10px 0 6px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.15s",
            }}
          >
            <div
              style={{
                width: 44,
                height: 28,
                borderRadius: 14,
                background: isActive ? "#D8F3DC" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              {t.icon(isActive)}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#1B4332" : "#7A9E8A",
                fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
                letterSpacing: 0,
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
