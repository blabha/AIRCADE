import React from "react";
import { QUESTIONS } from "../data/questions";
import CloudCharacter from "./CloudCharacter";

// Level themes — blue / magenta / white alternating
const LEVEL_THEMES = [
  { name: "IMAGE",   icon: "🎨", color: "#0099FF" },
  { name: "QUERY",   icon: "💬", color: "#FF00FF" },
  { name: "REPORT",  icon: "📝", color: "#FFFFFF" },
  { name: "PHOTOS",  icon: "📸", color: "#0099FF" },
  { name: "LAUNCH",  icon: "🚀", color: "#FF00FF" },
];

const T = {
  en: { header: "PROGRESS", now: "◄ NOW" },
  es: { header: "PROGRESO", now: "◄ AHORA" },
  ca: { header: "PROGRÉS",  now: "◄ ARA"  },
};

/**
 * MiniMap — vertical side-panel showing 5 levels.
 * Level 5 is at the top (goal), level 1 at the bottom (start).
 * The cloud character sits beside the current active node.
 *
 * Props:
 *   completedCount  — how many levels are done (0–5)
 *   currentIdx      — 0-based index of the ACTIVE level (the one being played)
 *   score           — running score for badge
 *   lang
 */
export default function MiniMap({ completedCount, currentIdx, score, lang }) {
  const t = T[lang] || T.en;

  const cloudMood =
    score < 0   ? "worried"   :
    score < 8   ? "neutral"   :
    score < 15  ? "happy"     : "celebrating";

  // Render list: level 5 at index 0 visually (top), level 1 at index 4 (bottom)
  const visualOrder = [...QUESTIONS].map((_, i) => QUESTIONS.length - 1 - i); // [4,3,2,1,0]

  return (
    <div
      style={{
        width: "190px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "16px 10px",
        borderRight: "3px solid #0099FF22",
        background: "#00000088",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.38rem",
          color: "#0099FF",
          letterSpacing: "0.1em",
          marginBottom: "6px",
          textShadow: "0 0 6px #0099FF",
        }}
      >
        {t.header}
      </div>

      {/* Score badge */}
      <ScoreBadge score={score} />

      {/* Node list — top = level 5, bottom = level 1 */}
      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "280px" }}>

        {/* Vertical connecting line */}
        <div
          style={{
            position: "absolute",
            left: "28px",
            top: "20px",
            bottom: "20px",
            width: "3px",
            background: "#ffffff11",
          }}
        />
        {/* Completed segment of line */}
        {completedCount > 0 && (
          <div
            style={{
              position: "absolute",
              left: "28px",
              bottom: "20px",
              width: "3px",
              height: `${(completedCount / QUESTIONS.length) * 100}%`,
              background: "linear-gradient(to top, #0099FF, #FF00FF)",
              transition: "height 0.4s steps(8)",
            }}
          />
        )}

        {visualOrder.map((levelIdx) => {
          const theme   = LEVEL_THEMES[levelIdx];
          const done    = levelIdx < completedCount;
          const current = levelIdx === currentIdx;
          const locked  = !done && !current;
          const num     = levelIdx + 1;

          return (
            <div
              key={levelIdx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Node */}
              <div
                className={current ? "pixel-pulse" : ""}
                style={{
                  width: "36px",
                  height: "36px",
                  border: `3px solid ${locked ? "#333" : theme.color}`,
                  background: done
                    ? `${theme.color}33`
                    : current
                      ? `${theme.color}22`
                      : "#00000099",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: locked ? 0.3 : 1,
                  boxShadow: (done || current) ? `0 0 8px ${theme.color}88` : "none",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "0.45rem",
                    color: locked ? "#333" : theme.color,
                  }}
                >
                  {done ? "★" : locked ? "🔒" : num}
                </span>
              </div>

              {/* Label */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: "0.3rem",
                    color: locked ? "#333" : current ? theme.color : "#ffffff66",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {theme.icon} {theme.name}
                </div>
                {current && (
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: "0.26rem",
                      color: theme.color,
                      letterSpacing: "0.04em",
                      marginTop: "3px",
                    }}
                  >
                    {t.now}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cloud mascot */}
      <div style={{ marginTop: "8px" }}>
        <CloudCharacter mood={cloudMood} size="sm" animate="float" />
      </div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const color = score < 0 ? "#FF3A20" : score < 8 ? "#FF00FF" : "#0099FF";
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "0.42rem",
        color,
        border: `2px solid ${color}`,
        padding: "4px 8px",
        textShadow: `0 0 5px ${color}`,
        letterSpacing: "0.06em",
        width: "100%",
        textAlign: "center",
      }}
    >
      {score >= 0 ? "+" : ""}{score} PTS
    </div>
  );
}
