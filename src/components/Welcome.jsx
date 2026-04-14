import React, { useEffect } from "react";
import CloudCharacter from "./CloudCharacter";

const T = {
  en: {
    subtitle: "Every prompt has a footprint.",
    prompt:   "INSERT COIN / PRESS START",
    hint:     "[ CLICK ANYWHERE OR PRESS ANY KEY ]",
    cloudMsg: "HI! I'M NIMBUS.\nLET'S PLAY!",
  },
  es: {
    subtitle: "Cada prompt deja una huella.",
    prompt:   "INSERTA MONEDA / PULSA START",
    hint:     "[ HAZ CLIC O PULSA CUALQUIER TECLA ]",
    cloudMsg: "¡HOLA! SOY NIMBUS.\n¡JUGUEMOS!",
  },
};

export default function Welcome({ lang, onStart, play }) {
  const t = T[lang] || T.en;

  useEffect(() => {
    function handleKey() { play("coin"); onStart(); }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onStart, play]);

  function handleClick() { play("coin"); onStart(); }

  return (
    <div
      className="crt-overlay crt-flicker pixel-grid-bg screen-enter"
      onClick={handleClick}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        padding: "40px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Colour bar top */}
      <ColorBar />

      {/* Main title */}
      <div
        className="title-glitch"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(2rem, 8vw, 5rem)",
          color: "#0099FF",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: "0.06em",
        }}
      >
        (AI)RCADE
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(0.5rem, 1.8vw, 0.85rem)",
          color: "#FFFFFF",
          textAlign: "center",
          letterSpacing: "0.1em",
          maxWidth: "600px",
          lineHeight: 2,
        }}
      >
        {t.subtitle}
      </div>

      {/* Cloud mascot */}
      <CloudCharacter
        mood="happy"
        message={t.cloudMsg}
        size="md"
        animate="bounce"
      />

      {/* Blink prompt */}
      <div
        className="pixel-blink"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(0.45rem, 1.5vw, 0.75rem)",
          color: "#FFE600",
          textAlign: "center",
          letterSpacing: "0.12em",
        }}
      >
        {t.prompt}
      </div>

      {/* Hint */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(0.3rem, 0.9vw, 0.5rem)",
          color: "#0099FF55",
          textAlign: "center",
          letterSpacing: "0.08em",
        }}
      >
        {t.hint}
      </div>

      <ColorBar reverse />
    </div>
  );
}

function ColorBar({ reverse }) {
  const colors = ["#0099FF","#FFE600","#FFFFFF","#0099FF","#FFE600","#FFFFFF","#0099FF"];
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {(reverse ? [...colors].reverse() : colors).map((c, i) => (
        <div key={i} style={{ width: "20px", height: "6px", background: c }} />
      ))}
    </div>
  );
}
