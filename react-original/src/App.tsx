import { useState } from "react";
import BottomNav from "./components/BottomNav";
import InicioTab from "./tabs/InicioTab";
import BusquedaTab from "./tabs/BusquedaTab";
import ChatTab from "./tabs/ChatTab";
import PerfilTab from "./tabs/PerfilTab";
import SpecialistSheet from "./components/SpecialistSheet";
import type { Tab } from "./types";

export default function App() {
  const [tab, setTab] = useState<Tab>("inicio");
  const [specialistId, setSpecialistId] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100svh",
        background: "#F2F8F4",
        fontFamily: "Outfit, system-ui, sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Main content — padded bottom for nav */}
      <div style={{ flex: 1, paddingBottom: 80, overflowX: "hidden" }}>
        {tab === "inicio" && (
          <InicioTab
            onSpecialist={setSpecialistId}
            onBrowse={() => setTab("busqueda")}
          />
        )}
        {tab === "busqueda" && (
          <BusquedaTab onSpecialist={setSpecialistId} />
        )}
        {tab === "chat" && (
          <ChatTab openConv={chatOpen} setOpenConv={setChatOpen} />
        )}
        {tab === "perfil" && <PerfilTab />}
      </div>

      {/* Specialist bottom sheet */}
      {specialistId !== null && (
        <SpecialistSheet
          specialistId={specialistId}
          onClose={() => setSpecialistId(null)}
          onChat={(id) => {
            setSpecialistId(null);
            setChatOpen(id);
            setTab("chat");
          }}
        />
      )}

      <BottomNav active={tab} setActive={setTab} />
    </div>
  );
}
