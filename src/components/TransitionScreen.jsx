import React, { useEffect } from "react";
import { QUESTIONS } from "../data/questions";
import CloudCharacter from "./CloudCharacter";

const T = {
  en: {
    complete:    (n) => `LEVEL ${n} COMPLETE!`,
    tap:         "TAP TO CONTINUE",
    allDone:     "ALL LEVELS COMPLETE!",
    calculating: "CALCULATING RESULTS...",
    cloudMsgs: {
      terrible: "OUCH!\nTHAT COST A LOT.",
      bad:      "THAT WAS COSTLY...",
      moderate: "NOT YOUR BEST...",
      good:     "SOLID MOVE!",
      great:    "GREAT CHOICE!",
      perfect:  "ZERO FOOTPRINT!\nAMAZING!",
    },
  },
  es: {
    complete:    (n) => `¡NIVEL ${n} COMPLETO!`,
    tap:         "TOCA PARA CONTINUAR",
    allDone:     "¡TODOS LOS NIVELES COMPLETADOS!",
    calculating: "CALCULANDO RESULTADOS...",
    cloudMsgs: {
      terrible: "¡AY!\nMUCHO COSTO.",
      bad:      "ESO FUE COSTOSO...",
      moderate: "NO FUE TU MEJOR...",
      good:     "¡BUEN MOVIMIENTO!",
      great:    "¡GRAN ELECCIÓN!",
      perfect:  "¡CERO HUELLA!\n¡INCREÍBLE!",
    },
  },
};

export default function TransitionScreen({ lang, completedCount, lastDelta, onContinue, play }) {
  const t = T[lang] || T.en;
  const isLast = completedCount >= QUESTIONS.length;

  // Determine cloud mood + message from last answer delta
  let tier = "moderate";
  if      (lastDelta >= 4)  tier = "perfect";
  else if (lastDelta >= 3)  tier = "great";
  else if (lastDelta >= 2)  tier = "good";
  else if (lastDelta >= 1)  tier = "moderate";
  else if (lastDelta >= -1) tier = "bad";
  else                      tier = "terrible";

  const cloudMood = {
    perfect:  "celebrating",
    great:    "happy",
    good:     "happy",
    moderate: "neutral",
    bad:      "worried",
    terrible: "alarmed",
  }[tier];

  const cloudMsg = t.cloudMsgs[tier];

  useEffect(() => {
    play("levelComplete");
    const timer = setTimeout(onContinue, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="crt-overlay crt-flicker pixel-grid-bg screen-enter"
      onClick={onContinue}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        cursor: "pointer",
        userSelect: "none",
        padding: "40px",
      }}
    >
      {/* Cloud with reaction */}
      <CloudCharacter
        mood={cloudMood}
        message={cloudMsg}
        size="lg"
        animate={tier === "terrible" || tier === "bad" ? "shake" : "bounce"}
      />

      {/* Checkmark */}
      <div
        className="pop-in"
        style={{
          width: "72px",
          height: "72px",
          border: `4px solid ${tier === "terrible" ? "#FF3A20" : tier === "bad" ? "#FFE600" : "#39FF14"}`,
          boxShadow: `0 0 20px ${tier === "terrible" ? "#FF3A20" : tier === "bad" ? "#FFE600" : "#39FF14"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${tier === "terrible" ? "#FF3A2011" : "#39FF1411"}`,
        }}
      >
        <span
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "1.8rem",
            color: tier === "terrible" ? "#FF3A20" : "#39FF14",
          }}
        >
          {tier === "terrible" || tier === "bad" ? "✗" : "✓"}
        </span>
      </div>

      {/* Level complete text */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(0.55rem, 1.8vw, 0.9rem)",
          color: "#39FF14",
          textShadow: "0 0 12px #39FF14",
          textAlign: "center",
          letterSpacing: "0.1em",
          lineHeight: 1.8,
        }}
      >
        {isLast ? t.allDone : t.complete(completedCount)}
      </div>

      {isLast && (
        <div
          className="pixel-blink"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.38rem, 1.1vw, 0.58rem)",
            color: "#FFE600",
            textAlign: "center",
            letterSpacing: "0.1em",
          }}
        >
          {t.calculating}
        </div>
      )}

      {!isLast && (
        <div
          className="pixel-blink"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.3rem, 0.9vw, 0.48rem)",
            color: "#0099FF55",
            textAlign: "center",
            letterSpacing: "0.1em",
          }}
        >
          {t.tap}
        </div>
      )}
    </div>
  );
}
