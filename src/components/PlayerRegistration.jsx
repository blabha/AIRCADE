import React, { useState } from "react";
import { INDUSTRIES, INDUSTRIES_ES, INDUSTRIES_CA } from "../data/industries";
import CloudCharacter from "./CloudCharacter";

const T = {
  en: {
    title:            "PLAYER REGISTRATION",
    name:             "NAME",
    namePlaceholder:  "ENTER NAME",
    age:              "AGE",
    agePlaceholder:   "00",
    gender:           "GENDER",
    genderOptions:    ["Select...", "Male", "Female", "Non-binary", "Prefer not to say"],
    industry:         "INDUSTRY",
    industryPlaceholder: "Select industry...",
    start:            "PRESS START",
    required:         "* FILL ALL FIELDS TO CONTINUE",
    cloudMsg:         "TELL ME\nABOUT YOU!",
    cloudReady:       "LET'S GO!",
  },
  es: {
    title:            "REGISTRO DE JUGADOR",
    name:             "NOMBRE",
    namePlaceholder:  "INGRESA NOMBRE",
    age:              "EDAD",
    agePlaceholder:   "00",
    gender:           "GÉNERO",
    genderOptions:    ["Seleccionar...", "Masculino", "Femenino", "No binario", "Prefiero no decir"],
    industry:         "INDUSTRIA",
    industryPlaceholder: "Seleccionar industria...",
    start:            "PULSA START",
    required:         "* COMPLETA TODOS LOS CAMPOS",
    cloudMsg:         "¡CUÉNTAME\nSOBRE TI!",
    cloudReady:       "¡VAMOS!",
  },
  ca: {
    title:            "REGISTRE DE JUGADOR",
    name:             "NOM",
    namePlaceholder:  "INTRODUEIX NOM",
    age:              "EDAT",
    agePlaceholder:   "00",
    gender:           "GÈNERE",
    genderOptions:    ["Seleccionar...", "Masculí", "Femení", "No binari", "Prefereixo no dir-ho"],
    industry:         "INDÚSTRIA",
    industryPlaceholder: "Seleccionar indústria...",
    start:            "PREM START",
    required:         "* OMPLE TOTS ELS CAMPS",
    cloudMsg:         "EXPLICA'M\nQUI ETS!",
    cloudReady:       "ANEM!",
  },
};

export default function PlayerRegistration({ lang, player, setPlayer, onStart, play }) {
  const t         = T[lang] || T.en;
  const localizedIndustries = lang === "es" ? INDUSTRIES_ES : lang === "ca" ? INDUSTRIES_CA : INDUSTRIES;
  const [error, setError]       = useState(false);
  const [ready, setReady]       = useState(false);

  const isComplete = player.name.trim() && player.age && player.gender && player.industry;

  function handleChange(field, value) {
    play("click");
    setPlayer({ [field]: value });
    setError(false);
  }

  function handleSubmit() {
    if (!isComplete) { setError(true); play("click"); return; }
    play("coin");
    setReady(true);
    setTimeout(onStart, 300);
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
        padding: "32px 20px",
        gap: "24px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "clamp(0.55rem, 1.8vw, 0.9rem)",
          color: "#0099FF",
          letterSpacing: "0.1em",
          textAlign: "center",
          textShadow: "0 0 8px #0099FF",
        }}
      >
        {t.title}
      </div>

      {/* Layout: form + cloud side by side on wide screens */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Form card */}
        <div
          style={{
            flex: "1 1 340px",
            maxWidth: "480px",
            border: "4px solid #0099FF",
            padding: "28px",
            boxShadow: "0 0 20px #0099FF44",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            background: "#000",
          }}
        >
          <Field label={t.name} color="#0099FF">
            <input
              className="pixel-input"
              type="text"
              placeholder={t.namePlaceholder}
              value={player.name}
              maxLength={30}
              onChange={(e) => handleChange("name", e.target.value)}
              onFocus={() => play("click")}
            />
          </Field>

          <Field label={t.age} color="#0099FF">
            <input
              className="pixel-input"
              type="number"
              placeholder={t.agePlaceholder}
              value={player.age}
              min={1} max={120}
              onChange={(e) => handleChange("age", e.target.value)}
              onFocus={() => play("click")}
              style={{ maxWidth: "120px" }}
            />
          </Field>

          <Field label={t.gender} color="#0099FF">
            <div style={{ position: "relative" }}>
              <select
                className="pixel-select"
                value={player.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                onFocus={() => play("click")}
              >
                {t.genderOptions.map((opt, i) => (
                  <option key={i} value={i === 0 ? "" : opt}>{opt}</option>
                ))}
              </select>
              <SelectArrow />
            </div>
          </Field>

          <Field label={t.industry} color="#0099FF">
            <div style={{ position: "relative" }}>
              <select
                className="pixel-select"
                value={player.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                onFocus={() => play("click")}
              >
                <option value="">{t.industryPlaceholder}</option>
                {INDUSTRIES.map((ind, i) => (
                  <option key={i} value={ind}>
                    {localizedIndustries[i]}
                  </option>
                ))}
              </select>
              <SelectArrow />
            </div>
          </Field>

          {error && (
            <div
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "0.42rem",
                color: "#FF3A20",
                textShadow: "0 0 6px #FF3A20",
                textAlign: "center",
                letterSpacing: "0.08em",
              }}
            >
              {t.required}
            </div>
          )}

          <button
            className="pixel-btn"
            onClick={handleSubmit}
            style={{
              color: isComplete ? "#FF00FF" : "#ffffff33",
              fontSize: "clamp(0.48rem, 1.4vw, 0.7rem)",
              padding: "16px 0",
              marginTop: "6px",
              letterSpacing: "0.12em",
              width: "100%",
              borderColor: isComplete ? "#FF00FF" : "#ffffff22",
            }}
          >
            {t.start}
          </button>
        </div>

        {/* Cloud companion — positioned to the right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "40px",
          }}
        >
          <CloudCharacter
            mood={ready ? "celebrating" : isComplete ? "happy" : error ? "worried" : "neutral"}
            message={ready ? t.cloudReady : t.cloudMsg}
            size="md"
            animate={ready ? "bounce" : "float"}
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, color, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.48rem", color, letterSpacing: "0.1em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectArrow() {
  return (
    <div
      style={{
        position: "absolute", right: "12px", top: "50%",
        transform: "translateY(-50%)",
        color: "#0099FF", pointerEvents: "none",
        fontFamily: "'Press Start 2P', cursive", fontSize: "0.5rem",
      }}
    >
      ▼
    </div>
  );
}
