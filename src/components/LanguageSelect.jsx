import React from "react";
import CloudCharacter from "./CloudCharacter";

export default function LanguageSelect({ onSelect, play }) {
  function handleSelect(lang) {
    play("coin");
    onSelect(lang);
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
        gap: "36px",
        padding: "40px",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div
          className="title-glitch"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
            color: "#0099FF",
            letterSpacing: "0.1em",
            lineHeight: 1.4,
          }}
        >
          (AI)RCADE
        </div>
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.45rem, 1.5vw, 0.65rem)",
            color: "#0099FF",
            marginTop: "16px",
            letterSpacing: "0.08em",
          }}
        >
          SELECT LANGUAGE / ELIGE IDIOMA
        </div>
      </div>

      {/* Cloud with greeting */}
      <CloudCharacter
        mood="neutral"
        message={"HELLO!\nHOLA!"}
        size="md"
        animate="float"
      />

      {/* Buttons */}
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
        <LangButton label="ENGLISH" color="#FFE600" onClick={() => handleSelect("en")} />
        <LangButton label="ESPAÑOL" color="#39FF14" onClick={() => handleSelect("es")} />
      </div>

      {/* Pixel dots */}
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px", height: "8px",
              background: i % 3 === 0 ? "#0099FF" : i % 3 === 1 ? "#FFE600" : "#FFFFFF",
              imageRendering: "pixelated",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function LangButton({ label, color, onClick }) {
  return (
    <button
      className="pixel-btn"
      onClick={onClick}
      style={{
        color,
        fontSize: "clamp(0.55rem, 1.8vw, 0.85rem)",
        padding: "20px 36px",
        minWidth: "200px",
        letterSpacing: "0.12em",
      }}
    >
      {label}
    </button>
  );
}
