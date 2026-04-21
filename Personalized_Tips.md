# Personalized Tips by Question

Tips shown on the "Go Greener" screen are selected based on the answer with the highest AI impact from the user's session.

## Answer Type H — High AI Impact

> Shown when the user chose the heaviest AI use option

**Scenario: homework help**
Tip: AI is a great explainer but a poor substitute. Next time, struggle with the problem for 5 minutes first — your brain will actually remember the answer.

**Scenario: learning to read / creative storytelling / writing**
Tip: Stories written by you carry your voice. Use AI for a spark of inspiration, then close the tab and write it yourself.

**Scenario: image generation / drawing and art / creating digital art**
Tip: Every image you generate costs water and electricity. Try sketching your idea first — you might love what comes out.

**Scenario: research projects / science projects**
Tip: AI summaries can miss nuance. Use it to find starting points, then dig into the sources yourself.

**Scenario: coding / building websites**
Tip: AI-generated code often has hidden bugs. Write the logic yourself and use AI only to debug or explain concepts.

**General (any scenario)**
Tip: You picked the high-impact option this round. Next time, try the "do one step yourself first" rule — it reduces AI load and often produces better results.

---

## Answer Type B — Balanced

> Shown when the user chose the middle-ground option

**General (any scenario)**
Tip: Good balance! You're on the right track. Next session, challenge yourself to take one more task fully offline — you might be surprised what you can do without AI.

---

## Answer Type L — Low Impact

> Shown when the user chose the most sustainable option

**General (any scenario)**
Tip: Great choice — you kept AI use minimal and intentional. Share this habit with someone who might not have considered the footprint of their prompts.

---

## Implementation Notes

- The tip displayed is based on the worst-impact answer in the session (`type === 'H'` preferred, fallback to last answer)
- Tip text is shown in a highlighted box above the general tips grid
- Text is generated dynamically in `script.js` using the `category` (scenario) and `type` fields from `state.ethicsAnswers`
