import React from "react";

/**
 * CloudCharacter — pixel-art cloud mascot "Nimbus".
 *
 * Props
 *   mood    : 'neutral' | 'happy' | 'worried' | 'alarmed' | 'sad' | 'celebrating'
 *   message : string | null   → speech bubble when set
 *   size    : 'sm' | 'md' | 'lg'
 *   animate : 'float' | 'shake' | 'bounce' | null
 *   flip    : boolean — mirror horizontally
 */

const PS = 7; // base pixel size in px (scaled per size prop)

// ── Cloud body — 14 × 12 grid ─────────────────────────────────────────────
// Wider, rounder shape with a small physical tail at the bottom-centre
const BODY = [
  // top bumps
  [4,0],[5,0],[6,0],[7,0],[8,0],[9,0],
  [2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],
  // main body
  [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],
  [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],
  [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],
  [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],
  [0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],
  // bottom edge
  [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],
  // physical tail — wispy appendage bottom-centre
  [5,9],[6,9],[7,9],[8,9],
  [6,10],[7,10],
  [6,11],
];

// Shadow pixels (darker shade at bottom edge)
const SHADOW_ROWS = new Set([8]);

// ── Face definitions per mood ─────────────────────────────────────────────
// Eyes: 2×2 blocks at cols 2-3 and 10-11, rows 4-5
const EYES_NORMAL  = [[2,4],[3,4],[2,5],[3,5],[10,4],[11,4],[10,5],[11,5]];
const EYES_WIDE    = [[1,3],[2,3],[3,3],[4,3],[1,4],[2,4],[3,4],[4,4],[9,3],[10,3],[11,3],[12,3],[9,4],[10,4],[11,4],[12,4]];
const EYES_SQUINT  = [[2,5],[3,5],[4,5],[9,5],[10,5],[11,5]];

const FACES = {
  neutral: {
    eyes:      EYES_NORMAL,
    mouth:     [[5,7],[6,7],[7,7],[8,7]],
    brows:     [],
    cheeks:    [],
    eyeColor:  "#1a1a2e",
    mouthColor:"#1a1a2e",
  },
  happy: {
    eyes:      EYES_NORMAL,
    // smile: corners at row 6 (higher on screen), centre at row 7 (lower) → U shape = smile
    mouth:     [[3,6],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,6]],
    brows:     [],
    cheeks:    [[1,6],[2,6],[11,6],[12,6]],
    eyeColor:  "#1a1a2e",
    mouthColor:"#1a1a2e",
    cheekColor:"#FF99BB",
  },
  worried: {
    eyes:      EYES_NORMAL,
    mouth:     [[5,7],[6,7],[7,7],[8,7]],
    brows:     [[2,3],[3,2],[10,2],[11,3]],
    cheeks:    [],
    eyeColor:  "#1a1a2e",
    mouthColor:"#1a1a2e",
    browColor: "#1a1a2e",
  },
  alarmed: {
    eyes:      EYES_WIDE,
    // open O-mouth
    mouth:     [[5,6],[6,6],[7,6],[8,6],[4,7],[9,7],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8]],
    brows:     [[1,2],[4,2],[9,2],[12,2]],
    cheeks:    [],
    eyeColor:  "#1a1a2e",
    mouthColor:"#1a1a2e",
    browColor: "#1a1a2e",
  },
  sad: {
    eyes:      EYES_NORMAL,
    // frown: corners at row 7 (lower on screen), centre at row 6 (higher) → inverted U = frown
    mouth:     [[3,7],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,7]],
    brows:     [[3,2],[2,3],[10,2],[11,3]],
    cheeks:    [],
    eyeColor:  "#1a1a2e",
    mouthColor:"#1a1a2e",
    browColor: "#1a1a2e",
  },
  celebrating: {
    eyes:      EYES_SQUINT,
    // big smile: wide corners at row 6, deep centre at row 7
    mouth:     [[2,6],[3,6],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,6],[11,6]],
    brows:     [],
    cheeks:    [[1,5],[2,5],[11,5],[12,5],[1,6],[2,6],[11,6],[12,6]],
    eyeColor:  "#1a1a2e",
    mouthColor:"#1a1a2e",
    cheekColor:"#FF66AA",
  },
};

const TEARS = {
  sad:     [[2,6],[10,6]],
  alarmed: [],
};

// Body colour per mood
const BODY_COLORS = {
  neutral:     "#D8EFFF",
  happy:       "#E4F8E4",
  worried:     "#FFF8D0",
  alarmed:     "#FFE8E8",
  sad:         "#D0E4FF",
  celebrating: "#FFFBE0",
};

// ── Component ─────────────────────────────────────────────────────────────
export default function CloudCharacter({
  mood = "neutral",
  message = null,
  size = "md",
  animate = "float",
  flip = false,
}) {
  const scale = size === "sm" ? 0.6 : size === "lg" ? 1.4 : 1;
  const ps = PS * scale;
  const w  = ps * 14;
  const h  = ps * 12;

  const face      = FACES[mood] || FACES.neutral;
  const bodyColor = BODY_COLORS[mood] || BODY_COLORS.neutral;
  const shadowColor = "#A0C8E8";

  const animClass =
    animate === "float"  ? "cloud-float"  :
    animate === "shake"  ? "cloud-shake"  :
    animate === "bounce" ? "cloud-bounce" : "";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: Math.round(5 * scale) }}>

      {/* Speech bubble */}
      {message && <SpeechBubble text={message} scale={scale} mood={mood} />}

      {/* Cloud body */}
      <div
        className={animClass}
        style={{
          position: "relative",
          width:  Math.round(w),
          height: Math.round(h),
          imageRendering: "pixelated",
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      >
        {/* Body pixels */}
        {BODY.map(([col, row], i) => {
          const isShadow = SHADOW_ROWS.has(row);
          return (
            <div
              key={`b${i}`}
              style={{
                position: "absolute",
                left:   Math.round(col * ps),
                top:    Math.round(row * ps),
                width:  Math.round(ps),
                height: Math.round(ps),
                background: isShadow ? shadowColor : bodyColor,
              }}
            />
          );
        })}

        {/* Eyes */}
        {face.eyes.map(([col, row], i) => (
          <div key={`e${i}`} style={{
            position: "absolute",
            left: Math.round(col * ps), top: Math.round(row * ps),
            width: Math.round(ps), height: Math.round(ps),
            background: face.eyeColor, zIndex: 2,
          }} />
        ))}

        {/* Brows */}
        {(face.brows || []).map(([col, row], i) => (
          <div key={`br${i}`} style={{
            position: "absolute",
            left: Math.round(col * ps), top: Math.round(row * ps),
            width: Math.round(ps), height: Math.round(ps),
            background: face.browColor || "#1a1a2e", zIndex: 2,
          }} />
        ))}

        {/* Mouth */}
        {face.mouth.map(([col, row], i) => (
          <div key={`m${i}`} style={{
            position: "absolute",
            left: Math.round(col * ps), top: Math.round(row * ps),
            width: Math.round(ps), height: Math.round(ps),
            background: face.mouthColor, zIndex: 2,
          }} />
        ))}

        {/* Cheeks */}
        {(face.cheeks || []).map(([col, row], i) => (
          <div key={`ch${i}`} style={{
            position: "absolute",
            left: Math.round(col * ps), top: Math.round(row * ps),
            width: Math.round(ps), height: Math.round(ps),
            background: face.cheekColor || "#FF99BB", zIndex: 2,
          }} />
        ))}

        {/* Tears */}
        {(TEARS[mood] || []).map(([col, row], i) => (
          <div key={`t${i}`} style={{
            position: "absolute",
            left:   Math.round(col * ps),
            top:    Math.round(row * ps),
            width:  Math.round(ps),
            height: Math.round(ps * 2),
            background: "#44AAFF", zIndex: 3,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Speech bubble ─────────────────────────────────────────────────────────
function SpeechBubble({ text, scale, mood }) {
  const bubbleColor =
    mood === "alarmed"                          ? "#0099FF" :
    mood === "sad"                              ? "#0099FF" :
    mood === "happy" || mood === "celebrating"  ? "#39FF14" :
    mood === "worried"                          ? "#FF00FF" : "#ffffff";

  return (
    <div style={{ position: "relative", maxWidth: Math.round(190 * scale) }}>
      <div style={{
        background: bubbleColor,
        border: `${Math.round(3 * scale)}px solid #000`,
        padding: `${Math.round(6 * scale)}px ${Math.round(10 * scale)}px`,
        fontFamily: "'Press Start 2P', cursive",
        fontSize: `${Math.round(7 * scale) / 16}rem`,
        color: "#000",
        lineHeight: 1.7,
        textAlign: "center",
        imageRendering: "pixelated",
        boxShadow: `${Math.round(3 * scale)}px ${Math.round(3 * scale)}px 0 #000`,
        whiteSpace: "pre-line",
      }}>
        {text}
      </div>
      {/* Physical tail pointing down toward the cloud */}
      <div style={{
        width: 0, height: 0,
        borderLeft:  `${Math.round(7 * scale)}px solid transparent`,
        borderRight: `${Math.round(7 * scale)}px solid transparent`,
        borderTop:   `${Math.round(9 * scale)}px solid #000`,
        margin: "0 auto",
      }} />
      <div style={{
        width: 0, height: 0,
        borderLeft:  `${Math.round(5 * scale)}px solid transparent`,
        borderRight: `${Math.round(5 * scale)}px solid transparent`,
        borderTop:   `${Math.round(7 * scale)}px solid ${bubbleColor}`,
        margin: `${-Math.round(9 * scale + 1)}px auto 0`,
      }} />
    </div>
  );
}
