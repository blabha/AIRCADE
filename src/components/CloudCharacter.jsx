import React from "react";

/**
 * CloudCharacter — pixel-art cloud mascot.
 *
 * Props
 *   mood      : 'neutral' | 'happy' | 'worried' | 'alarmed' | 'sad' | 'celebrating'
 *   message   : string | null   → shows a speech bubble when set
 *   size      : 'sm' | 'md' | 'lg'
 *   animate   : 'float' | 'shake' | 'bounce' | null
 */

const PS = 8; // base pixel size in px

// ── Cloud body pixel coordinates [col, row] (grid 10 × 8) ──────────────────
const BODY = [
  [3,0],[4,0],[5,0],
  [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],
  [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],
  [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],
  [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],
  [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],
  [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],
];

// Shadow row (slightly darker) at bottom
const SHADOW = [
  [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],
];

// ── Face definitions per mood ───────────────────────────────────────────────
const FACES = {
  neutral: {
    eyes:  [[2,4],[3,4],[6,4],[7,4]],
    mouth: [[3,6],[4,6],[5,6],[6,6]],
    brows: [],
    cheeks: [],
    mouthColor: '#1a1a2e',
    eyeColor:   '#1a1a2e',
  },
  happy: {
    eyes:  [[2,4],[3,4],[6,4],[7,4]],
    mouth: [[2,6],[3,5],[4,5],[5,5],[6,5],[7,6],[3,6],[6,6]],
    brows: [],
    cheeks: [[1,5],[8,5]],
    mouthColor: '#1a1a2e',
    eyeColor:   '#1a1a2e',
    cheekColor: '#FF99BB',
  },
  worried: {
    eyes:  [[2,4],[3,4],[6,4],[7,4]],
    mouth: [[3,6],[4,6],[5,6],[6,6]],
    brows: [[2,3],[3,2],[7,2],[8,3]],   // \ and / brows
    cheeks: [],
    mouthColor: '#1a1a2e',
    eyeColor:   '#1a1a2e',
    browColor:  '#1a1a2e',
  },
  alarmed: {
    eyes:  [[2,3],[3,3],[2,4],[3,4],[6,3],[7,3],[6,4],[7,4]],
    mouth: [[3,6],[4,6],[5,6],[6,6],[4,7],[5,7]],
    brows: [[1,2],[4,2],[6,2],[9,2]],
    cheeks: [],
    mouthColor: '#1a1a2e',
    eyeColor:   '#1a1a2e',
    browColor:  '#1a1a2e',
  },
  sad: {
    eyes:  [[2,4],[3,4],[6,4],[7,4]],
    mouth: [[2,6],[3,7],[4,7],[5,7],[6,7],[7,6]],
    brows: [[3,2],[2,3],[7,2],[8,3]],   // / and \ sad brows
    cheeks: [],
    mouthColor: '#1a1a2e',
    eyeColor:   '#1a1a2e',
    browColor:  '#1a1a2e',
  },
  celebrating: {
    eyes:  [[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]],  // squinting line eyes
    mouth: [[2,6],[3,5],[4,5],[5,5],[6,5],[7,6],[3,6],[4,6],[5,6],[6,6]],
    brows: [],
    cheeks: [[1,4],[1,5],[8,4],[8,5]],
    mouthColor: '#1a1a2e',
    eyeColor:   '#1a1a2e',
    cheekColor: '#FF66AA',
  },
};

// ── Tear drop for sad mood ──────────────────────────────────────────────────
const TEARS = {
  sad:     [[2,5],[6,5]],
  alarmed: [],
};

// ── Main component ──────────────────────────────────────────────────────────
export default function CloudCharacter({
  mood = 'neutral',
  message = null,
  size = 'md',
  animate = 'float',
  flip = false,
}) {
  const scale = size === 'sm' ? 0.65 : size === 'lg' ? 1.5 : 1;
  const ps = PS * scale;   // scaled pixel size
  const w  = ps * 10;
  const h  = ps * 8;

  const face = FACES[mood] || FACES.neutral;

  // Body color changes slightly per mood
  const bodyColor = {
    neutral:     '#D8EFFF',
    happy:       '#E8F8E8',
    worried:     '#FFF8D8',
    alarmed:     '#FFE8E8',
    sad:         '#D8E8FF',
    celebrating: '#FFFBE8',
  }[mood] || '#D8EFFF';

  const shadowColor = '#A8C8E8';

  const animClass =
    animate === 'float'  ? 'cloud-float'  :
    animate === 'shake'  ? 'cloud-shake'  :
    animate === 'bounce' ? 'cloud-bounce' : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(6 * scale) }}>

      {/* Speech bubble */}
      {message && <SpeechBubble text={message} scale={scale} mood={mood} />}

      {/* Cloud body */}
      <div
        className={animClass}
        style={{
          position: 'relative',
          width:  Math.round(w),
          height: Math.round(h),
          imageRendering: 'pixelated',
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        {/* Body pixels */}
        {BODY.map(([col, row], i) => {
          const isShadow = SHADOW.some(([sc, sr]) => sc === col && sr === row);
          return (
            <div
              key={`b${i}`}
              style={{
                position: 'absolute',
                left:   Math.round(col * ps),
                top:    Math.round(row * ps),
                width:  Math.round(ps),
                height: Math.round(ps),
                background: isShadow ? shadowColor : bodyColor,
              }}
            />
          );
        })}

        {/* Eye pixels */}
        {face.eyes.map(([col, row], i) => (
          <div
            key={`e${i}`}
            style={{
              position: 'absolute',
              left:   Math.round(col * ps),
              top:    Math.round(row * ps),
              width:  Math.round(ps),
              height: Math.round(ps),
              background: face.eyeColor,
              zIndex: 2,
            }}
          />
        ))}

        {/* Brow pixels */}
        {(face.brows || []).map(([col, row], i) => (
          <div
            key={`br${i}`}
            style={{
              position: 'absolute',
              left:   Math.round(col * ps),
              top:    Math.round(row * ps),
              width:  Math.round(ps),
              height: Math.round(ps),
              background: face.browColor || '#1a1a2e',
              zIndex: 2,
            }}
          />
        ))}

        {/* Mouth pixels */}
        {face.mouth.map(([col, row], i) => (
          <div
            key={`m${i}`}
            style={{
              position: 'absolute',
              left:   Math.round(col * ps),
              top:    Math.round(row * ps),
              width:  Math.round(ps),
              height: Math.round(ps),
              background: face.mouthColor,
              zIndex: 2,
            }}
          />
        ))}

        {/* Cheek pixels */}
        {(face.cheeks || []).map(([col, row], i) => (
          <div
            key={`ch${i}`}
            style={{
              position: 'absolute',
              left:   Math.round(col * ps),
              top:    Math.round(row * ps),
              width:  Math.round(ps),
              height: Math.round(ps),
              background: face.cheekColor || '#FF99BB',
              zIndex: 2,
            }}
          />
        ))}

        {/* Tear drops for sad / alarmed */}
        {(TEARS[mood] || []).map(([col, row], i) => (
          <div
            key={`t${i}`}
            style={{
              position: 'absolute',
              left:   Math.round(col * ps),
              top:    Math.round(row * ps),
              width:  Math.round(ps),
              height: Math.round(ps * 2),
              background: '#00AAFF',
              zIndex: 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Speech bubble ────────────────────────────────────────────────────────────
function SpeechBubble({ text, scale, mood }) {
  const bubbleColor =
    mood === 'alarmed' ? '#0099FF' :
    mood === 'sad'     ? '#0099FF' :
    mood === 'happy' || mood === 'celebrating' ? '#39FF14' :
    mood === 'worried' ? '#FF00FF' : '#ffffff';

  const textColor =
    mood === 'alarmed' || mood === 'happy' || mood === 'celebrating' ? '#000' :
    '#000';

  return (
    <div style={{ position: 'relative', maxWidth: Math.round(180 * scale) }}>
      {/* Bubble body */}
      <div
        style={{
          background: bubbleColor,
          border: `${Math.round(3 * scale)}px solid #000`,
          padding: `${Math.round(6 * scale)}px ${Math.round(10 * scale)}px`,
          fontFamily: "'Press Start 2P', cursive",
          fontSize: `${Math.round(7 * scale) / 16}rem`,
          color: textColor,
          lineHeight: 1.7,
          textAlign: 'center',
          imageRendering: 'pixelated',
          boxShadow: `${Math.round(3 * scale)}px ${Math.round(3 * scale)}px 0 #000`,
        }}
      >
        {text}
      </div>
      {/* Tail pointing down */}
      <div style={{
        width: 0, height: 0,
        borderLeft:  `${Math.round(8 * scale)}px solid transparent`,
        borderRight: `${Math.round(8 * scale)}px solid transparent`,
        borderTop:   `${Math.round(10 * scale)}px solid #000`,
        margin: '0 auto',
      }} />
    </div>
  );
}
