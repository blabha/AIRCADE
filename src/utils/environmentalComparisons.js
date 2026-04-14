/**
 * environmentalComparisons.js
 * Converts raw environmental numbers into human-scale analogies.
 *
 * References used:
 *   Water     — standard household measures
 *   CO₂       — average tree absorbs ~22 kg/year ≈ 0.6 g/hour ≈ 10 mg/min
 *               average car emits ~120 g CO₂/km = 0.12 g/m
 *   Energy    — smartphone full charge ≈ 8 Wh
 *               LED bulb (10 W) = 10 Wh/hr
 *               EV average consumption ≈ 180 Wh/km
 */

// ── Water ─────────────────────────────────────────────────────────────────────
export function waterToHuman(ml) {
  if (ml <= 0)    return { label: "Zero — no water used", icon: "💧" };
  if (ml < 2)     return { label: `${ml.toFixed(1)} ml — barely a drop`, icon: "💧" };
  if (ml < 15)    return { label: `${ml.toFixed(1)} ml — a sip of water`, icon: "💧" };
  if (ml < 60)    return { label: `${Math.round(ml)} ml ≈ a shot glass`, icon: "🥃" };
  if (ml < 150)   return { label: `${Math.round(ml)} ml ≈ half a teacup`, icon: "🍵" };
  if (ml < 280)   return { label: `${Math.round(ml)} ml ≈ a full glass of water`, icon: "🥛" };
  if (ml < 600)   return { label: `${Math.round(ml)} ml ≈ half a water bottle`, icon: "🍶" };
  if (ml < 1100)  return { label: `${(ml / 1000).toFixed(2)} L ≈ a full water bottle`, icon: "🧴" };
  return { label: `${(ml / 1000).toFixed(1)} L ≈ ${Math.round(ml / 250)} glasses of water`, icon: "🪣" };
}

// ── CO₂ ──────────────────────────────────────────────────────────────────────
export function co2ToHuman(g) {
  if (g <= 0)    return { label: "Zero — no emissions", icon: "🌱" };
  if (g < 0.01)  return { label: `${(g * 1000).toFixed(2)} mg — less than one breath`, icon: "😮‍💨" };
  if (g < 0.1)   return { label: `${g.toFixed(3)} g — a tree absorbs this in seconds`, icon: "🌿" };
  if (g < 1)     return { label: `${g.toFixed(2)} g — a tree absorbs this in ${Math.round(g / 0.01)} min`, icon: "🌿" };
  if (g < 5)     return { label: `${g.toFixed(2)} g — like driving ${Math.round(g / 0.12)} m by car`, icon: "🚗" };
  if (g < 20)    return { label: `${g.toFixed(1)} g — a tree needs ${Math.round(g / 0.6)} hrs to absorb this`, icon: "🌳" };
  if (g < 60)    return { label: `${g.toFixed(1)} g — like driving ${(g / 120).toFixed(2)} km by car`, icon: "🚗" };
  return { label: `${g.toFixed(1)} g — ${(g / 60).toFixed(1)} full days of tree-work to offset`, icon: "🌲" };
}

// ── Energy ────────────────────────────────────────────────────────────────────
export function energyToHuman(wh) {
  if (wh <= 0)     return { label: "Zero — no energy used", icon: "⚡" };
  if (wh < 0.001)  return { label: `${(wh * 1e6).toFixed(0)} μWh — a tiny LED flicker`, icon: "✨" };
  if (wh < 0.01)   return { label: `charges your phone by ${(wh / 8 * 100).toFixed(3)}%`, icon: "📱" };
  if (wh < 0.1)    return { label: `charges your phone by ${(wh / 8 * 100).toFixed(2)}%`, icon: "📱" };
  if (wh < 1)      return { label: `charges your phone by ${(wh / 8 * 100).toFixed(1)}%`, icon: "📱" };
  if (wh < 8)      return { label: `${Math.round(wh / 8 * 100)}% of a full phone charge`, icon: "🔋" };
  if (wh < 20)     return { label: `≈ a full phone charge (${(wh / 8).toFixed(1)}×)`, icon: "🔋" };
  if (wh < 100)    return { label: `runs an LED bulb for ${(wh / 10).toFixed(1)} hours`, icon: "💡" };
  if (wh < 500)    return { label: `drives an EV for ${Math.round(wh / 180 * 1000)} m`, icon: "🚗" };
  return { label: `drives an EV for ${(wh / 180).toFixed(2)} km`, icon: "🚗" };
}

// ── Totals summary object ─────────────────────────────────────────────────────
export function buildComparisons(energyWh, waterMl, co2g) {
  return {
    energy: energyToHuman(energyWh),
    water:  waterToHuman(waterMl),
    co2:    co2ToHuman(co2g),
  };
}
