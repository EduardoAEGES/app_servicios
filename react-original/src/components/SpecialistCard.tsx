import StarRating from "./StarRating";
import type { Specialist } from "../types";

interface Props {
  sp: Specialist;
  onClick: () => void;
}

export default function SpecialistCard({ sp, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        background: "#FFFFFF",
        border: "1px solid #DCF0E4",
        borderRadius: 16,
        padding: "14px 14px",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(27,67,50,0.10)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={sp.photo}
          alt={sp.name}
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            objectFit: "cover",
            background: "#B7E4C7",
          }}
        />
        {sp.verified && (
          <div
            style={{
              position: "absolute",
              bottom: -3,
              right: -3,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#40916C",
              border: "2px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#0D2B1F",
            }}
          >
            {sp.name}
          </span>
          {sp.rate > 0 && (
            <span style={{ fontWeight: 700, fontSize: 13, color: "#1B4332" }}>
              S/.{sp.rate}/hr
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: "#40916C", fontWeight: 500, marginBottom: 4 }}>
          {sp.trade} · {sp.location}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StarRating rating={sp.rating} size={11} />
          <span style={{ fontSize: 11, color: "#7A9E8A" }}>
            {sp.rating} ({sp.reviews})
          </span>
          <span style={{ fontSize: 11, color: "#B7E4C7" }}>·</span>
          <span style={{ fontSize: 11, color: "#7A9E8A" }}>{sp.jobs} trabajos</span>
        </div>
      </div>
    </button>
  );
}
