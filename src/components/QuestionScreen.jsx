import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS } from "../data/questions";
import { scoreForWeight } from "../hooks/useGameState";
import CloudCharacter from "./CloudCharacter";
import MiniMap from "./MiniMap";
import { waterToHuman, co2ToHuman, energyToHuman } from "../utils/environmentalComparisons";

const T = {
  en: {
    level:    (n, t) => `LEVEL ${n} OF ${t}`,
    choose:   "WHAT WOULD YOU DO?",
    tier: {
      perfect:  "PERFECT! ★",
      great:    "GREAT CHOICE!",
      good:     "GOOD MOVE.",
      moderate: "MODERATE.",
      bad:      "HIGH IMPACT!",
      terrible: "CRITICAL DAMAGE!",
    },
    cloudMsg: {
      perfect:  "ZERO FOOTPRINT!\nAMAZING!",
      great:    "GREAT CHOICE!",
      good:     "NOT BAD!",
      moderate: "COULD DO BETTER...",
      bad:      "OH NO!",
      terrible: "THAT REALLY HURTS!",
    },
    impactContext: "IN CONTEXT:",
  },
  es: {
    level:    (n, t) => `NIVEL ${n} DE ${t}`,
    choose:   "¿QUÉ HARÍAS?",
    tier: {
      perfect:  "¡PERFECTO! ★",
      great:    "¡GRAN ELECCIÓN!",
      good:     "BUEN MOVIMIENTO.",
      moderate: "MODERADO.",
      bad:      "¡ALTO IMPACTO!",
      terrible: "¡DAÑO CRÍTICO!",
    },
    cloudMsg: {
      perfect:  "¡CERO HUELLA!\n¡INCREÍBLE!",
      great:    "¡GRAN ELECCIÓN!",
      good:     "¡NO ESTÁ MAL!",
      moderate: "PODRÍA SER MEJOR...",
      bad:      "¡OH NO!",
      terrible: "¡ESO DUELE MUCHO!",
    },
    impactContext: "EN CONTEXTO:",
  },
  ca: {
    level:    (n, t) => `NIVELL ${n} DE ${t}`,
    choose:   "QUÈ FARIES?",
    tier: {
      perfect:  "PERFECTE! ★",
      great:    "GRAN ELECCIÓ!",
      good:     "BON MOVIMENT.",
      moderate: "MODERAT.",
      bad:      "ALT IMPACTE!",
      terrible: "DANY CRÍTIC!",
    },
    cloudMsg: {
      perfect:  "ZERO PETJADA!\nINCREÏBLE!",
      great:    "GRAN ELECCIÓ!",
      good:     "NO ESTÀ MAL!",
      moderate: "PODRIA SER MILLOR...",
      bad:      "OH NO!",
      terrible: "AIXÒ FA MOLT DE MAL!",
    },
    impactContext: "EN CONTEXT:",
  },
};

const MAX_ENERGY = 60;
const MAX_WATER  = 800;
const MAX_CO2    = 50;

function pct(val, max) { return Math.min(100, (val / max) * 100); }

function getTier(weight) {
  if (weight >= 6) return "perfect";
  if (weight >= 5) return "great";
  if (weight >= 4) return "good";
  if (weight >= 3) return "moderate";
  if (weight >= 2) return "bad";
  return "terrible";
}

const TIER_CONFIG = {
  perfect:  { color: "#39FF14", flash: "good-flash",   sound: "goodChoice", mood: "celebrating" },
  great:    { color: "#0099FF", flash: "good-flash",   sound: "goodChoice", mood: "happy"       },
  good:     { color: "#0099FF", flash: "good-flash",   sound: "goodChoice", mood: "happy"       },
  moderate: { color: "#FF00FF", flash: "",             sound: "click",      mood: "neutral"     },
  bad:      { color: "#FF3A20", flash: "damage-flash", sound: "damage",     mood: "alarmed"     },
  terrible: { color: "#FF3A20", flash: "damage-flash", sound: "damage",     mood: "alarmed"     },
};

const OPTION_COLORS = ["#0099FF", "#FF00FF", "#FFFFFF"];

export default function QuestionScreen({
  lang, questionIndex, totalEnergy, totalWater, totalCo2,
  onAnswer, play, score,
}) {
  const t = T[lang] || T.en;
  const question = QUESTIONS[questionIndex];

  const [selected,    setSelected]    = useState(null);
  const [revealed,    setRevealed]    = useState(false);
  const [flashClass,  setFlashClass]  = useState("");
  const [shakeScreen, setShakeScreen] = useState(false);
  const [cloudMood,   setCloudMood]   = useState("neutral");
  const [cloudMsg,    setCloudMsg]    = useState(null);
  const [scoreDelta,  setScoreDelta]  = useState(null);

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setFlashClass("");
    setShakeScreen(false);
    setCloudMood("neutral");
    setCloudMsg(lang === "es" ? "¿QUÉ HARÍAS?" : lang === "ca" ? "QUÈ FARIES?" : "WHAT WOULD\nYOU DO?");
    setScoreDelta(null);
  }, [questionIndex, lang]);

  function handleOption(option) {
    if (selected) return;
    const tier   = getTier(option.weight);
    const config = TIER_CONFIG[tier];
    const delta  = scoreForWeight(option.weight);

    play(config.sound);
    setSelected(option);
    setScoreDelta(delta);
    setCloudMood(config.mood);
    setCloudMsg(t.cloudMsg[tier]);

    if (config.flash) {
      setFlashClass(config.flash);
      setTimeout(() => setFlashClass(""), 600);
    }
    if (tier === "bad" || tier === "terrible") {
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 450);
    }
    setTimeout(() => setRevealed(true), 320);
    setTimeout(() => onAnswer(option), 2100);
  }

  const questionText = lang === "es" ? question.es : lang === "ca" ? question.ca : question.en;
  const liveEnergy = totalEnergy + (selected ? selected.energyWh : 0);
  const liveWater  = totalWater  + (selected ? selected.waterMl  : 0);
  const liveCo2    = totalCo2    + (selected ? selected.co2g     : 0);
  const isBad = selected
    ? getTier(selected.weight) === "bad" || getTier(selected.weight) === "terrible"
    : false;

  return (
    <div
      className={`crt-overlay crt-flicker screen-enter ${shakeScreen ? "screen-shake" : ""}`}
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Consequence overlay */}
      {flashClass && <div className={flashClass} />}

      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px 10px",
          borderBottom: "2px solid #0099FF22",
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.38rem, 1.1vw, 0.58rem)",
            color: "#FF00FF",
            textShadow: "0 0 6px #FF00FF",
            letterSpacing: "0.1em",
          }}
        >
          {t.level(questionIndex + 1, QUESTIONS.length)}
        </div>
        {/* Cloud in top-right — reaction */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <CloudCharacter
            mood={cloudMood}
            message={cloudMsg}
            size="sm"
            animate={shakeScreen ? "shake" : selected ? "bounce" : "float"}
            flip
          />
        </div>
      </div>

      {/* ── Main content: mini-map | question ── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* LEFT: Mini map panel */}
        <MiniMap
          completedCount={questionIndex}
          currentIdx={questionIndex}
          score={score}
          lang={lang}
        />

        {/* RIGHT: Question + options */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            padding: "20px 28px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.36rem",
              color: "#0099FF55",
              letterSpacing: "0.12em",
            }}
          >
            {t.choose}
          </div>

          {/* Question text */}
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "clamp(0.6rem, 2vw, 1rem)",
              color: "#FFFFFF",
              lineHeight: 1.9,
              letterSpacing: "0.05em",
            }}
          >
            {questionText}
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {question.options.map((option, i) => {
              const isSelected = selected?.label === option.label;
              const tier       = isSelected ? getTier(option.weight) : null;
              const baseColor  = OPTION_COLORS[i];
              const activeColor = isSelected ? TIER_CONFIG[tier].color : baseColor;

              return (
                <button
                  key={option.label}
                  className="pixel-btn"
                  onClick={() => handleOption(option)}
                  disabled={!!selected}
                  style={{
                    color:       isSelected ? "#000" : baseColor,
                    background:  isSelected ? activeColor : "transparent",
                    borderColor: isSelected ? activeColor : baseColor,
                    fontSize:    "clamp(0.38rem, 1.1vw, 0.58rem)",
                    padding:     "12px 16px",
                    textAlign:   "left",
                    letterSpacing:"0.06em",
                    lineHeight:  1.8,
                    display:     "flex",
                    gap:         "12px",
                    alignItems:  "flex-start",
                    opacity:     selected && !isSelected ? 0.25 : 1,
                    width:       "100%",
                  }}
                >
                  <span style={{ minWidth: "22px", fontWeight: "bold" }}>{option.label})</span>
                  <span>{lang === "es" ? option.es : lang === "ca" ? option.ca : option.en}</span>
                </button>
              );
            })}
          </div>

          {/* Consequence + impact reveal */}
          {revealed && selected && (
            <ConsequenceReveal option={selected} delta={scoreDelta} t={t} lang={lang} />
          )}
        </div>
      </div>

      {/* ── Footprint bars (full width bottom strip) ── */}
      <FootprintBars
        energy={liveEnergy}
        water={liveWater}
        co2={liveCo2}
        animate={!!selected}
        isBad={isBad}
        lang={lang}
      />
    </div>
  );
}

// ── Consequence reveal ───────────────────────────────────────────────────────
function ConsequenceReveal({ option, delta, t, lang }) {
  const tier   = getTier(option.weight);
  const config = TIER_CONFIG[tier];
  const isNeg  = delta < 0;

  // Relative impact for this single answer
  const eHuman = energyToHuman(option.energyWh);
  const wHuman = waterToHuman(option.waterMl);
  const cHuman = co2ToHuman(option.co2g);

  return (
    <div
      className="pop-in"
      style={{
        border:  `3px solid ${config.color}`,
        background: `${config.color}0D`,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        boxShadow: `0 0 14px ${config.color}55`,
      }}
    >
      {/* Tier label + score delta side by side */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.4rem, 1.2vw, 0.6rem)",
            color: config.color,
            textShadow: `0 0 8px ${config.color}`,
            letterSpacing: "0.08em",
          }}
        >
          {t.tier[tier]}
        </div>
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.5rem, 1.5vw, 0.75rem)",
            color: isNeg ? "#FF3A20" : "#39FF14",
            textShadow: `0 0 8px ${isNeg ? "#FF3A20" : "#39FF14"}`,
            letterSpacing: "0.1em",
          }}
        >
          {delta >= 0 ? `+${delta}` : delta} PTS
        </div>
      </div>

      {/* Impact label from data */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.36rem",
          color: "#FFFFFF88",
          letterSpacing: "0.06em",
        }}
      >
        {option.impactLabel}
      </div>

      {/* Human-scale comparisons */}
      {(option.energyWh > 0 || option.waterMl > 0 || option.co2g > 0) && (
        <div
          style={{
            borderTop: `1px solid ${config.color}44`,
            paddingTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.3rem", color: "#FFFFFF44", letterSpacing: "0.1em" }}>
            {t.impactContext}
          </div>
          {option.energyWh > 0 && (
            <CompRow icon={eHuman.icon} label={eHuman.label} color="#FF00FF" />
          )}
          {option.waterMl > 0 && (
            <CompRow icon={wHuman.icon} label={wHuman.label} color="#0099FF" />
          )}
          {option.co2g > 0 && (
            <CompRow icon={cHuman.icon} label={cHuman.label} color="#FFFFFF" />
          )}
        </div>
      )}
    </div>
  );
}

function CompRow({ icon, label, color }) {
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "0.3rem",
        color,
        lineHeight: 1.7,
        letterSpacing: "0.04em",
      }}
    >
      {icon} {label}
    </div>
  );
}

const BAR_LABELS = {
  en: { energy: "⚡ ENERGY", water: "💧 WATER", co2: "🌫️ CO₂" },
  es: { energy: "⚡ ENERGÍA", water: "💧 AGUA",  co2: "🌫️ CO₂" },
  ca: { energy: "⚡ ENERGIA", water: "💧 AIGUA", co2: "🌫️ CO₂" },
};

// ── Footprint bars (bottom strip) ────────────────────────────────────────────
function FootprintBars({ energy, water, co2, animate, isBad, lang }) {
  const bl = BAR_LABELS[lang] || BAR_LABELS.en;
  const bars = [
    { label: bl.energy, value: energy, max: MAX_ENERGY, color: "#FF00FF", unit: "Wh" },
    { label: bl.water,  value: water,  max: MAX_WATER,  color: "#0099FF", unit: "ml" },
    { label: bl.co2,    value: co2,    max: MAX_CO2,    color: "#FFFFFF", unit: "g"  },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        padding: "10px 20px",
        borderTop: "2px solid #0099FF22",
        background: "#00000088",
      }}
    >
      {bars.map((bar) => (
        <div key={bar.label} style={{ flex: "1 1 140px", minWidth: "120px" }}>
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.34rem",
              color: bar.color,
              marginBottom: "4px",
              letterSpacing: "0.06em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{bar.label}</span>
            <span style={{ color: isBad && animate ? "#FF3A20" : bar.color }}>
              {bar.value < 0.001 ? bar.value.toFixed(6)
               : bar.value < 1   ? bar.value.toFixed(3)
               : bar.value.toFixed(1)}{bar.unit}
            </span>
          </div>
          <div style={{ height: "8px", background: "#ffffff0a", border: `2px solid ${bar.color}22`, overflow: "hidden" }}>
            <div
              className={`${animate ? "bar-animate" : ""} ${isBad && animate ? "bar-danger" : ""}`}
              style={{
                height: "100%",
                width:  `${pct(bar.value, bar.max)}%`,
                background: isBad && animate
                  ? `linear-gradient(90deg, ${bar.color}, #FF3A20)`
                  : bar.color,
                boxShadow: `0 0 5px ${bar.color}`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
