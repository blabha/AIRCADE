import React, { useEffect, useRef } from "react";
import { QUESTIONS } from "../data/questions";
import CloudCharacter from "./CloudCharacter";

const T = {
  en: {
    title:   "MISSION MAP",
    go:      "GO ▶",
    level:   (n) => `LEVEL ${n}`,
    of:      (n) => `/ ${n}`,
    locked:  "LOCKED",
    complete:"COMPLETE!",
    levelDone: (n) => `LEVEL ${n} COMPLETE!`,
    start:   "START",
  },
  es: {
    title:   "MAPA DE MISIÓN",
    go:      "IR ▶",
    level:   (n) => `NIVEL ${n}`,
    of:      (n) => `/ ${n}`,
    locked:  "BLOQUEADO",
    complete:"¡COMPLETO!",
    levelDone: (n) => `¡NIVEL ${n} COMPLETO!`,
    start:   "INICIO",
  },
};

// Each level has a theme: name, icon, accent colour, and terrain colour
const LEVEL_THEMES = [
  { name: "DIGITAL STUDIO", icon: "🎨", color: "#0099FF", terrain: "#1a0020", nodeColor: "#0099FF" },
  { name: "QUERY TOWER",    icon: "💬", color: "#0099FF", terrain: "#001a20", nodeColor: "#0099FF" },
  { name: "REPORT HALL",    icon: "📝", color: "#FFE600", terrain: "#1a1a00", nodeColor: "#FFE600" },
  { name: "PHOTO VAULT",    icon: "📸", color: "#FFE600", terrain: "#1a0800", nodeColor: "#FFE600" },
  { name: "LAUNCH PAD",     icon: "🚀", color: "#39FF14", terrain: "#001a00", nodeColor: "#39FF14" },
];

// Node positions on the 560×380 canvas (bottom-left to top-right winding path)
const NODES = [
  { x: 60,  y: 295 },   // Level 1 — bottom-left
  { x: 170, y: 215 },   // Level 2
  { x: 290, y: 250 },   // Level 3 — middle dip
  { x: 400, y: 155 },   // Level 4
  { x: 490, y: 70  },   // Level 5 — top-right
];

// Pixel terrain tile definitions — [col, row, color]
// These fill the background with biome blocks to give a map feel
function buildTerrain() {
  const tiles = [];
  const TILE = 28; // tile size
  const COLS = 20;
  const ROWS = 14;

  // Simple noise-like map: base is dark, then lighter patches near nodes
  const biomes = [
    "#0a0010", "#0d0015", "#100018", "#0a000e", "#150020",
    "#001015", "#001820", "#001a22", "#000e12", "#001518",
    "#0f0f00", "#141400", "#181800", "#0c0c00", "#1a1a00",
    "#100800", "#160a00", "#1a0c00", "#0e0600", "#180a00",
    "#001800", "#002000", "#001a00", "#001500", "#002200",
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // pick a biome based on rough diagonal position
      const idx = Math.abs((c + r * 3) % biomes.length);
      tiles.push({ x: c * TILE, y: r * TILE, color: biomes[idx] });
    }
  }
  return tiles;
}

const TERRAIN = buildTerrain();

// Build the SVG path string through all node centers
function buildPath(nodes) {
  return nodes.map((n, i) => {
    const cx = n.x + 20;
    const cy = n.y + 20;
    if (i === 0) return `M ${cx} ${cy}`;
    // Curved bezier through midpoints
    const prev = nodes[i - 1];
    const px = prev.x + 20;
    const py = prev.y + 20;
    const mx = (px + cx) / 2;
    return `Q ${mx} ${py} ${cx} ${cy}`;
  }).join(" ");
}

const PATH_D = buildPath(NODES);

export default function PathMap({
  lang,
  completedCount,   // how many questions answered
  onGo,
  showComplete,     // brief "level X complete" overlay
  score,
}) {
  const t = T[lang] || T.en;
  const currentIdx = completedCount; // 0-based index of current (next to play) node

  // cloud mood based on score so far
  const cloudMood =
    completedCount === 0 ? "neutral" :
    score < 0            ? "worried" :
    score < 8            ? "neutral" :
    score < 15           ? "happy"   : "celebrating";

  const cloudMsg =
    completedCount === 0
      ? (lang === "es" ? "¡EMPECEMOS!" : "LET'S GO!")
      : showComplete
        ? (lang === "es" ? "¡BIEN HECHO!" : "NICE WORK!")
        : score < 0
          ? (lang === "es" ? "CUIDA TU HUELLA..." : "WATCH YOUR FOOTPRINT...")
          : score >= 15
            ? (lang === "es" ? "¡INCREÍBLE!" : "OUTSTANDING!")
            : null;

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
        gap: "20px",
        padding: "24px 16px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.55rem, 1.8vw, 0.85rem)",
            color: showComplete ? "#39FF14" : "#FFE600",
            textShadow: `0 0 10px ${showComplete ? "#39FF14" : "#FFE600"}`,
            letterSpacing: "0.1em",
          }}
        >
          {showComplete
            ? t.levelDone(completedCount)
            : t.title}
        </div>
        {/* Score badge */}
        <ScoreBadge score={score} lang={lang} />
      </div>

      {/* ── MAP CANVAS ── */}
      <div
        style={{
          position: "relative",
          width: "min(560px, 94vw)",
          height: "380px",
          border: "4px solid #0099FF",
          boxShadow: "0 0 24px #0099FF44, inset 0 0 40px #00000088",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Terrain tiles */}
        {TERRAIN.map((tile, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: tile.x,
              top:  tile.y,
              width: 28,
              height: 28,
              background: tile.color,
            }}
          />
        ))}

        {/* Zone glow circles behind each node */}
        {NODES.map((node, i) => {
          const theme = LEVEL_THEMES[i];
          const done    = i < completedCount;
          const current = i === currentIdx && currentIdx < QUESTIONS.length;
          if (!done && !current) return null;
          return (
            <div
              key={`glow${i}`}
              style={{
                position: "absolute",
                left: node.x - 16,
                top:  node.y - 16,
                width: 72,
                height: 72,
                borderRadius: 0,
                background: `radial-gradient(circle, ${theme.color}22 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          );
        })}

        {/* SVG: path + dashes */}
        <svg
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
          viewBox="0 0 560 380"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          {/* Base path (dim) */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#ffffff11"
            strokeWidth="10"
            strokeLinecap="square"
          />
          {/* Completed path segments */}
          {NODES.slice(0, completedCount).map((node, i) => {
            if (i === 0) return null;
            const prev = NODES[i - 1];
            const segD = `M ${prev.x + 20} ${prev.y + 20} Q ${(prev.x + node.x) / 2 + 20} ${prev.y + 20} ${node.x + 20} ${node.y + 20}`;
            return (
              <path
                key={`seg${i}`}
                d={segD}
                fill="none"
                stroke={LEVEL_THEMES[i].color}
                strokeWidth="5"
                strokeDasharray="10 6"
                strokeLinecap="square"
                className="path-trace"
              />
            );
          })}
          {/* Path dots (coins) along the full route */}
          {Array.from({ length: 24 }).map((_, i) => {
            const t_val = i / 23;
            // Approximate position along path
            const segIdx = Math.floor(t_val * (NODES.length - 1));
            const segT   = (t_val * (NODES.length - 1)) % 1;
            const n1 = NODES[Math.min(segIdx, NODES.length - 1)];
            const n2 = NODES[Math.min(segIdx + 1, NODES.length - 1)];
            const px = (n1.x + 20) + (n2.x - n1.x) * segT;
            const py = (n1.y + 20) + (n2.y - n1.y) * segT;
            return (
              <rect
                key={`dot${i}`}
                x={px - 2} y={py - 2}
                width={4} height={4}
                fill="#ffffff08"
              />
            );
          })}
        </svg>

        {/* Level nodes */}
        {NODES.map((node, i) => {
          const theme   = LEVEL_THEMES[i];
          const done    = i < completedCount;
          const current = i === currentIdx && currentIdx < QUESTIONS.length;
          const locked  = !done && !current;

          return (
            <LevelNode
              key={i}
              node={node}
              index={i}
              theme={theme}
              done={done}
              current={current}
              locked={locked}
              lang={lang}
              t={t}
            />
          );
        })}

        {/* Cloud character at current node */}
        {currentIdx < QUESTIONS.length && (
          <div
            style={{
              position: "absolute",
              left: NODES[currentIdx].x - 12,
              top:  NODES[currentIdx].y - 80,
              zIndex: 20,
            }}
          >
            <CloudCharacter
              mood={cloudMood}
              message={cloudMsg}
              size="sm"
              animate="float"
            />
          </div>
        )}

        {/* Completion star at level 5 if all done */}
        {completedCount >= QUESTIONS.length && (
          <div
            className="star-spin"
            style={{
              position: "absolute",
              left: NODES[4].x - 4,
              top:  NODES[4].y - 32,
              fontSize: "24px",
              zIndex: 20,
            }}
          >
            ⭐
          </div>
        )}

        {/* Mini compass */}
        <div
          style={{
            position: "absolute",
            bottom: 8, right: 8,
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "0.35rem",
            color: "#ffffff22",
          }}
        >
          AIRCADE MAP
        </div>
      </div>

      {/* Progress indicator */}
      <ProgressBar completedCount={completedCount} total={QUESTIONS.length} lang={lang} t={t} />

      {/* GO button */}
      {!showComplete && completedCount < QUESTIONS.length && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "clamp(0.45rem, 1.3vw, 0.6rem)",
              color: LEVEL_THEMES[currentIdx]?.color || "#FFE600",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            {LEVEL_THEMES[currentIdx]?.icon} {t.level(currentIdx + 1)}: {LEVEL_THEMES[currentIdx]?.name}
          </div>
          <button
            className="pixel-btn zone-pulse"
            onClick={onGo}
            style={{
              color: LEVEL_THEMES[currentIdx]?.color || "#FFE600",
              fontSize: "clamp(0.55rem, 1.8vw, 0.85rem)",
              padding: "16px 48px",
              letterSpacing: "0.14em",
            }}
          >
            {t.go}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LevelNode({ node, index, theme, done, current, locked, lang, t }) {
  return (
    <div
      className={current ? "pixel-pulse" : ""}
      style={{
        position: "absolute",
        left: node.x,
        top:  node.y,
        width: 40,
        height: 40,
        border: `3px solid ${locked ? "#333" : theme.color}`,
        background: done
          ? `${theme.color}33`
          : current
            ? `${theme.color}22`
            : "#00000088",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2px",
        opacity: locked ? 0.25 : 1,
        zIndex: 10,
        boxShadow: done || current ? `0 0 10px ${theme.color}88` : "none",
      }}
    >
      {done ? (
        <>
          <span style={{ fontSize: "14px" }}>⭐</span>
          <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "0.3rem", color: theme.color }}>
            ✓
          </span>
        </>
      ) : current ? (
        <span
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "0.55rem",
            color: theme.color,
          }}
        >
          {index + 1}
        </span>
      ) : (
        <span style={{ fontSize: "14px" }}>🔒</span>
      )}
      {/* Level name tag */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.28rem",
          color: locked ? "#333" : theme.color,
          whiteSpace: "nowrap",
          letterSpacing: "0.04em",
        }}
      >
        {theme.icon}
      </div>
    </div>
  );
}

function ProgressBar({ completedCount, total, t }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "min(560px, 94vw)",
      }}
    >
      <div
        style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "0.4rem",
          color: "#ffffff55",
          whiteSpace: "nowrap",
        }}
      >
        {completedCount}/{total}
      </div>
      <div
        style={{
          flex: 1,
          height: "10px",
          background: "#ffffff11",
          border: "2px solid #ffffff22",
          overflow: "hidden",
        }}
      >
        <div
          className="bar-animate"
          style={{
            height: "100%",
            width: `${(completedCount / total) * 100}%`,
            background: "linear-gradient(90deg, #0099FF, #FFE600, #FFFFFF)",
            boxShadow: "0 0 6px #0099FF",
          }}
        />
      </div>
      {LEVEL_THEMES.map((theme, i) => (
        <div
          key={i}
          style={{
            width: "10px",
            height: "10px",
            background: i < completedCount ? theme.color : "#ffffff11",
            border: `2px solid ${i < completedCount ? theme.color : "#ffffff22"}`,
            boxShadow: i < completedCount ? `0 0 4px ${theme.color}` : "none",
          }}
        />
      ))}
    </div>
  );
}

function ScoreBadge({ score, lang }) {
  const label = lang === "es" ? "PTS" : "PTS";
  const color = score < 0 ? "#FF3A20" : score < 8 ? "#FFE600" : score < 15 ? "#0099FF" : "#39FF14";
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "0.5rem",
        color,
        border: `2px solid ${color}`,
        padding: "4px 10px",
        textShadow: `0 0 6px ${color}`,
        boxShadow: `0 0 8px ${color}44`,
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
      }}
    >
      {score >= 0 ? "+" : ""}{score} {label}
    </div>
  );
}
