import { useState, useEffect } from "react";
import { QUESTIONS, getQuestionText } from "../data/questions";
import { waterToHuman, co2ToHuman, energyToHuman } from "../utils/environmentalComparisons";
import CloudCharacter from "./CloudCharacter";
import MiniMap from "./MiniMap";

const T = {
  en: {
    level:   (n, t) => `LEVEL ${n} OF ${t}`,
    choose:  "WHAT WOULD YOU DO?",
    thisChoice: "THIS CHOICE:",
    totalSoFar: "TOTAL SO FAR",
    tier: {
      perfect:  "ZERO FOOTPRINT ★",
      great:    "GREAT CHOICE",
      good:     "GOOD MOVE",
      moderate: "MODERATE IMPACT",
      bad:      "HIGH IMPACT",
      terrible: "CRITICAL IMPACT",
    },
    moral: {
      0: "IMPULSE USE",
      1: "PRACTICAL USE",
      2: "CONSCIOUS CHOICE",
    },
    cloudMsg: {
      perfect:  "ZERO FOOTPRINT!\nAMAZING!",
      great:    "GREAT CHOICE!",
      good:     "NOT BAD!",
      moderate: "COULD DO BETTER...",
      bad:      "OH NO!",
      terrible: "THAT REALLY HURTS!",
    },
  },
  es: {
    level:   (n, t) => `NIVEL ${n} DE ${t}`,
    choose:  "¿QUÉ HARÍAS?",
    thisChoice: "ESTA ELECCIÓN:",
    totalSoFar: "TOTAL HASTA AHORA",
    tier: {
      perfect:  "CERO HUELLA ★",
      great:    "GRAN ELECCIÓN",
      good:     "BUEN MOVIMIENTO",
      moderate: "IMPACTO MODERADO",
      bad:      "ALTO IMPACTO",
      terrible: "IMPACTO CRÍTICO",
    },
    moral: {
      0: "USO IMPULSIVO",
      1: "USO PRÁCTICO",
      2: "ELECCIÓN CONSCIENTE",
    },
    cloudMsg: {
      perfect:  "¡CERO HUELLA!\n¡INCREÍBLE!",
      great:    "¡GRAN ELECCIÓN!",
      good:     "¡NO ESTÁ MAL!",
      moderate: "PODRÍA SER MEJOR...",
      bad:      "¡OH NO!",
      terrible: "¡ESO DUELE MUCHO!",
    },
  },
  ca: {
    level:   (n, t) => `NIVELL ${n} DE ${t}`,
    choose:  "QUÈ FARIES?",
    thisChoice: "AQUESTA ELECCIÓ:",
    totalSoFar: "TOTAL FINS ARA",
    tier: {
      perfect:  "ZERO PETJADA ★",
      great:    "GRAN ELECCIÓ",
      good:     "BON MOVIMENT",
      moderate: "IMPACTE MODERAT",
      bad:      "ALT IMPACTE",
      terrible: "IMPACTE CRÍTIC",
    },
    moral: {
      0: "ÚS IMPULSIU",
      1: "ÚS PRÀCTIC",
      2: "ELECCIÓ CONSCIENT",
    },
    cloudMsg: {
      perfect:  "ZERO PETJADA!\nINCREÏBLE!",
      great:    "GRAN ELECCIÓ!",
      good:     "NO ESTÀ MAL!",
      moderate: "PODRIA SER MILLOR...",
      bad:      "OH NO!",
      terrible: "AIXÒ FA MOLT DE MAL!",
    },
  },
};

const MAX_ENERGY = 60;
const MAX_WATER  = 800;
const MAX_CO2    = 50;

function pct(val, max) { return Math.min(100, Math.max(0, (val / max) * 100)); }

function getTier(weight) {
  if (weight >= 6) return "perfect";
  if (weight >= 5) return "great";
  if (weight >= 4) return "good";
  if (weight >= 3) return "moderate";
  if (weight >= 2) return "bad";
  return "terrible";
}

const TIER_CONFIG = {
  perfect:  { color: "#39FF14", sound: "goodChoice", mood: "celebrating" },
  great:    { color: "#0099FF", sound: "goodChoice", mood: "happy"       },
  good:     { color: "#0099FF", sound: "goodChoice", mood: "happy"       },
  moderate: { color: "#FF00FF", sound: "click",      mood: "neutral"     },
  bad:      { color: "#FF3A20", sound: "damage",     mood: "alarmed"     },
  terrible: { color: "#FF3A20", sound: "damage",     mood: "alarmed"     },
};

// Moral verdict colour
const MORAL_COLORS = { 0: "#FF3A20", 1: "#FF00FF", 2: "#39FF14" };

const OPTION_COLORS = ["#0099FF", "#FF00FF", "#FFFFFF"];

export default function QuestionScreen({
  lang, industry, questionIndex, totalEnergy, totalWater, totalCo2,
  onAnswer, play, score,
}) {
  const t        = T[lang] || T.en;
  const question = QUESTIONS[questionIndex];

  const [selected,    setSelected]    = useState(null);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [cloudMood,   setCloudMood]   = useState("neutral");
  const [cloudMsg,    setCloudMsg]    = useState(null);

  useEffect(() => {
    setSelected(null);
    setShakeScreen(false);
    setCloudMood("neutral");
    setCloudMsg(
      lang === "es" ? "¿QUÉ HARÍAS?" :
      lang === "ca" ? "QUÈ FARIES?"  : "WHAT WOULD\nYOU DO?"
    );
  }, [questionIndex, lang]);

  function handleOption(option) {
    if (selected) return;
    const tier   = getTier(option.weight);
    const config = TIER_CONFIG[tier];

    play(config.sound);
    setSelected(option);
    setCloudMood(config.mood);
    setCloudMsg(t.cloudMsg[tier]);

    if (tier === "bad" || tier === "terrible") {
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 450);
    }
    // Give player time to read the impact panel before navigating
    setTimeout(() => onAnswer(option), 2400);
  }

  // Industry-personalised question text, falls back to default
  const questionText =
    getQuestionText(question.id, industry, lang) ||
    (lang === "es" ? question.es : lang === "ca" ? question.ca : question.en);

  const liveEnergy = totalEnergy + (selected ? selected.energyWh : 0);
  const liveWater  = totalWater  + (selected ? selected.waterMl  : 0);
  const liveCo2    = totalCo2    + (selected ? selected.co2g     : 0);
  const isBad      = selected
    ? getTier(selected.weight) === "bad" || getTier(selected.weight) === "terrible"
    : false;

  return (
    <div
      className={`crt-overlay crt-flicker screen-enter ${shakeScreen ? "screen-shake" : ""}`}
      style={{ minHeight: "100vh", background: "#000", display: "flex", flexDirection: "column" }}
    >
      {/* ── Top bar ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px 10px", borderBottom: "2px solid #0099FF22",
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(0.38rem, 1.1vw, 0.55rem)",
          color: "#FF00FF", textShadow: "0 0 6px #FF00FF", letterSpacing: "0.1em",
        }}>
          {t.level(questionIndex + 1, QUESTIONS.length)}
        </div>
        <CloudCharacter
          mood={cloudMood} message={cloudMsg} size="sm"
          animate={shakeScreen ? "shake" : selected ? "bounce" : "float"}
          flip
        />
      </div>

      {/* ── Main content ── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* LEFT: mini-map */}
        <MiniMap completedCount={questionIndex} currentIdx={questionIndex} score={score} lang={lang} />

        {/* RIGHT: question + options / impact panel */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: "14px", padding: "18px 24px", overflowY: "auto",
        }}>
          <div style={{
            fontFamily: "'Press Start 2P', cursive", fontSize: "0.34rem",
            color: "#0099FF44", letterSpacing: "0.12em",
          }}>
            {t.choose}
          </div>

          {/* Question text */}
          <div style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.55rem, 1.8vw, 0.9rem)",
            color: "#FFFFFF", lineHeight: 1.9, letterSpacing: "0.05em",
          }}>
            {questionText}
          </div>

          {/* Options — fade all non-selected after choice */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {question.options.map((option, i) => {
              const isSelected  = selected?.label === option.label;
              const tier        = isSelected ? getTier(option.weight) : null;
              const baseColor   = OPTION_COLORS[i];
              const activeColor = isSelected ? TIER_CONFIG[tier].color : baseColor;

              return (
                <button
                  key={option.label}
                  className="pixel-btn"
                  onClick={() => handleOption(option)}
                  disabled={!!selected}
                  style={{
                    color:        isSelected ? "#000" : baseColor,
                    background:   isSelected ? activeColor : "transparent",
                    borderColor:  isSelected ? activeColor : baseColor,
                    fontSize:     "clamp(0.36rem, 1vw, 0.55rem)",
                    padding:      "10px 14px",
                    textAlign:    "left",
                    letterSpacing:"0.06em",
                    lineHeight:   1.8,
                    display:      "flex",
                    gap:          "10px",
                    alignItems:   "flex-start",
                    opacity:      selected && !isSelected ? 0.18 : 1,
                    width:        "100%",
                    transition:   "opacity 0.3s",
                  }}
                >
                  <span style={{ minWidth: "20px", fontWeight: "bold" }}>{option.label})</span>
                  <span>{lang === "es" ? option.es : lang === "ca" ? option.ca : option.en}</span>
                </button>
              );
            })}
          </div>

          {/* ── Impact panel — shown after selection ── */}
          {selected && (
            <ImpactPanel option={selected} t={t} />
          )}
        </div>
      </div>

      {/* ── Cumulative footprint bars (bottom) ── */}
      <FootprintBars
        energy={liveEnergy} water={liveWater} co2={liveCo2}
        animate={!!selected} isBad={isBad} lang={lang}
      />
    </div>
  );
}

// ── ImpactPanel ───────────────────────────────────────────────────────────────
// Shown immediately after the player selects an option.
// Displays: tier label + moral verdict + per-choice env numbers with human scale.
function ImpactPanel({ option, t }) {
  const tier        = getTier(option.weight);
  const config      = TIER_CONFIG[tier];
  const moralScore  = option.moralScore ?? 1;
  const moralColor  = MORAL_COLORS[moralScore];
  const moralLabel  = t.moral[moralScore];
  const tierLabel   = t.tier[tier];

  const eHuman = energyToHuman(option.energyWh);
  const wHuman = waterToHuman(option.waterMl);
  const cHuman = co2ToHuman(option.co2g);

  const hasImpact = option.energyWh > 0 || option.waterMl > 0 || option.co2g > 0;

  return (
    <div
      className="pop-in"
      style={{
        border:     `2px solid ${config.color}`,
        background: `${config.color}0a`,
        padding:    "14px 16px",
        display:    "flex",
        flexDirection: "column",
        gap:        "12px",
        boxShadow:  `0 0 20px ${config.color}33`,
      }}
    >
      {/* Tier + Moral row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <div style={{
          fontFamily:   "'Press Start 2P', cursive",
          fontSize:     "clamp(0.42rem, 1.3vw, 0.62rem)",
          color:        config.color,
          textShadow:   `0 0 10px ${config.color}`,
          letterSpacing:"0.08em",
        }}>
          {tierLabel}
        </div>
        <div style={{
          fontFamily:   "'Press Start 2P', cursive",
          fontSize:     "clamp(0.36rem, 1vw, 0.52rem)",
          color:        moralColor,
          textShadow:   `0 0 6px ${moralColor}`,
          letterSpacing:"0.06em",
          border:       `1px solid ${moralColor}44`,
          padding:      "2px 8px",
        }}>
          {moralLabel}
        </div>
      </div>

      {/* Impact label from data */}
      <div style={{
        fontFamily:   "'Press Start 2P', cursive",
        fontSize:     "0.34rem",
        color:        "#FFFFFF88",
        letterSpacing:"0.04em",
        lineHeight:   1.6,
      }}>
        {option.impactLabel}
      </div>

      {/* Per-choice env numbers */}
      {hasImpact && (
        <div style={{
          borderTop:   `1px solid ${config.color}33`,
          paddingTop:  "10px",
          display:     "flex",
          flexDirection:"column",
          gap:         "8px",
        }}>
          <div style={{
            fontFamily:   "'Press Start 2P', cursive",
            fontSize:     "0.32rem",
            color:        "#ffffff33",
            letterSpacing:"0.1em",
            marginBottom: "2px",
          }}>
            {t.thisChoice}
          </div>
          {option.energyWh > 0 && (
            <ImpactRow
              rawLabel={`⚡ ${fmtNum(option.energyWh)} Wh`}
              context={eHuman}
              color="#FF00FF"
              barPct={pct(option.energyWh, 15)}
            />
          )}
          {option.waterMl > 0 && (
            <ImpactRow
              rawLabel={`💧 ${fmtNum(option.waterMl)} ml`}
              context={wHuman}
              color="#0099FF"
              barPct={pct(option.waterMl, 200)}
            />
          )}
          {option.co2g > 0 && (
            <ImpactRow
              rawLabel={`🌫️ ${fmtNum(option.co2g)} g CO₂`}
              context={cHuman}
              color="#AAFFAA"
              barPct={pct(option.co2g, 12)}
            />
          )}
        </div>
      )}

      {/* Zero-impact celebration */}
      {!hasImpact && (
        <div style={{
          fontFamily:   "'Press Start 2P', cursive",
          fontSize:     "clamp(0.4rem, 1.2vw, 0.58rem)",
          color:        "#39FF14",
          textShadow:   "0 0 8px #39FF14",
          letterSpacing:"0.08em",
          textAlign:    "center",
        }}>
          ⚡ 0 Wh &nbsp; 💧 0 ml &nbsp; 🌫️ 0 g
        </div>
      )}
    </div>
  );
}

function fmtNum(n) {
  if (n === 0)     return "0";
  if (n < 0.001)   return n.toFixed(6);
  if (n < 0.01)    return n.toFixed(4);
  if (n < 1)       return n.toFixed(3);
  if (n < 10)      return n.toFixed(2);
  return n.toFixed(1);
}

function ImpactRow({ rawLabel, context, color, barPct }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{
          fontFamily:   "'Press Start 2P', cursive",
          fontSize:     "clamp(0.36rem, 1vw, 0.52rem)",
          color,
          letterSpacing:"0.04em",
        }}>
          {rawLabel}
        </div>
        <div style={{
          fontFamily:   "'Press Start 2P', cursive",
          fontSize:     "0.3rem",
          color:        "#ffffff66",
          letterSpacing:"0.03em",
          textAlign:    "right",
          maxWidth:     "55%",
        }}>
          {context.icon} {context.label}
        </div>
      </div>
      {/* Mini inline bar */}
      <div style={{ height: "5px", background: "#ffffff08", overflow: "hidden" }}>
        <div className="bar-animate" style={{
          height: "100%",
          width:  `${barPct}%`,
          background: color,
          boxShadow:  `0 0 4px ${color}`,
        }} />
      </div>
    </div>
  );
}

// ── Cumulative footprint bars (bottom strip) ──────────────────────────────────
const BAR_LABELS = {
  en: { energy: "⚡ ENERGY", water: "💧 WATER", co2: "🌫️ CO₂", total: "CUMULATIVE FOOTPRINT" },
  es: { energy: "⚡ ENERGÍA", water: "💧 AGUA",  co2: "🌫️ CO₂", total: "HUELLA ACUMULADA" },
  ca: { energy: "⚡ ENERGIA", water: "💧 AIGUA", co2: "🌫️ CO₂", total: "PETJADA ACUMULADA" },
};

function FootprintBars({ energy, water, co2, animate, isBad, lang }) {
  const bl   = BAR_LABELS[lang] || BAR_LABELS.en;
  const bars = [
    { label: bl.energy, value: energy, max: MAX_ENERGY, color: "#FF00FF", unit: "Wh" },
    { label: bl.water,  value: water,  max: MAX_WATER,  color: "#0099FF", unit: "ml" },
    { label: bl.co2,    value: co2,    max: MAX_CO2,    color: "#AAFFAA", unit: "g"  },
  ];

  return (
    <div style={{
      padding:    "12px 20px 14px",
      borderTop:  "2px solid #0099FF22",
      background: "#000000aa",
    }}>
      {/* Section label */}
      <div style={{
        fontFamily:   "'Press Start 2P', cursive",
        fontSize:     "0.3rem",
        color:        "#ffffff22",
        letterSpacing:"0.1em",
        marginBottom: "10px",
      }}>
        {bl.total}
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {bars.map((bar) => (
          <div key={bar.label} style={{ flex: "1 1 140px", minWidth: "120px" }}>
            <div style={{
              fontFamily:   "'Press Start 2P', cursive",
              fontSize:     "clamp(0.32rem, 0.9vw, 0.44rem)",
              color:        isBad && animate ? "#FF3A20" : bar.color,
              marginBottom: "5px",
              letterSpacing:"0.06em",
              display:      "flex",
              justifyContent:"space-between",
            }}>
              <span>{bar.label}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {bar.value < 0.001 ? bar.value.toFixed(6)
                 : bar.value < 1   ? bar.value.toFixed(3)
                 : bar.value.toFixed(1)}{bar.unit}
              </span>
            </div>
            {/* Taller bar */}
            <div style={{ height: "14px", background: "#ffffff08", border: `1px solid ${bar.color}22`, overflow: "hidden" }}>
              <div
                className={`${animate ? "bar-animate" : ""} ${isBad && animate ? "bar-danger" : ""}`}
                style={{
                  height: "100%",
                  width:  `${pct(bar.value, bar.max)}%`,
                  background: isBad && animate
                    ? `linear-gradient(90deg, ${bar.color}, #FF3A20)`
                    : bar.color,
                  boxShadow: `0 0 6px ${bar.color}`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
