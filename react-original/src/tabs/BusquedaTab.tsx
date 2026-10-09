import { useState } from "react";
import SpecialistCard from "../components/SpecialistCard";
import { categories, specialists } from "../data";

interface Props {
  onSpecialist: (id: number) => void;
}

export default function BusquedaTab({ onSpecialist }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = specialists
    .filter((sp) => {
      const matchesQuery =
        !query ||
        sp.name.toLowerCase().includes(query.toLowerCase()) ||
        sp.trade.toLowerCase().includes(query.toLowerCase()) ||
        sp.location.toLowerCase().includes(query.toLowerCase());

      const matchesCat =
        activeCategory === "all" ||
        (() => {
          const cat = categories.find((c) => c.id === activeCategory);
          return cat ? sp.trade.toLowerCase().includes(cat.label.toLowerCase().slice(0, 5)) : true;
        })();

      return matchesQuery && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.rate - b.rate;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div>
      {/* Sticky header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#F2F8F4",
          padding: "52px 20px 14px",
          borderBottom: "1px solid #DCF0E4",
        }}
      >
        <h2
          style={{
            fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#0D2B1F",
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
          }}
        >
          Encuentra un especialista
        </h2>

        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#FFFFFF",
            border: "1.5px solid #DCF0E4",
            borderRadius: 14,
            padding: "12px 14px",
            marginBottom: 12,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A9E8A" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Plomero, electricista, limpieza…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "#0D2B1F",
              fontFamily: "Outfit, system-ui, sans-serif",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9E8A", fontSize: 16, lineHeight: 1 }}>
              ×
            </button>
          )}
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              flexShrink: 0,
              padding: "6px 14px",
              borderRadius: 20,
              border: "1.5px solid",
              borderColor: activeCategory === "all" ? "#1B4332" : "#DCF0E4",
              background: activeCategory === "all" ? "#1B4332" : "#FFFFFF",
              color: activeCategory === "all" ? "#AAFF6B" : "#7A9E8A",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
            }}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: "1.5px solid",
                borderColor: activeCategory === cat.id ? "#1B4332" : "#DCF0E4",
                background: activeCategory === cat.id ? "#1B4332" : "#FFFFFF",
                color: activeCategory === cat.id ? "#AAFF6B" : "#7A9E8A",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: "#7A9E8A" }}>
            {filtered.length} resultados
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              fontSize: 12,
              color: "#1B4332",
              fontWeight: 600,
              background: "#FFFFFF",
              border: "1px solid #DCF0E4",
              borderRadius: 8,
              padding: "5px 10px",
              outline: "none",
              cursor: "pointer",
              fontFamily: "Outfit, system-ui, sans-serif",
            }}
          >
            <option value="rating">Mejor calificados</option>
            <option value="reviews">Más reseñas</option>
            <option value="price">Menor precio</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ color: "#7A9E8A", fontSize: 14 }}>Sin resultados para "{query}"</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((sp) => (
              <SpecialistCard key={sp.id} sp={sp} onClick={() => onSpecialist(sp.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
