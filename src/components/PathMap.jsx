import { useState, useEffect } from "react";
import { QUESTIONS } from "../data/questions";
import CloudCharacter from "./CloudCharacter";

const T = {
  en: {
    title:     "MISSION MAP",
    go:        "GO ▶",
    level:     (n) => `LEVEL ${n}`,
    locked:    "LOCKED",
    complete:  "COMPLETE!",
    levelDone: (n) => `LEVEL ${n} COMPLETE!`,
    results:   "SEE RESULTS ▶",
  },
  es: {
    title:     "MAPA DE MISIÓN",
    go:        "IR ▶",
    level:     (n) => `NIVEL ${n}`,
    locked:    "BLOQUEADO",
    complete:  "¡COMPLETO!",
    levelDone: (n) => `¡NIVEL ${n} COMPLETO!`,
    results:   "VER RESULTADOS ▶",
  },
  ca: {
    title:     "MAPA DE MISSIÓ",
    go:        "ANAR ▶",
    level:     (n) => `NIVELL ${n}`,
    locked:    "BLOQUEJAT",
    complete:  "COMPLET!",
    levelDone: (n) => `NIVELL ${n} COMPLET!`,
    results:   "VEURE RESULTATS ▶",
  },
};

const LEVEL_THEMES = [
  { name: "DIGITAL STUDIO", icon: "🎨", color: "#0099FF" },
  { name: "QUERY TOWER",    icon: "💬", color: "#0099FF" },
  { name: "REPORT HALL",    icon: "📝", color: "#FF00FF" },
  { name: "PHOTO VAULT",    icon: "📸", color: "#FF00FF" },
  { name: "LAUNCH PAD",     icon: "🚀", color: "#39FF14" },
];

// Node centers on a 560×340 canvas — winding bottom-left → top-right
const NODES = [
  { x: 60,  y: 270 },
  { x: 170, y: 195 },
  { x: 290, y: 230 },
  { x: 400, y: 130 },
  { x: 490, y: 50  },
];

// Walk duration ms (CSS transition matches this)
const WALK_MS = 750;
// Delay before Nimbus starts walking
const WALK_DELAY_MS = 350;

export default function PathMap({
  lang,
  completedCount,
  prevCompletedCount,
  onGo,
  score,
  lastDelta,
}) {
  const t = T[lang] || T.en;
  const allDone = completedCount >= QUESTIONS.length;

  // ── Nimbus walk animation ──────────────────────────────────────────────────
  // nimbusIdx: which node Nimbus is visually at (may lag behind completedCount)
  const startIdx = prevCompletedCount != null
    ? Math.min(prevCompletedCount, NODES.length - 1)
    : Math.min(completedCount, NODES.length - 1);

  const [nimbusIdx,  setNimbusIdx]  = useState(startIdx);
  const [isWalking,  setIsWalking]  = useState(false);
  const [walkDone,   setWalkDone]   = useState(prevCompletedCount == null || prevCompletedCount >= completedCount);

  useEffect(() => {
    const targetIdx = Math.min(completedCount, NODES.length - 1);

    if (prevCompletedCount != null && prevCompletedCount < completedCount) {
      const fromIdx = Math.min(prevCompletedCount, NODES.length - 1);
      setNimbusIdx(fromIdx);
      setIsWalking(true);
      setWalkDone(false);

      const t1 = setTimeout(() => setNimbusIdx(targetIdx), WALK_DELAY_MS);
      const t2 = setTimeout(() => {
        setIsWalking(false);
        setWalkDone(true);
      }, WALK_DELAY_MS + WALK_MS + 100);

      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setNimbusIdx(targetIdx);
      setWalkDone(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount, prevCompletedCount]);

  // ── Cloud mood / message ───────────────────────────────────────────────────
  const cloudMood =
    completedCount === 0 ? "neutral"  :
    score < 0            ? "worried"  :
    score < 8            ? "neutral"  :
    score < 15           ? "happy"    : "celebrating";

  const cloudMsg = (() => {
    if (completedCount === 0)
      return lang === "es" ? "¡EMPECEMOS!" : lang === "ca" ? "COMENCEM!" : "LET'S GO!";
    if (lastDelta != null) {
      if (lastDelta >= 4) return lang === "es" ? "¡PERFECTO!" : lang === "ca" ? "PERFECTE!" : "PERFECT!";
      if (lastDelta >= 2) return lang === "es" ? "¡BIEN HECHO!" : lang === "ca" ? "BEN FET!" : "NICE WORK!";
      if (lastDelta >= 0) return lang === "es" ? "SIGUE ASÍ..." : lang === "ca" ? "SEGUEIX AIXÍ..." : "KEEP GOING...";
      return lang === "es" ? "¡CUIDA TU HUELLA!" : lang === "ca" ? "VIGILA LA TEVA PETJADA!" : "WATCH YOUR FOOTPRINT!";
    }
    return null;
  })();

  const nimbusNode = NODES[nimbusIdx];
  const currentTheme = LEVEL_THEMES[Math.min(completedCount, LEVEL_THEMES.length - 1)];

  return (
    <div
      className="crt-overlay crt-flicker screen-enter"
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "18px",
        padding: "20px 16px",
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.5rem, 1.6vw, 0.8rem)",
            color: "#FF00FF",
            textShadow: "0 0 10px #FF00FF",
            letterSpacing: "0.1em",
          }}
        >
          {t.title}
        </div>
        <ScoreBadge score={score} lastDelta={lastDelta} />
      </div>

      {/* ── Map canvas ── */}
      <div
        style={{
          position: "relative",
          width: "min(560px, 94vw)",
          height: "340px",
          border: "3px solid #0099FF44",
          background: "#050510",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 0 20px #0099FF22",
        }}
      >
        {/* Subtle grid lines */}
        <svg
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          width="100%" height="100%"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 56} y1={0} x2={i * 56} y2={340}
              stroke="#ffffff06" strokeWidth="1" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 56} x2={560} y2={i * 56}
              stroke="#ffffff06" strokeWidth="1" />
          ))}

          {/* Dim full route */}
          <polyline
            points={NODES.map(n => `${n.x + 20},${n.y + 20}`).join(" ")}
            fill="none"
            stroke="#ffffff0a"
            strokeWidth="8"
            strokeLinecap="square"
          />

          {/* Completed segments */}
          {NODES.slice(1).map((node, i) => {
            if (i + 1 > completedCount) return null;
            const prev = NODES[i];
            return (
              <line
                key={`seg${i}`}
                x1={prev.x + 20} y1={prev.y + 20}
                x2={node.x + 20} y2={node.y + 20}
                stroke={LEVEL_THEMES[i + 1].color}
                strokeWidth="4"
                strokeDasharray="8 5"
                strokeLinecap="square"
                className="path-trace"
              />
            );
          })}
        </svg>

        {/* Level nodes */}
        {NODES.map((node, i) => {
          const done    = i < completedCount;
          const current = i === completedCount && completedCount < QUESTIONS.length;
          const locked  = !done && !current;
          const theme   = LEVEL_THEMES[i];
          return (
            <div
              key={i}
              className={current ? "pixel-pulse" : ""}
              style={{
                position: "absolute",
                left: node.x,
                top:  node.y,
                width: 40,
                height: 40,
                border: `3px solid ${locked ? "#1a1a1a" : theme.color}`,
                background: done    ? `${theme.color}33`
                          : current ? `${theme.color}18`
                          : "#00000088",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: locked ? 0.2 : 1,
                zIndex: 10,
                boxShadow: done || current ? `0 0 12px ${theme.color}88` : "none",
              }}
            >
              {done ? (
                <span style={{ fontSize: "16px" }}>⭐</span>
              ) : current ? (
                <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.55rem", color: theme.color }}>
                  {i + 1}
                </span>
              ) : (
                <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.4rem", color: "#333" }}>
                  {i + 1}
                </span>
              )}
              {/* Icon tag below node */}
              <div style={{
                position: "absolute",
                bottom: -18,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "12px",
                opacity: locked ? 0.3 : 1,
              }}>
                {theme.icon}
              </div>
            </div>
          );
        })}

        {/* Nimbus — animated between nodes */}
        <div
          style={{
            position: "absolute",
            left: nimbusNode.x - 14,
            top:  nimbusNode.y - 82,
            zIndex: 20,
            transition: isWalking
              ? `left ${WALK_MS}ms cubic-bezier(0.4,0,0.2,1), top ${WALK_MS}ms cubic-bezier(0.4,0,0.2,1)`
              : "none",
          }}
        >
          <CloudCharacter
            mood={isWalking ? "neutral" : cloudMood}
            message={walkDone ? cloudMsg : null}
            size="sm"
            animate={isWalking ? "bounce" : allDone ? "bounce" : "float"}
          />
        </div>

        {/* Completion star at node 5 when all done */}
        {allDone && (
          <div
            className="star-spin"
            style={{
              position: "absolute",
              left: NODES[4].x,
              top:  NODES[4].y - 28,
              fontSize: "20px",
              zIndex: 20,
            }}
          >
            ⭐
          </div>
        )}

        {/* Corner watermark */}
        <div style={{
          position: "absolute",
          bottom: 6, right: 8,
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.28rem",
          color: "#ffffff18",
          letterSpacing: "0.06em",
        }}>
          AIRCADE MAP
        </div>
      </div>

      {/* ── Progress bar ── */}
      <ProgressBar completedCount={completedCount} total={QUESTIONS.length} />

      {/* ── GO / RESULTS button — only shown after walk completes ── */}
      {walkDone && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          {!allDone && (
            <div style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "clamp(0.4rem, 1.2vw, 0.55rem)",
              color: currentTheme.color,
              letterSpacing: "0.08em",
              textAlign: "center",
            }}>
              {currentTheme.icon} {t.level(completedCount + 1)}: {currentTheme.name}
            </div>
          )}
          <button
            className="pixel-btn zone-pulse"
            onClick={onGo}
            style={{
              color:       allDone ? "#39FF14" : currentTheme.color,
              fontSize:    "clamp(0.5rem, 1.6vw, 0.8rem)",
              padding:     "14px 44px",
              letterSpacing: "0.12em",
            }}
          >
            {allDone ? t.results : t.go}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ completedCount, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "min(560px, 94vw)" }}>
      <div style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "0.38rem",
        color: "#ffffff44",
        whiteSpace: "nowrap",
      }}>
        {completedCount}/{total}
      </div>
      <div style={{
        flex: 1,
        height: "8px",
        background: "#ffffff0a",
        border: "2px solid #ffffff18",
        overflow: "hidden",
      }}>
        <div
          className="bar-animate"
          style={{
            height: "100%",
            width: `${(completedCount / total) * 100}%`,
            background: "linear-gradient(90deg, #0099FF, #FF00FF, #39FF14)",
            boxShadow: "0 0 6px #0099FF",
            transition: "width 0.6s ease",
          }}
        />
      </div>
      {LEVEL_THEMES.map((theme, i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            background: i < completedCount ? theme.color : "#ffffff0a",
            border: `2px solid ${i < completedCount ? theme.color : "#ffffff18"}`,
            boxShadow: i < completedCount ? `0 0 4px ${theme.color}` : "none",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function ScoreBadge({ score, lastDelta }) {
  const color = score < 0 ? "#FF3A20" : score < 8 ? "#FF00FF" : score < 15 ? "#0099FF" : "#39FF14";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "0.48rem",
        color,
        border: `2px solid ${color}`,
        padding: "3px 9px",
        textShadow: `0 0 6px ${color}`,
        boxShadow: `0 0 8px ${color}44`,
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
      }}>
        {score >= 0 ? "+" : ""}{score} PTS
      </div>
      {lastDelta != null && (
        <div
          className="pop-in"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "0.38rem",
            color: lastDelta >= 0 ? "#39FF14" : "#FF3A20",
            textShadow: `0 0 6px ${lastDelta >= 0 ? "#39FF14" : "#FF3A20"}`,
            letterSpacing: "0.06em",
          }}
        >
          {lastDelta >= 0 ? `+${lastDelta}` : lastDelta}
        </div>
      )}
    </div>
  );
}
