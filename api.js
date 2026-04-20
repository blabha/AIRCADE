/* ═══════════════════════════════════════════
   A(I)RCADE — Mock AI Generator
   Runs fully offline / as a local .html file.
   No API key or server needed.
═══════════════════════════════════════════ */

// For image prompts, the value is the path to the pre-generated image file.
// Place your generated images in the assets/ folder.
const MOCK_RESPONSES = {
  'A cat astronaut on Mars': 'assets/cat-astronaut.jpg',

  'Birthday poem for my friend turning 30': `Thirty candles shining bright,
A milestone reached, what a sight!
Three decades of laughter, love, and cheer,
Here's to your very best year.

You've grown so wise, you've grown so strong,
Life's adventures push you along.
May this birthday bring you joy,
Like a kid with a favourite toy!

Thirty looks amazing on you,
Here's to dreams that will come true.
Cheers to memories we'll create,
Happy birthday — you're first-rate! 🎉`,

  'Design ideas for a modern bakery logo with a croissant': 'assets/bakery-logo.jpg',

  'How to make tiramisu step by step': `🍰 CLASSIC TIRAMISU RECIPE

Ingredients:
• 6 egg yolks
• ¾ cup sugar
• 1⅓ cups mascarpone cheese
• 2 cups heavy cream
• 2 cups strong espresso, cooled
• 3 tbsp coffee liqueur (optional)
• 24–30 ladyfinger biscuits
• Cocoa powder for dusting

Instructions:
1. Whisk egg yolks and sugar until thick and pale yellow
2. Gently fold in mascarpone cheese until smooth
3. In a separate bowl, whip heavy cream to stiff peaks
4. Fold whipped cream into the mascarpone mixture
5. Mix espresso and liqueur in a shallow dish
6. Quickly dip each ladyfinger in coffee (don't soak!)
7. Arrange a layer of dipped biscuits in a 9×13 dish
8. Spread half the cream mixture over the biscuits
9. Repeat: another layer of biscuits, then remaining cream
10. Cover and refrigerate at least 4 hours (overnight is best!)
11. Dust generously with cocoa powder before serving

Serves 8–10 people 👨‍🍳
Tip: The longer it sits, the better it tastes — make it a day ahead if you can!`,

  'Plan a dream beach vacation for two weeks': `🏝️ YOUR DREAM BEACH ESCAPE

THE DESTINATION:
Picture yourself on a pristine Caribbean island where powder-white sand meets crystal-clear turquoise water. Palm trees sway gently in the warm breeze, and the only sounds are waves lapping at the shore and tropical birds singing in the morning.

YOUR ACCOMMODATION:
A private beachfront bungalow with a hammock strung between two palms, just steps from the water. Your terrace overlooks the ocean — perfect for sunrise coffee and sunset cocktails.

DAILY RHYTHM:
Wake naturally with the sun. Spend mornings snorkelling among colourful coral reefs, swimming with sea turtles, and discovering tropical fish in every colour imaginable. Afternoons are for reading in your hammock, napping under an umbrella, or exploring hidden coves by kayak.

THE EXPERIENCE:
No schedule. No alarm clocks. Fresh seafood dinners at beachside restaurants with your toes in the sand. Spectacular sunsets that paint the sky orange, pink, and purple every evening. Day trips to secret beaches accessible only by boat. Bonfires under the stars. ✨

You return home rested, sun-kissed, and already planning your next visit.`
};

const GENERIC_RESPONSE = `Here's a response to your prompt:

This is a demo version of A(I)RCADE running without a live AI connection.

In the full version, Claude AI would generate a real, personalised answer to your exact question right here — whether that's a poem, a recipe, a plan, or a creative description.

The environmental footprint shown below is real data: it represents the actual cost of running an AI query like this one. Even asking a simple question uses water for cooling data centres, electricity to power thousands of processors, and produces a small amount of CO₂.

The more we understand our digital footprint, the smarter choices we can make. That's what A(I)RCADE is all about! 🌱`;

async function generateContent(prompt) {
  // Brief theatrical delay so the loading screen registers
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Return the matching pre-generated response, or the generic fallback
  const key = Object.keys(MOCK_RESPONSES).find(k =>
    prompt.toLowerCase().includes(k.toLowerCase().split(' ').slice(0, 4).join(' ').toLowerCase())
  );

  return MOCK_RESPONSES[key] || GENERIC_RESPONSE;
}
