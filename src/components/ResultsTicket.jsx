import React, { useEffect } from "react";
import { saveSession } from "../api";
import CloudCharacter from "./CloudCharacter";
import { buildComparisons } from "../utils/environmentalComparisons";

const T = {
  en: {
    title: "(AI)RCADE",
    session: "SESSION",
    player: "PLAYER",
    age: "AGE",
    gender: "GENDER",
    industry: "INDUSTRY",
    persona: "YOUR AI PERSONA",
    footprint: "YOUR FOOTPRINT",
    energy: "ENERGY",
    water: "WATER",
    co2: "CO₂",
    score: "SCORE",
    tip: "YOUR SMART TIP",
    quote: "Every prompt has a footprint.\nLeave a positive one.",
    print: "🖨 PRINT TICKET",
    again: "▶ PLAY AGAIN",
    outOf: "/ 20",
  },
  es: {
    title: "(AI)RCADE",
    session: "SESIÓN",
    player: "JUGADOR",
    age: "EDAD",
    gender: "GÉNERO",
    industry: "INDUSTRIA",
    persona: "TU PERSONAJE IA",
    footprint: "TU HUELLA",
    energy: "ENERGÍA",
    water: "AGUA",
    co2: "CO₂",
    score: "PUNTOS",
    tip: "TU CONSEJO INTELIGENTE",
    quote: "Cada prompt deja una huella.\nDeja una positiva.",
    print: "🖨 IMPRIMIR TICKET",
    again: "▶ JUGAR DE NUEVO",
    outOf: "/ 20",
  },
};

export default function ResultsTicket({
  lang,
  player,
  persona,
  score,
  totalEnergy,
  totalWater,
  totalCo2,
  sessionId,
  smartTip,
  answers,
  onPlayAgain,
  play,
}) {
  const t = T[lang] || T.en;
  const personaName = lang === "es" ? persona.es.name : persona.en.name;
  const personaTagline = lang === "es" ? persona.es.tagline : persona.en.tagline;
  const comparisons = buildComparisons(totalEnergy, totalWater, totalCo2);

  useEffect(() => {
    play(persona.sound);
    // POST results to backend (silently no-ops if VITE_API_URL is not set)
    saveSession({
      state: { player, score, totalEnergy, totalWater, totalCo2, sessionId, persona },
      lang,
      answers: answers || [],
    });
  }, []);

  function handlePrint() {
    play("print");
    setTimeout(() => window.print(), 400);
  }

  return (
    <div
      className="crt-overlay crt-flicker pixel-grid-bg screen-enter"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        gap: "24px",
      }}
    >
      {/* Cloud mascot — mood driven by persona */}
      <div className="no-print">
        <CloudCharacter
          mood={persona.cloudMood || "neutral"}
          message={
            persona.id === "green"   ? (lang === "es" ? "¡INCREÍBLE TRABAJO!" : "OUTSTANDING WORK!") :
            persona.id === "mindful" ? (lang === "es" ? "¡BUEN TRABAJO!" : "GREAT JOB!") :
            persona.id === "casual"  ? (lang === "es" ? "PUEDES MEJORAR..." : "ROOM TO IMPROVE...") :
                                       (lang === "es" ? "¡AY, LA HUELLA!" : "OUCH, THAT FOOTPRINT!")
          }
          size="md"
          animate={persona.id === "green" ? "bounce" : "float"}
        />
      </div>

      {/* Ticket card */}
      <div
        className="ticket-card"
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "monospace",
          padding: "28px 24px",
          border: "3px solid #000",
          boxShadow: "0 0 30px #0099FF66",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "clamp(0.9rem, 3vw, 1.4rem)",
              color: "#0099FF",
              letterSpacing: "0.06em",
            }}
          >
            {t.title}
          </div>
          <div style={{ fontSize: "0.65rem", color: "#666", marginTop: "4px", letterSpacing: "0.1em" }}>
            {t.session}: <strong>{sessionId}</strong>
          </div>
        </div>

        <DashLine />

        {/* Player info */}
        <InfoRow label={t.player} value={player.name.toUpperCase()} />
        <InfoRow label={t.age} value={player.age} />
        <InfoRow label={t.gender} value={player.gender} />
        <InfoRow label={t.industry} value={player.industry} />

        <DashLine />

        {/* Persona */}
        <div style={{ textAlign: "center", margin: "12px 0" }}>
          <div
            style={{
              fontSize: "0.55rem",
              color: "#666",
              letterSpacing: "0.1em",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            {t.persona}
          </div>
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "clamp(0.6rem, 2vw, 0.85rem)",
              color: persona.color,
              letterSpacing: "0.04em",
              lineHeight: 1.5,
            }}
          >
            {personaName}
          </div>
          <div
            style={{
              fontSize: "0.6rem",
              color: "#333",
              marginTop: "8px",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            "{personaTagline}"
          </div>
        </div>

        <DashLine />

        {/* Footprint — raw + relative */}
        <div style={{ margin: "12px 0" }}>
          <div style={{ fontSize: "0.55rem", color: "#666", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
            {t.footprint}
          </div>
          {/* Raw numbers row */}
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
            <FootprintStat label={`⚡ ${t.energy}`} value={`${totalEnergy.toFixed(2)} Wh`} />
            <FootprintStat label={`💧 ${t.water}`}  value={`${Math.round(totalWater)} ml`} />
            <FootprintStat label={`🌫️ ${t.co2}`}   value={`${totalCo2.toFixed(2)} g`} />
            <FootprintStat label={`🎮 ${t.score}`}  value={`${score}${t.outOf}`} highlight />
          </div>
          {/* Relative context rows */}
          <div style={{ borderTop: "1px dashed #ccc", paddingTop: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <RelativeRow raw={`${totalEnergy.toFixed(2)} Wh`} label={comparisons.energy.label} icon={comparisons.energy.icon} />
            <RelativeRow raw={`${Math.round(totalWater)} ml`} label={comparisons.water.label}  icon={comparisons.water.icon}  />
            <RelativeRow raw={`${totalCo2.toFixed(2)} g`}    label={comparisons.co2.label}    icon={comparisons.co2.icon}    />
          </div>
        </div>

        <DashLine />

        {/* Smart tip */}
        <div style={{ margin: "12px 0" }}>
          <div
            style={{
              fontSize: "0.55rem",
              color: "#666",
              letterSpacing: "0.1em",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            {t.tip}
          </div>
          <div
            style={{
              fontSize: "0.62rem",
              color: "#111",
              lineHeight: 1.7,
            }}
          >
            {smartTip}
          </div>
        </div>

        <DashLine />

        {/* Motivational quote */}
        <div
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontSize: "0.62rem",
            color: "#333",
            lineHeight: 1.8,
            margin: "12px 0",
            whiteSpace: "pre-line",
          }}
        >
          {t.quote}
        </div>

        <DashLine />

        {/* QR placeholder + footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
          <QRPlaceholder />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.55rem", color: "#666", marginBottom: "4px" }}>
              aircade.app
            </div>
            <div style={{ fontSize: "0.45rem", color: "#999" }}>
              ai-rcade.lovable.app
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons — hidden on print */}
      <div
        className="no-print"
        style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
      >
        <button
          className="pixel-btn"
          onClick={handlePrint}
          style={{
            color: "#0099FF",
            fontSize: "clamp(0.45rem, 1.3vw, 0.65rem)",
            padding: "14px 24px",
            letterSpacing: "0.1em",
          }}
        >
          {t.print}
        </button>
        <button
          className="pixel-btn"
          onClick={() => { play("coin"); onPlayAgain(); }}
          style={{
            color: "#39FF14",
            fontSize: "clamp(0.45rem, 1.3vw, 0.65rem)",
            padding: "14px 24px",
            letterSpacing: "0.1em",
          }}
        >
          {t.again}
        </button>
      </div>
    </div>
  );
}

function DashLine() {
  return (
    <div
      className="ticket-dash"
      style={{ margin: "10px 0" }}
    />
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.62rem",
        color: "#000",
        padding: "3px 0",
        letterSpacing: "0.04em",
      }}
    >
      <span style={{ color: "#666", textTransform: "uppercase", fontSize: "0.5rem" }}>{label}</span>
      <span style={{ fontWeight: "bold", maxWidth: "60%", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function FootprintStat({ label, value, highlight }) {
  return (
    <div
      style={{
        textAlign: "center",
        flex: "1 1 80px",
        background: highlight ? "#00000011" : "transparent",
        padding: "6px 4px",
        border: highlight ? "1px solid #000" : "none",
      }}
    >
      <div style={{ fontSize: "0.45rem", color: "#666", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "0.65rem", fontWeight: "bold", color: "#000" }}>{value}</div>
    </div>
  );
}

function RelativeRow({ raw, label, icon }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "flex-start", fontSize: "0.55rem", color: "#222", lineHeight: 1.5 }}>
      <span style={{ minWidth: "18px" }}>{icon}</span>
      <span style={{ color: "#888", minWidth: "60px" }}>{raw}</span>
      <span>→ {label}</span>
    </div>
  );
}

function QRPlaceholder() {
  // Renders a simple pixel-art QR-code-like grid as decoration
  const grid = [
    [1,1,1,0,0,1,1,1],
    [1,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,1],
    [1,1,1,0,0,1,1,1],
    [0,0,0,0,0,0,0,0],
    [1,1,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
  ];
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 6px)",
          gap: "1px",
          border: "2px solid #000",
          padding: "4px",
          background: "#fff",
        }}
      >
        {grid.flat().map((cell, i) => (
          <div
            key={i}
            style={{
              width: "6px",
              height: "6px",
              background: cell ? "#000" : "#fff",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: "0.4rem", color: "#999", textAlign: "center", marginTop: "4px" }}>
        SCAN ME
      </div>
    </div>
  );
}
