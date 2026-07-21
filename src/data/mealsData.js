// ─── MEDITERRANEAN ───────────────────────────────────────────────────────────
const mediterranean = [
  {
    name: "Grilled Salmon with Roasted Broccoli",
    category: "Dinner", calories: 380, prep: 25,
    description: "Omega-3 rich salmon with fibre-packed broccoli. Great for blood sugar stability.",
    tags: ["high protein", "low carb", "heart healthy"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    glycemic: "Low", giScore: 12,
    ingredients: ["2 salmon fillets (150g each)", "2 cups broccoli florets", "2 tbsp olive oil", "3 garlic cloves, minced", "Juice of 1 lemon", "Salt, pepper, dried oregano"],
    steps: ["Preheat oven to 200°C. Line a baking tray.", "Toss broccoli in 1 tbsp olive oil, salt, pepper. Spread on tray.", "Place salmon on other half. Drizzle with remaining oil, lemon, garlic.", "Season with salt, pepper, oregano.", "Roast 15–18 min until salmon flakes. Serve with lemon wedge."],
    diabetesTip: "Salmon's omega-3s improve insulin sensitivity. Zero-carb profile means no blood sugar spike."
  },
  {
    name: "Greek Yogurt Berry Bowl",
    category: "Breakfast", calories: 210, prep: 5,
    description: "High-protein Greek yogurt with antioxidant-rich berries and a sprinkle of chia seeds.",
    tags: ["high protein", "low sugar", "quick"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
    glycemic: "Low", giScore: 18,
    ingredients: ["200g plain Greek yogurt", "½ cup mixed berries", "1 tbsp chia seeds", "1 tbsp walnuts", "½ tsp cinnamon"],
    steps: ["Spoon yogurt into a bowl.", "Scatter berries over top.", "Sprinkle chia seeds and walnuts.", "Dust with cinnamon.", "Eat immediately."],
    diabetesTip: "Berries are among the lowest-GI fruits. Chia seeds slow digestion, preventing glucose spikes."
  },
  {
    name: "Quinoa Salad with Chickpeas",
    category: "Lunch", calories: 310, prep: 15,
    description: "Complete protein quinoa with chickpeas, cucumber, and lemon dressing. No blood sugar spike.",
    tags: ["complete protein", "plant-based", "meal prep"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    glycemic: "Low", giScore: 35,
    ingredients: ["½ cup quinoa", "1 can chickpeas", "1 cucumber, diced", "1 cup cherry tomatoes", "3 tbsp olive oil", "Juice of 1 lemon", "Fresh parsley"],
    steps: ["Cook quinoa in broth, cool 5 min.", "Combine quinoa, chickpeas, cucumber, tomatoes.", "Whisk olive oil and lemon for dressing.", "Toss and fold in parsley."],
    diabetesTip: "Quinoa GI 53 + chickpea resistant starch = improved insulin sensitivity."
  },
  {
    name: "Baked Cod with Lemon & Herbs",
    category: "Dinner", calories: 220, prep: 20,
    description: "Light, lean white fish baked with herbs and lemon — virtually zero carbs, pure protein.",
    tags: ["low carb", "lean protein", "heart healthy"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    glycemic: "Low", giScore: 5,
    ingredients: ["2 cod fillets", "Juice of 1 lemon", "Zest of ½ lemon", "3 garlic cloves, sliced", "2 tbsp olive oil", "Fresh parsley & dill"],
    steps: ["Preheat oven to 190°C.", "Season cod with salt, pepper, paprika.", "Mix olive oil, lemon, garlic; pour over fish.", "Bake 15–18 min.", "Scatter herbs and serve."],
    diabetesTip: "Cod is virtually zero-carb. The entire meal has negligible glycaemic impact."
  },
  {
    name: "Tzatziki with Veggie Sticks",
    category: "Snack", calories: 110, prep: 10,
    description: "Creamy cucumber-dill Greek yogurt dip with crisp vegetable dippers — a zero-GI snack.",
    tags: ["low carb", "probiotic", "quick"], cuisine: "Greek", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80",
    glycemic: "Low", giScore: 12,
    ingredients: ["1 cup plain Greek yogurt", "½ cucumber, grated & squeezed", "1 garlic clove, minced", "1 tbsp fresh dill", "1 tbsp olive oil", "Cucumber, celery, bell pepper to dip"],
    steps: ["Grate cucumber, squeeze out all water.", "Mix yogurt, cucumber, garlic, dill, olive oil.", "Season with salt.", "Serve cold with veggie sticks."],
    diabetesTip: "Greek yogurt protein slows gastric emptying. Non-starchy veggie dippers have near-zero GI."
  },
  {
    name: "Spinach & Feta Omelet",
    category: "Breakfast", calories: 220, prep: 10,
    description: "Classic Mediterranean omelet — protein-rich eggs with wilted spinach and tangy feta. Zero blood sugar impact.",
    tags: ["high protein", "low carb", "Mediterranean"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80",
    glycemic: "Low", giScore: 8,
    ingredients: ["3 large eggs", "1 cup fresh spinach", "¼ cup crumbled feta", "1 tbsp olive oil", "Salt, pepper, oregano"],
    steps: ["Whisk eggs with salt and oregano.", "Sauté spinach in olive oil 1 min, remove.", "Pour eggs into pan, let set 1 min.", "Scatter spinach and feta on one half.", "Fold and serve."],
    diabetesTip: "Eggs have essentially zero GI. Protein + fat combination prevents a glucose spike for 3–4 hours."
  },
  {
    name: "Mediterranean Chopped Jar Salad",
    category: "Lunch", calories: 310, prep: 15,
    description: "Layers of chickpeas, olives, and feta in a jar — ADA-recommended meal prep lunch.",
    tags: ["meal prep", "high fibre", "plant-based"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    glycemic: "Low", giScore: 28,
    ingredients: ["1 can chickpeas", "1 cucumber, diced", "1 cup cherry tomatoes", "½ cup kalamata olives", "¼ cup feta", "2 cups romaine", "3 tbsp olive oil", "2 tbsp red wine vinegar"],
    steps: ["Whisk oil, vinegar, oregano, salt.", "Layer: chickpeas, cucumber, tomatoes, olives, feta.", "Top with romaine.", "Dress just before eating."],
    diabetesTip: "Chickpeas GI 28. Vinegar in dressing further lowers glycaemic response."
  },
  {
    name: "Lamb Chops with Spring Vegetables",
    category: "Dinner", calories: 420, prep: 30,
    description: "Tender grilled lamb chops with asparagus, peas, and baby potatoes — rich in zinc for insulin synthesis.",
    tags: ["lean protein", "grilled", "low carb"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    glycemic: "Low", giScore: 12,
    ingredients: ["4 lamb loin chops", "1 cup asparagus", "1 cup green peas", "1 cup baby potatoes, halved", "2 tbsp olive oil", "Rosemary, garlic, lemon"],
    steps: ["Marinate lamb in olive oil, garlic, rosemary 20 min.", "Boil potatoes 10 min.", "Grill lamb 3–4 min per side.", "Sauté asparagus and peas 3 min.", "Plate and squeeze lemon."],
    diabetesTip: "Lamb zinc directly supports insulin synthesis. Small potato portion keeps carb load moderate."
  },
  {
    name: "Artichoke, Spinach & White Bean Dip",
    category: "Snack", calories: 175, prep: 20,
    description: "Creamy artichoke, spinach, and white bean dip — Mayo Clinic diabetes plan, loaded with resistant starch.",
    tags: ["high fibre", "plant protein", "snack"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low", giScore: 31,
    ingredients: ["1 can white beans", "1 can artichoke hearts", "2 cups spinach", "2 garlic cloves", "2 tbsp olive oil", "Juice of 1 lemon", "Chilli flakes"],
    steps: ["Sauté spinach 2 min.", "Blend beans, artichokes, garlic, lemon, oil.", "Pulse in spinach.", "Season, drizzle with oil.", "Serve with whole-grain crackers or veggies."],
    diabetesTip: "White beans GI 31. Artichokes contain inulin — a prebiotic that improves insulin sensitivity."
  },
  {
    name: "Baba Ghanoush with Veggie Dippers",
    category: "Snack", calories: 160, prep: 40,
    description: "Smoky roasted eggplant dip from Mayo Clinic's diabetes meal plan — low-carb, high-fibre.",
    tags: ["low carb", "plant-based", "high fibre"], cuisine: "Middle Eastern", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80",
    glycemic: "Low", giScore: 15,
    ingredients: ["2 medium eggplants", "3 tbsp tahini", "2 garlic cloves", "Juice of 1 lemon", "1 tbsp olive oil", "½ tsp cumin"],
    steps: ["Roast whole eggplants 35–40 min at 220°C until collapsed.", "Peel and drain.", "Blend with tahini, garlic, lemon, cumin.", "Drizzle olive oil.", "Serve with cucumber and bell pepper."],
    diabetesTip: "Eggplant GI ~15 contains nasunin — protects cells from free radical damage linked to diabetes."
  },
  {
    name: "Lentil Soup with Dates & Spinach",
    category: "Dinner", calories: 280, prep: 35,
    description: "Rich lentil soup from ADA Food Hub — fibre-dense plant protein with a touch of natural sweetness.",
    tags: ["high fibre", "plant-based", "iron-rich"], cuisine: "Middle Eastern", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1562016776-c7786f4c2d80?w=800&q=80",
    glycemic: "Low", giScore: 30,
    ingredients: ["1 cup green lentils", "3 Medjool dates, chopped", "2 cups spinach", "1 onion", "Cumin, cinnamon", "4 cups vegetable broth", "Lemon"],
    steps: ["Sauté onion and garlic 5 min.", "Add cumin, cinnamon.", "Add lentils, dates, broth.", "Simmer 25 min.", "Stir in spinach 2 min. Finish with lemon."],
    diabetesTip: "Lentils GI 30. Fibre slows date sugar absorption — overall glycaemic response stays very low."
  },
  {
    name: "Chicken Shawarma Collard Wraps",
    category: "Lunch", calories: 320, prep: 25,
    description: "Shawarma-spiced chicken in collard green leaves — grain-free, low-carb Middle Eastern wrap.",
    tags: ["low carb", "high protein", "grain-free"], cuisine: "Middle Eastern", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80",
    glycemic: "Low", giScore: 14,
    ingredients: ["300g chicken breast, sliced", "4 collard green leaves", "Cumin, paprika, turmeric", "1 tbsp olive oil", "½ cup hummus", "Diced tomato, cucumber"],
    steps: ["Marinate chicken in spices and oil.", "Cook in skillet 4–5 min per side.", "Trim collard stems.", "Spread hummus, add chicken and veg.", "Roll tightly and serve."],
    diabetesTip: "Collard wraps vs. tortilla: virtually zero carbs. Hummus adds plant protein and fibre."
  },
];

// ─── SOUTH ASIAN ─────────────────────────────────────────────────────────────
const southAsian = [
  {
    name: "Lentil & Spinach Soup (Dal Palak)",
    category: "Lunch", calories: 290, prep: 30,
    description: "Protein and fibre-rich red lentils slow glucose absorption — a diabetes superfood meal.",
    tags: ["high fibre", "plant-based", "filling"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low", giScore: 29,
    ingredients: ["1 cup red lentils", "2 cups spinach", "1 onion", "3 garlic cloves", "1 tsp cumin", "1 tsp turmeric", "½ tsp garam masala", "4 cups vegetable stock"],
    steps: ["Sauté onion in olive oil 5 min.", "Add garlic, cumin, turmeric, garam masala. Stir 1 min.", "Add lentils and stock. Boil, simmer 20 min.", "Stir in spinach 2 min.", "Season and serve with lemon."],
    diabetesTip: "Lentils GI 29 — one of the lowest of any food. Soluble fibre forms a gel slowing glucose absorption."
  },
  {
    name: "Chana Masala (Chickpea Curry)",
    category: "Dinner", calories: 310, prep: 30,
    description: "Spiced chickpea curry from ADA Food Hub's India series — high fibre, plant protein, diabetes-friendly.",
    tags: ["plant-based", "high fibre", "vegan"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
    glycemic: "Low", giScore: 28,
    ingredients: ["2 cans chickpeas", "1 can diced tomatoes", "1 onion, diced", "3 garlic cloves", "1 tsp fresh ginger", "1 tsp cumin", "1 tsp coriander", "½ tsp turmeric", "Garam masala, cilantro"],
    steps: ["Sauté onion in oil 5 min.", "Add garlic, ginger, spices. Stir 1 min.", "Add tomatoes, simmer 10 min.", "Add chickpeas, simmer 15 min.", "Garnish with cilantro. Serve with cauliflower rice."],
    diabetesTip: "Chickpeas have GI 28 and are loaded with resistant starch. Turmeric's curcumin reduces insulin resistance."
  },
  {
    name: "Spinach & Sweet Potato Curry (Saag Aloo)",
    category: "Dinner", calories: 275, prep: 30,
    description: "Spiced Indian spinach dish with sweet potatoes replacing white potatoes — a healthful diabetes twist.",
    tags: ["vegan", "plant-based", "anti-inflammatory"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
    glycemic: "Low-Medium", giScore: 50,
    ingredients: ["3 cups fresh spinach", "1 large sweet potato, cubed", "1 onion", "3 garlic cloves", "1 tsp ginger", "1 tsp cumin", "1 tsp turmeric", "1 can diced tomatoes", "1 tbsp olive oil"],
    steps: ["Roast sweet potato 20 min at 200°C.", "Sauté onion, garlic, ginger in oil 5 min.", "Add spices, tomatoes. Simmer 5 min.", "Add spinach; cook until wilted.", "Fold in sweet potato. Serve."],
    diabetesTip: "Sweet potato GI 54 vs. white potato GI 82. Spinach adds magnesium that directly supports insulin function."
  },
  {
    name: "Moong Dal Cheela (Lentil Crepes)",
    category: "Breakfast", calories: 190, prep: 20,
    description: "Savory mung lentil crepes — a high-protein South Asian breakfast with virtually no blood sugar impact.",
    tags: ["high protein", "gluten-free", "quick"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    glycemic: "Low", giScore: 30,
    ingredients: ["1 cup yellow moong dal, soaked 4h", "½ cup water", "1 tsp cumin seeds", "1 green chilli, minced", "1 tsp ginger, grated", "Salt", "Cooking oil spray"],
    steps: ["Blend soaked dal with water to a smooth batter.", "Mix in cumin, chilli, ginger, salt.", "Heat non-stick pan, spray oil.", "Pour ladle of batter, spread thin.", "Cook 2–3 min per side until golden."],
    diabetesTip: "Moong dal GI 38. All protein and fibre — keeps blood sugar stable for hours. Great carb-counting breakfast."
  },
  {
    name: "Roasted Spiced Chickpeas",
    category: "Snack", calories: 140, prep: 25,
    description: "Crispy oven-roasted chickpeas with cumin and paprika — a crunchy, protein-rich diabetes snack.",
    tags: ["high protein", "high fibre", "crunchy"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80",
    glycemic: "Low", giScore: 28,
    ingredients: ["1 can chickpeas, drained & patted dry", "1 tbsp olive oil", "1 tsp cumin", "1 tsp smoked paprika", "½ tsp turmeric", "Salt"],
    steps: ["Preheat oven to 200°C.", "Toss dry chickpeas in oil and spices.", "Spread on lined baking tray.", "Roast 25–30 min until golden and crunchy.", "Cool completely before storing."],
    diabetesTip: "Roasted chickpeas are a perfect snack: 28 GI, 6g protein per serving, and satisfying crunch without refined carbs."
  },
  {
    name: "Raita Cucumber Bowl",
    category: "Snack", calories: 95, prep: 5,
    description: "Classic Indian yogurt and cucumber — cooling, probiotic-rich, and near-zero carbs.",
    tags: ["probiotic", "low carb", "cooling"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    glycemic: "Low", giScore: 14,
    ingredients: ["1 cup plain low-fat yogurt", "1 cucumber, grated", "1 tsp cumin powder", "Fresh mint", "Salt"],
    steps: ["Grate cucumber, squeeze dry.", "Mix yogurt, cucumber, cumin, mint, salt.", "Chill 10 min before serving."],
    diabetesTip: "Yogurt probiotics reduce gut inflammation tied to insulin resistance. Cucumber is virtually carb-free."
  },
];

// ─── EAST ASIAN ───────────────────────────────────────────────────────────────
const eastAsian = [
  {
    name: "Chicken & Vegetable Stir Fry",
    category: "Dinner", calories: 340, prep: 20,
    description: "Lean chicken with colourful vegetables in a light soy sauce — minimal carbs, maximum nutrients.",
    tags: ["lean protein", "low carb", "colourful"], cuisine: "Asian", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    glycemic: "Low", giScore: 20,
    ingredients: ["300g chicken breast, sliced", "Broccoli, bell pepper, snap peas", "2 garlic cloves", "1 tsp ginger", "2 tbsp low-sodium soy sauce", "1 tbsp sesame oil"],
    steps: ["Heat sesame oil in wok on high.", "Stir-fry chicken 4–5 min. Remove.", "Stir-fry vegetables 3 min.", "Add garlic, ginger.", "Return chicken, add soy sauce. Toss 1–2 min."],
    diabetesTip: "No rice = virtually carb-free. Ginger and garlic both lower blood sugar."
  },
  {
    name: "Soba Noodle Bowl with Edamame",
    category: "Lunch", calories: 330, prep: 15,
    description: "Buckwheat soba noodles with protein-rich edamame and sesame dressing — a Japanese diabetes staple.",
    tags: ["whole grain", "plant protein", "Japanese"], cuisine: "Japanese", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    glycemic: "Low-Medium", giScore: 46,
    ingredients: ["100g dried soba noodles", "1 cup edamame", "1 cucumber, julienned", "2 spring onions", "2 tbsp soy sauce", "1 tbsp rice vinegar", "1 tsp sesame oil", "Grated ginger"],
    steps: ["Cook soba 4–5 min. Rinse in cold water.", "Cook edamame 3 min.", "Whisk soy, vinegar, sesame oil, ginger.", "Toss noodles in dressing.", "Add cucumber, edamame, spring onions. Top with sesame seeds."],
    diabetesTip: "Buckwheat GI 46 contains D-chiro-inositol — clinically shown to improve insulin sensitivity."
  },
  {
    name: "Ginger-Marinated Portobello Mushrooms",
    category: "Dinner", calories: 145, prep: 30,
    description: "Meaty portobello mushrooms marinated in ginger and soy — satisfying plant-based dinner.",
    tags: ["plant-based", "low calorie", "anti-inflammatory"], cuisine: "Asian", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    glycemic: "Low", giScore: 10,
    ingredients: ["4 portobello caps", "2 tbsp soy sauce", "1 tbsp ginger, grated", "2 garlic cloves", "1 tbsp rice vinegar", "1 tbsp sesame oil", "1 tsp honey"],
    steps: ["Whisk marinade ingredients.", "Marinate mushrooms 20 min, flip once.", "Grill 5 min per side.", "Baste while grilling.", "Serve over cauliflower rice."],
    diabetesTip: "Portobello beta-glucans slow glucose absorption. Ginger further lowers blood sugar."
  },
  {
    name: "Miso Soup with Tofu & Seaweed",
    category: "Snack", calories: 80, prep: 5,
    description: "Classic Japanese miso soup — a warming, probiotic-rich low-calorie snack between meals.",
    tags: ["probiotic", "low calorie", "warming"], cuisine: "Japanese", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low", giScore: 8,
    ingredients: ["2 tsp white miso paste", "1.5 cups hot water", "50g silken tofu, cubed", "1 tbsp dried wakame seaweed", "1 spring onion, sliced"],
    steps: ["Dissolve miso in a little warm water (don't boil).", "Pour over hot water.", "Add tofu, rehydrated wakame.", "Top with spring onion."],
    diabetesTip: "Miso is fermented — probiotics reduce gut inflammation. Tofu adds protein with zero GI impact."
  },
  {
    name: "Korean Bibimbap with Cauliflower Rice",
    category: "Dinner", calories: 340, prep: 35,
    description: "Korean mixed bowl with sautéed vegetables, egg, gochujang, and cauliflower rice — low-carb twist.",
    tags: ["low carb", "colourful", "balanced"], cuisine: "Korean", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    glycemic: "Low", giScore: 18,
    ingredients: ["2 cups cauliflower rice", "1 cup spinach", "1 carrot, julienned", "1 cup bean sprouts", "1 egg", "1 tsp sesame oil", "1 tsp gochujang (or sriracha)", "Sesame seeds"],
    steps: ["Steam cauliflower rice 5 min.", "Sauté spinach, carrot, sprouts separately.", "Fry egg sunny-side up.", "Assemble bowl: cauliflower rice base, arrange veg.", "Top with egg, drizzle sesame oil, gochujang."],
    diabetesTip: "Cauliflower rice reduces carbs by 85% vs regular rice. Rich variety of vegetables provides antioxidants."
  },
  {
    name: "Edamame with Sea Salt",
    category: "Snack", calories: 120, prep: 5,
    description: "Steamed edamame — one of the most perfect diabetes snacks: complete plant protein, fibre, very low GI.",
    tags: ["high protein", "plant-based", "quick"], cuisine: "Japanese", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1599020792689-9fde458e7e3e?w=800&q=80",
    glycemic: "Low", giScore: 18,
    ingredients: ["1 cup frozen edamame in pods", "Sea salt to taste"],
    steps: ["Microwave edamame in damp paper towel 3 min or boil 3 min.", "Drain, sprinkle sea salt.", "Serve warm or cold."],
    diabetesTip: "Edamame GI 18 with 8g protein per cup. One of the most blood-sugar-friendly snacks on earth."
  },
  {
    name: "Chinese Steamed Fish with Ginger & Soy",
    category: "Dinner", calories: 220, prep: 20,
    description: "Delicately steamed white fish with ginger, scallion, and light soy — virtually zero carbs.",
    tags: ["high protein", "low carb", "steamed"], cuisine: "Chinese", ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    glycemic: "Low", giScore: 5,
    ingredients: ["2 white fish fillets (tilapia or cod)", "2 tbsp low-sodium soy sauce", "1 tbsp fresh ginger, julienned", "2 spring onions, sliced", "1 tsp sesame oil", "1 tsp rice vinegar"],
    steps: ["Place fish on steaming plate.", "Scatter ginger on top.", "Steam 8–10 min until fish flakes.", "Mix soy, vinegar; pour over fish.", "Top with spring onion, drizzle sesame oil."],
    diabetesTip: "Steaming preserves all nutrients without added fats. White fish is pure protein with no carbohydrate."
  },
];

// ─── SOUTHEAST ASIAN ─────────────────────────────────────────────────────────
const southeastAsian = [
  {
    name: "Munggo Beans (Filipino Mung Bean Stew)",
    category: "Dinner", calories: 260, prep: 40,
    description: "Traditional Filipino mung bean stew — high fibre, plant-based protein, diabetes-friendly.",
    tags: ["high fibre", "plant-based", "traditional"], cuisine: "Filipino", ethnicity: "Southeast Asian",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
    glycemic: "Low", giScore: 31,
    ingredients: ["1 cup dried mung beans", "100g tofu, cubed", "2 cups spinach or malunggay", "1 onion", "3 garlic cloves", "2 tomatoes", "4 cups broth", "Fish sauce or soy sauce"],
    steps: ["Rinse and soak mung beans 30 min.", "Sauté garlic, onion, tomatoes.", "Add tofu 3 min. Add broth and beans.", "Simmer 25–30 min until beans are creamy.", "Season; add greens last 2 min."],
    diabetesTip: "Mung beans GI 31. Fibre + protein = hours of sustained energy with minimal glucose impact."
  },
  {
    name: "Thai Larb (Spiced Minced Chicken Salad)",
    category: "Lunch", calories: 280, prep: 20,
    description: "Zesty Thai minced chicken salad with herbs, lime, and toasted rice — fragrant, low-carb.",
    tags: ["lean protein", "low carb", "Thai"], cuisine: "Thai", ethnicity: "Southeast Asian",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    glycemic: "Low", giScore: 16,
    ingredients: ["300g lean ground chicken", "2 tbsp fish sauce", "Juice of 2 limes", "1 tbsp toasted rice powder", "1 shallot, sliced", "Fresh mint, cilantro, Thai basil", "Chilli flakes", "Lettuce cups to serve"],
    steps: ["Dry-toast raw rice in pan 5 min until golden; grind coarsely.", "Cook chicken in pan, breaking up.", "Remove from heat; toss with fish sauce, lime, rice powder.", "Add herbs, shallot, chilli.", "Serve in lettuce cups."],
    diabetesTip: "Lean ground chicken = pure protein. Served in lettuce replaces rice — virtually zero added carbs."
  },
  {
    name: "Vietnamese Pho with Zucchini Noodles",
    category: "Dinner", calories: 245, prep: 30,
    description: "Aromatic Vietnamese bone broth with lean beef and zucchini noodles replacing rice noodles.",
    tags: ["low carb", "anti-inflammatory", "warming"], cuisine: "Vietnamese", ethnicity: "Southeast Asian",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    glycemic: "Low", giScore: 14,
    ingredients: ["1L beef bone broth", "200g lean beef, thinly sliced", "2 zucchini, spiralised", "Star anise, cloves, cinnamon (broth)", "Bean sprouts, basil, lime, chilli to serve"],
    steps: ["Simmer broth with star anise, cloves, cinnamon 20 min.", "Strain spices.", "Blanch zucchini noodles 1 min in hot broth.", "Arrange in bowl, add raw beef (broth cooks it).", "Pour hot broth over. Add toppings."],
    diabetesTip: "Zucchini noodles replace rice noodles (GI 72) with near-zero carbs. Bone broth supports gut health."
  },
  {
    name: "Indonesian Gado-Gado (Peanut Veg Salad)",
    category: "Lunch", calories: 310, prep: 20,
    description: "Indonesian blanched vegetable salad with creamy peanut dressing — plant-protein packed.",
    tags: ["plant-based", "vegan", "peanut"], cuisine: "Indonesian", ethnicity: "Southeast Asian",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    glycemic: "Low", giScore: 30,
    ingredients: ["2 cups cabbage, shredded", "1 cup bean sprouts", "2 boiled eggs", "½ cup edamame", "Peanut dressing: 2 tbsp peanut butter, lime juice, soy sauce, garlic, chilli"],
    steps: ["Blanch cabbage and bean sprouts 2 min.", "Whisk peanut dressing with warm water to loosen.", "Arrange veg and eggs on plate.", "Drizzle dressing generously."],
    diabetesTip: "Peanut butter's monounsaturated fats slow carb absorption. Eggs add complete protein — a perfect glycaemic balance."
  },
  {
    name: "Rice Paper Spring Rolls",
    category: "Snack", calories: 130, prep: 15,
    description: "Fresh Vietnamese spring rolls with shrimp, veg, and mint in rice paper — light and low-GI.",
    tags: ["light", "fresh", "high protein"], cuisine: "Vietnamese", ethnicity: "Southeast Asian",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80",
    glycemic: "Low", giScore: 40,
    ingredients: ["4 rice paper sheets", "100g cooked shrimp", "½ cup shredded lettuce", "¼ cup rice noodles (small portion)", "Fresh mint, cilantro, julienned carrot", "Dipping sauce: low-sodium soy + lime"],
    steps: ["Soak rice paper 10–15 sec in warm water.", "Lay flat; arrange shrimp, veg, noodles, herbs.", "Roll up tightly.", "Serve with soy-lime dipping sauce."],
    diabetesTip: "Rice paper rolls are low in calories and fat. Shrimp provides high protein with zero GI. Keep noodle portion small."
  },
];

// ─── LATIN AMERICAN ──────────────────────────────────────────────────────────
const latinAmerican = [
  {
    name: "Roasted Sweet Potato & Black Bean Bowl",
    category: "Lunch", calories: 350, prep: 35,
    description: "Sweet potato balanced by black bean fibre for steady glucose release.",
    tags: ["high fibre", "plant-based", "vegan"], cuisine: "Latin", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?w=800&q=80",
    glycemic: "Medium", giScore: 61,
    ingredients: ["1 medium sweet potato, cubed", "1 can black beans", "Cumin, smoked paprika", "Romaine lettuce", "½ avocado", "Salsa, lime"],
    steps: ["Roast sweet potato 25–30 min at 200°C.", "Warm black beans with cumin.", "Assemble: lettuce, sweet potato, beans.", "Top with avocado and salsa."],
    diabetesTip: "Sweet potato GI 54 + black bean GI 30 = balanced meal. Avocado fat slows glucose absorption further."
  },
  {
    name: "Flavorful Chicken Fajitas",
    category: "Dinner", calories: 355, prep: 30,
    description: "Sizzling marinated chicken with peppers and onions in whole-wheat wraps — Taste of Home top-10.",
    tags: ["high protein", "family favourite", "colourful"], cuisine: "Mexican", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    glycemic: "Low-Medium", giScore: 42,
    ingredients: ["500g chicken breast, sliced", "2 red bell peppers", "1 green pepper", "1 onion", "Lime, cumin, chilli powder", "Whole-wheat tortillas", "Salsa, avocado"],
    steps: ["Marinate chicken in lime and spices 20 min.", "Sear in hot skillet until charred.", "Cook peppers and onions 5 min.", "Warm tortillas.", "Assemble with salsa and avocado."],
    diabetesTip: "Whole-wheat tortillas lower GI vs flour. Loading on pepper filling keeps carb range diabetes-friendly."
  },
  {
    name: "Black Bean & Corn Salad",
    category: "Lunch", calories: 270, prep: 10,
    description: "Bright, fibre-rich black bean and corn salad from Mayo Clinic — ready in 10 minutes.",
    tags: ["high fibre", "plant-based", "quick", "vegan"], cuisine: "Latin", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80",
    glycemic: "Low", giScore: 30,
    ingredients: ["1 can black beans", "1 cup corn", "1 red bell pepper", "¼ red onion", "Lime juice, cumin, cilantro"],
    steps: ["Combine black beans, corn, bell pepper, onion.", "Whisk lime juice, oil, cumin.", "Toss and fold in cilantro.", "Refrigerate 10 min before serving."],
    diabetesTip: "Black beans GI 30 loaded with resistant starch — feeds gut bacteria and improves insulin sensitivity."
  },
  {
    name: "Guacamole with Jicama Sticks",
    category: "Snack", calories: 150, prep: 10,
    description: "Creamy avocado guacamole with crunchy, water-rich jicama dippers — a perfect diabetes snack.",
    tags: ["healthy fats", "low carb", "vegan"], cuisine: "Mexican", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1548940740-204726a19be3?w=800&q=80",
    glycemic: "Low", giScore: 18,
    ingredients: ["2 ripe avocados", "Juice of 1 lime", "¼ onion, diced fine", "1 tomato, diced", "Cilantro, salt, jalapeño", "Jicama, cut into sticks"],
    steps: ["Mash avocados with lime juice.", "Fold in onion, tomato, cilantro, jalapeño.", "Season with salt.", "Serve with jicama sticks."],
    diabetesTip: "Avocado monounsaturated fats slow carb digestion. Jicama has GI 25 — low-carb, refreshing dipper."
  },
  {
    name: "Southwest Vegetarian Bake",
    category: "Dinner", calories: 305, prep: 45,
    description: "Hearty black bean and corn casserole with Southwest spices — vegetarian, satisfying.",
    tags: ["plant-based", "high fibre", "casserole", "vegan"], cuisine: "Mexican", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80",
    glycemic: "Low", giScore: 32,
    ingredients: ["2 cans black beans", "1 cup corn", "1 cup salsa", "Cumin, chilli powder", "½ cup low-fat sour cream", "½ cup low-fat cheddar"],
    steps: ["Mix beans, corn, salsa, spices.", "Spread in greased dish.", "Dollop sour cream.", "Top with cheese.", "Bake 25–30 min at 190°C."],
    diabetesTip: "Black beans = diabetes superfood. High resistant starch creates gentle, sustained energy release."
  },
  {
    name: "Chipotle Spiced Shrimp",
    category: "Dinner", calories: 195, prep: 15,
    description: "Smoky chipotle-seasoned shrimp — Mayo Clinic diabetes favourite, virtually zero-carb.",
    tags: ["low carb", "high protein", "quick", "spicy"], cuisine: "American", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
    glycemic: "Low", giScore: 5,
    ingredients: ["400g large shrimp", "1 tsp chipotle powder", "Smoked paprika, garlic powder, cumin", "1 tbsp olive oil", "Lime"],
    steps: ["Mix spices.", "Toss shrimp in oil and spice mix.", "Cook in hot skillet 2 min per side.", "Squeeze lime over. Serve."],
    diabetesTip: "Shrimp = highest protein-to-calorie ratio with zero carbohydrates. No measurable glycaemic impact."
  },
];

// ─── AFRICAN ─────────────────────────────────────────────────────────────────
const african = [
  {
    name: "Nigerian Efo Riro (Spinach Stew)",
    category: "Dinner", calories: 245, prep: 35,
    description: "Classic West African leafy green stew with lean protein, antioxidants, and zero GI impact.",
    tags: ["high fibre", "antioxidants", "traditional"], cuisine: "Nigerian", ethnicity: "African",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    glycemic: "Low", giScore: 22,
    ingredients: ["4 cups spinach or ugwu leaves", "300g lean beef or tofu", "2 red bell peppers, blended", "1 scotch bonnet (optional)", "1 onion", "2 tbsp palm or olive oil"],
    steps: ["Blend peppers.", "Fry onion in oil until golden.", "Brown meat or tofu.", "Add pepper purée, cook 10 min.", "Add spinach in batches 3–4 min."],
    diabetesTip: "Spinach: virtually zero GI. Delivers magnesium and potassium that directly support insulin function."
  },
  {
    name: "Ethiopian Misir Wat (Red Lentil Stew)",
    category: "Dinner", calories: 265, prep: 35,
    description: "Spiced red lentil stew with berbere — a staple Ethiopian vegan dish that is extremely diabetes-friendly.",
    tags: ["vegan", "high fibre", "plant-based"], cuisine: "Ethiopian", ethnicity: "African",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low", giScore: 29,
    ingredients: ["1 cup red lentils", "1 onion, diced", "3 garlic cloves", "2 tsp berbere spice blend", "1 tsp ginger", "1 can diced tomatoes", "4 cups water", "2 tbsp olive oil"],
    steps: ["Sauté onion in oil until golden.", "Add garlic, ginger, berbere. Stir 2 min.", "Add tomatoes, cook 5 min.", "Add lentils and water.", "Simmer 20–25 min until thick. Serve with injera or cauliflower rice."],
    diabetesTip: "Red lentils GI 29. Berbere spices (including fenugreek) have documented blood-sugar-lowering effects."
  },
  {
    name: "Ghanaian Kontomire Stew (Cocoyam Leaf Stew)",
    category: "Lunch", calories: 230, prep: 30,
    description: "Ghanaian green leaf stew with eggs, tomatoes, and garden eggs — nutrient-dense and low GI.",
    tags: ["plant-based", "high fibre", "West African"], cuisine: "Ghanaian", ethnicity: "African",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    glycemic: "Low", giScore: 20,
    ingredients: ["2 cups cocoyam leaves or spinach, chopped", "3 boiled eggs", "2 garden eggs (eggplant), diced", "2 tomatoes, blended", "1 onion", "2 tbsp olive oil", "Salt, chilli"],
    steps: ["Blend tomatoes and onion.", "Fry tomato purée in oil 10 min.", "Add garden eggs, cook 5 min.", "Add greens, cook 5 min.", "Halve eggs and add gently."],
    diabetesTip: "Leafy greens + eggs = high protein and fibre with near-zero GI. Traditional West African cooking is naturally diabetes-friendly."
  },
  {
    name: "Peanut & Tomato Soup (West African Style)",
    category: "Dinner", calories: 285, prep: 25,
    description: "Creamy West African groundnut soup — plant protein from peanuts with anti-inflammatory tomatoes.",
    tags: ["plant-based", "comforting", "West African"], cuisine: "West African", ethnicity: "African",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
    glycemic: "Low", giScore: 32,
    ingredients: ["½ cup natural peanut butter", "1 can diced tomatoes", "1 onion", "3 garlic cloves", "1 tsp ginger", "4 cups vegetable broth", "½ tsp cayenne", "Spinach or kale to finish"],
    steps: ["Sauté onion, garlic, ginger in oil.", "Add tomatoes and cayenne. Simmer 5 min.", "Whisk in peanut butter and broth.", "Simmer 15 min.", "Stir in greens last 2 min."],
    diabetesTip: "Peanuts have GI 18 — one of the lowest of any food. Monounsaturated fats slow digestion of other carbs."
  },
  {
    name: "Plantain Chips with Avocado Dip",
    category: "Snack", calories: 160, prep: 20,
    description: "Baked green plantain chips (not fried) with a fresh avocado dip — a diabetes-conscious African snack.",
    tags: ["baked", "West African", "snack"], cuisine: "West African", ethnicity: "African",
    image: "https://images.unsplash.com/photo-1548940740-204726a19be3?w=800&q=80",
    glycemic: "Low-Medium", giScore: 45,
    ingredients: ["1 green (unripe) plantain", "1 tbsp olive oil", "Salt", "1 ripe avocado", "Lime juice, garlic, salt"],
    steps: ["Slice plantain paper-thin.", "Toss in olive oil and salt.", "Bake at 190°C 15–20 min until crisp.", "Mash avocado with lime and garlic.", "Serve chips with dip."],
    diabetesTip: "Unripe green plantain has much lower GI than ripe (~45 vs ~70). Baking vs frying removes excess fat."
  },
];

// ─── WESTERN ─────────────────────────────────────────────────────────────────
const western = [
  {
    name: "Avocado Egg Toast on Whole Grain",
    category: "Breakfast", calories: 320, prep: 10,
    description: "Healthy fats from avocado paired with protein-rich eggs on low-GI whole grain bread.",
    tags: ["healthy fats", "low GI", "quick"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    glycemic: "Low-Medium", giScore: 50,
    ingredients: ["2 slices whole grain bread", "1 ripe avocado", "2 eggs", "Salt, chilli flakes, lemon juice"],
    steps: ["Toast bread.", "Mash avocado with lemon and chilli.", "Fry or poach eggs.", "Spread avocado, top with egg."],
    diabetesTip: "Avocado monounsaturated fats slow gastric emptying, blunting glucose response from bread."
  },
  {
    name: "Overnight Oats with Cinnamon & Nuts",
    category: "Breakfast", calories: 280, prep: 5,
    description: "Rolled oats soaked overnight with cinnamon and mixed nuts — resistant starch magic.",
    tags: ["slow release", "high fibre", "meal prep"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1517673408745-02e11419c4f4?w=800&q=80",
    glycemic: "Low-Medium", giScore: 55,
    ingredients: ["½ cup rolled oats", "¾ cup almond milk", "2 tbsp Greek yogurt", "1 tsp chia seeds", "½ tsp cinnamon", "Almonds, walnuts, blueberries"],
    steps: ["Mix oats, chia, almond milk, yogurt, cinnamon.", "Refrigerate overnight.", "Top with nuts and berries."],
    diabetesTip: "Overnight soaking increases resistant starch by 30%, lowering GI. Cinnamon lowers fasting glucose."
  },
  {
    name: "Tuna Lettuce Wraps",
    category: "Lunch", calories: 190, prep: 10,
    description: "High-protein tuna in crisp lettuce cups with avocado and tomato. Zero refined carbs.",
    tags: ["high protein", "low carb", "quick"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    glycemic: "Low", giScore: 10,
    ingredients: ["2 cans tuna in spring water", "1 avocado, diced", "Cherry tomatoes", "¼ red onion", "Lime juice", "Butter lettuce cups"],
    steps: ["Drain tuna, flake in bowl.", "Add avocado, tomatoes, onion, lime.", "Fold gently.", "Spoon into lettuce cups."],
    diabetesTip: "Zero carbohydrate content. Tuna 25g protein per can — minimal blood glucose effect."
  },
  {
    name: "Zucchini Noodles with Turkey Bolognese",
    category: "Dinner", calories: 295, prep: 25,
    description: "Swap pasta for zucchini noodles — all the comfort, fraction of the carbs.",
    tags: ["low carb", "pasta alternative", "lean protein"], cuisine: "Italian", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    glycemic: "Low", giScore: 15,
    ingredients: ["3 large zucchini", "300g lean turkey mince", "1 can crushed tomatoes", "Onion, garlic", "Dried basil, oregano"],
    steps: ["Spiralise zucchini. Pat dry.", "Brown turkey; add onion and garlic.", "Add tomatoes and herbs. Simmer 10 min.", "Sauté zucchini 2 min.", "Plate and top with sauce."],
    diabetesTip: "Zucchini noodles GI ~0 vs pasta GI 49–65. Game-changer for pasta lovers with diabetes."
  },
  {
    name: "Spinach & Mozzarella Egg White Bites",
    category: "Breakfast", calories: 180, prep: 25,
    description: "Light protein-packed egg white bites with spinach and mozzarella — ADA-approved meal prep.",
    tags: ["high protein", "low carb", "meal prep"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    glycemic: "Low", giScore: 10,
    ingredients: ["6 egg whites", "1 cup spinach", "½ cup mozzarella", "¼ cup red bell pepper", "Salt, garlic powder"],
    steps: ["Preheat 180°C. Spray muffin tin.", "Whisk egg whites with seasoning.", "Fill cups with spinach, cheese, pepper.", "Pour egg mix over.", "Bake 18–20 min."],
    diabetesTip: "Egg whites = pure protein, zero carbs. Spinach magnesium directly supports insulin function."
  },
  {
    name: "Cinnamon Apple Oatmeal",
    category: "Breakfast", calories: 260, prep: 10,
    description: "Warm rolled oats with diced apple and cinnamon — a cosy ADA-recommended breakfast.",
    tags: ["slow release", "high fibre", "warm"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=800&q=80",
    glycemic: "Low-Medium", giScore: 52,
    ingredients: ["½ cup rolled oats", "1 cup water or almond milk", "½ apple, diced", "½ tsp cinnamon", "Pinch of nutmeg"],
    steps: ["Boil water/milk.", "Stir in oats, cook 4–5 min.", "Add apple last 2 min.", "Stir in cinnamon and nutmeg."],
    diabetesTip: "Rolled oats much lower GI than instant. Cinnamon ½ tsp daily measurably reduces fasting blood glucose."
  },
  {
    name: "Hearty Vegetable Soup",
    category: "Dinner", calories: 185, prep: 40,
    description: "Chunky broth-based vegetable soup — deeply filling, very low calorie, Taste of Home staple.",
    tags: ["low calorie", "high fibre", "plant-based", "vegan"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    glycemic: "Low", giScore: 22,
    ingredients: ["Carrots, celery, onion, zucchini, diced tomatoes, white beans", "6 cups vegetable broth", "Garlic, Italian seasoning, olive oil"],
    steps: ["Sauté onion, carrots, celery 7 min.", "Add garlic and seasoning.", "Add remaining veg, beans, broth.", "Simmer 20 min. Season."],
    diabetesTip: "Broth soups slow gastric emptying. Very low calorie — large portion with minimal glycaemic impact."
  },
  {
    name: "Peanut Butter Celery Sticks",
    category: "Snack", calories: 130, prep: 2,
    description: "Classic 'ants on a log' — celery sticks with natural peanut butter. The ultimate diabetes snack.",
    tags: ["low carb", "healthy fats", "quick"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    glycemic: "Low", giScore: 18,
    ingredients: ["3 celery stalks", "3 tbsp natural peanut butter (no added sugar)"],
    steps: ["Cut celery into sticks.", "Fill each stick groove with peanut butter."],
    diabetesTip: "Peanut butter GI 14. Celery is virtually zero-carb. The fat + protein combination sustains satiety and prevents blood sugar spikes."
  },
  {
    name: "Roasted Butternut Squash Soup",
    category: "Dinner", calories: 210, prep: 45,
    description: "Velvety roasted butternut squash soup from Mayo Clinic — naturally sweet, warming.",
    tags: ["plant-based", "anti-inflammatory", "vegan"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
    glycemic: "Low-Medium", giScore: 51,
    ingredients: ["1 large butternut squash", "1 onion", "3 garlic cloves", "1 tsp cinnamon, ½ tsp nutmeg", "4 cups vegetable broth", "Pumpkin seeds to garnish"],
    steps: ["Roast squash cubes 30 min at 200°C.", "Sauté onion and garlic.", "Add squash, spices, broth. Simmer 10 min.", "Blend until smooth."],
    diabetesTip: "Fibre slows squash sugar absorption. Cinnamon actively supports insulin sensitivity."
  },
  {
    name: "Hard-Boiled Eggs with Hummus",
    category: "Snack", calories: 145, prep: 15,
    description: "Two hard-boiled eggs with a scoop of hummus — portable, protein-rich, zero-GI diabetes snack.",
    tags: ["high protein", "portable", "low carb"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    glycemic: "Low", giScore: 12,
    ingredients: ["2 eggs", "3 tbsp hummus", "Salt, pepper, paprika"],
    steps: ["Boil eggs 10 min. Cool in ice water.", "Peel and halve.", "Season with salt, pepper, paprika.", "Serve with hummus on the side."],
    diabetesTip: "Eggs GI zero. Hummus chickpea fibre further slows any carb absorption. A perfect blood-sugar-stable snack."
  },
];

// ─── EUROPEAN ─────────────────────────────────────────────────────────────────
const european = [
  {
    name: "Spaghetti Squash & Turkey Meatballs",
    category: "Dinner", calories: 320, prep: 45,
    description: "Spaghetti squash GI 20 replaces pasta GI 50–55 — Riverside Hospital diabetes favourite.",
    tags: ["low carb", "grain-free", "comfort food"], cuisine: "Italian", ethnicity: "European",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&q=80",
    glycemic: "Low", giScore: 20,
    ingredients: ["1 large spaghetti squash", "400g lean ground beef", "1 egg", "Parmesan, garlic, Italian seasoning", "Low-sodium marinara sauce"],
    steps: ["Halve squash, roast cut-side down 35–40 min at 200°C.", "Scrape strands.", "Make meatballs, pan-fry 8–10 min.", "Heat sauce, add meatballs.", "Serve over squash strands."],
    diabetesTip: "Squash swap reduces post-meal glucose spike by ~60% compared to regular pasta."
  },
  {
    name: "Bacon & Spinach Thin-Crust Pizza",
    category: "Dinner", calories: 310, prep: 20,
    description: "5-ingredient diabetes pizza with turkey bacon, spinach, and reduced-fat cheese on whole-wheat crust.",
    tags: ["quick", "comfort food", "family"], cuisine: "Italian", ethnicity: "European",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    glycemic: "Low-Medium", giScore: 50,
    ingredients: ["1 thin whole-wheat pizza crust", "3 strips turkey bacon, chopped", "2 cups spinach", "½ cup low-sodium marinara", "½ cup reduced-fat mozzarella"],
    steps: ["Preheat 220°C.", "Spread sauce, add spinach, bacon, cheese.", "Bake 10–12 min."],
    diabetesTip: "Thin whole-wheat crust cuts carbs ~40% vs thick white. Spinach = zero glycaemic impact."
  },
  {
    name: "Chicken Goat Cheese Skillet",
    category: "Dinner", calories: 340, prep: 25,
    description: "Pan-seared chicken in tangy tomato sauce with goat cheese — Taste of Home 30-minute dinner.",
    tags: ["high protein", "low carb", "one-pan"], cuisine: "Mediterranean", ethnicity: "European",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    glycemic: "Low", giScore: 16,
    ingredients: ["4 chicken breasts", "60g goat cheese", "1 cup cherry tomatoes", "3 garlic cloves", "½ cup chicken broth", "Dried basil"],
    steps: ["Sear chicken 5–6 min per side.", "Sauté garlic, add tomatoes and broth.", "Simmer 3 min.", "Return chicken, top with goat cheese."],
    diabetesTip: "Goat cheese fat slows carb absorption. Tomato lycopene reduces cardiovascular risk in diabetics."
  },
  {
    name: "Pesto Chicken Wrap",
    category: "Lunch", calories: 340, prep: 10,
    description: "Grilled chicken with basil pesto, greens, and tomatoes in a whole-wheat tortilla.",
    tags: ["quick", "high protein", "whole grain"], cuisine: "Italian", ethnicity: "European",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
    glycemic: "Low-Medium", giScore: 48,
    ingredients: ["1 large whole-wheat tortilla", "150g cooked chicken breast", "2 tbsp basil pesto", "Mixed greens", "Cherry tomatoes", "Parmesan"],
    steps: ["Warm tortilla.", "Spread pesto.", "Layer greens, chicken, tomatoes.", "Roll tightly and slice."],
    diabetesTip: "Whole-wheat tortilla lower GI than white flour. High protein chicken slows glucose absorption."
  },
  {
    name: "Roasted Vegetable Meatloaf",
    category: "Dinner", calories: 295, prep: 60,
    description: "Comfort-food meatloaf packed with grated zucchini and peppers — lower fat than the classic.",
    tags: ["comfort food", "high protein", "meal prep"], cuisine: "American", ethnicity: "European",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    glycemic: "Low", giScore: 25,
    ingredients: ["500g 95% lean ground beef", "1 zucchini, grated", "Red bell pepper, onion", "1 egg", "¼ cup oats", "Balsamic vinegar glaze"],
    steps: ["Squeeze moisture from zucchini.", "Combine beef, veg, egg, oats, seasoning.", "Form loaf; brush with balsamic glaze.", "Bake 50–55 min at 180°C."],
    diabetesTip: "Grated zucchini adds fibre while reducing meat ratio. 95% lean beef cuts saturated fat."
  },
];

// ─── VEGAN (cross-cultural) ──────────────────────────────────────────────────
const vegan = [
  {
    name: "Chana Masala (Vegan Chickpea Curry)",
    category: "Dinner", calories: 310, prep: 30,
    description: "Spiced Indian chickpea curry — 100% plant-based, high fibre, GI 28. A perfect vegan diabetes dinner.",
    tags: ["vegan", "plant-based", "high fibre", "Indian"], cuisine: "Indian", ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
    glycemic: "Low", giScore: 28,
    ingredients: ["2 cans chickpeas", "1 can diced tomatoes", "1 onion", "3 garlic cloves", "1 tsp cumin, coriander, turmeric, garam masala", "Cilantro to garnish"],
    steps: ["Sauté onion in oil.", "Add spices and garlic.", "Add tomatoes, simmer 10 min.", "Add chickpeas, simmer 15 min.", "Garnish and serve."],
    diabetesTip: "Chickpeas GI 28. Turmeric curcumin actively reduces insulin resistance."
  },
  {
    name: "Vegan Overnight Oats with Berries",
    category: "Breakfast", calories: 290, prep: 5,
    description: "Creamy oat-almond milk overnight oats with mixed berries — no animal products, pure slow-release energy.",
    tags: ["vegan", "meal prep", "high fibre", "slow release"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=800&q=80",
    glycemic: "Low-Medium", giScore: 45,
    ingredients: ["½ cup rolled oats", "¾ cup unsweetened oat milk", "1 tbsp chia seeds", "½ cup mixed berries", "1 tsp maple syrup (optional)", "½ tsp cinnamon"],
    steps: ["Combine oats, chia, oat milk, cinnamon.", "Refrigerate overnight.", "Top with berries and optional maple syrup."],
    diabetesTip: "Chia seeds double the fibre content. Berries provide anthocyanins proven to improve insulin sensitivity."
  },
  {
    name: "Lentil & Vegetable Power Bowl",
    category: "Lunch", calories: 340, prep: 25,
    description: "Green lentils, roasted vegetables, and tahini dressing — a complete vegan diabetes lunch.",
    tags: ["vegan", "high protein", "high fibre", "plant-based"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    glycemic: "Low", giScore: 32,
    ingredients: ["1 cup cooked green lentils", "1 cup roasted broccoli and sweet potato", "2 cups arugula", "Tahini dressing: 2 tbsp tahini, lemon, garlic, water"],
    steps: ["Roast broccoli and sweet potato 20 min at 200°C.", "Cook lentils per packet.", "Whisk tahini dressing.", "Assemble: arugula, lentils, roasted veg.", "Drizzle dressing."],
    diabetesTip: "Green lentils GI 30. Tahini (sesame) provides healthy fats that slow the meal's overall glycaemic response."
  },
  {
    name: "Tofu Scramble with Turmeric",
    category: "Breakfast", calories: 220, prep: 15,
    description: "Vegan scrambled 'eggs' made from firm tofu with turmeric, spinach, and vegetables.",
    tags: ["vegan", "high protein", "low carb", "anti-inflammatory"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80",
    glycemic: "Low", giScore: 15,
    ingredients: ["300g firm tofu, crumbled", "1 cup spinach", "½ cup cherry tomatoes, halved", "1 tsp turmeric", "½ tsp cumin", "1 tbsp nutritional yeast", "1 tbsp olive oil", "Salt, black pepper"],
    steps: ["Heat oil in skillet.", "Add crumbled tofu, turmeric, cumin. Cook 3 min.", "Add tomatoes, cook 2 min.", "Stir in spinach until wilted.", "Add nutritional yeast. Season."],
    diabetesTip: "Tofu GI 15. Turmeric curcumin + black pepper reduces chronic inflammation that worsens insulin resistance."
  },
  {
    name: "Black Bean Tacos in Lettuce Shells",
    category: "Dinner", calories: 270, prep: 15,
    description: "Spiced black beans in crisp lettuce shells with salsa and lime — grain-free vegan tacos.",
    tags: ["vegan", "grain-free", "low carb", "quick"], cuisine: "Mexican", ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    glycemic: "Low", giScore: 30,
    ingredients: ["2 cans black beans", "1 tsp cumin, chilli powder", "Romaine or butter lettuce leaves", "Salsa, avocado, lime juice", "Fresh cilantro"],
    steps: ["Warm beans with cumin and chilli.", "Wash and dry large lettuce leaves.", "Spoon beans into leaves.", "Top with salsa, avocado, lime, cilantro."],
    diabetesTip: "Lettuce shells eliminate grain carbs entirely. Black beans GI 30 = sustained energy with no glucose spike."
  },
  {
    name: "Vegan Peanut Butter Energy Balls",
    category: "Snack", calories: 120, prep: 10,
    description: "No-bake rolled oat and peanut butter balls — a vegan diabetes snack with balanced protein and fibre.",
    tags: ["vegan", "no-bake", "meal prep", "snack"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    glycemic: "Low", giScore: 35,
    ingredients: ["1 cup rolled oats", "½ cup natural peanut butter", "3 tbsp ground flaxseed", "2 tbsp maple syrup", "1 tsp vanilla extract", "2 tbsp dark chocolate chips (optional)"],
    steps: ["Mix all ingredients in a bowl.", "Refrigerate 30 min.", "Roll into 12 balls.", "Store in fridge up to 1 week."],
    diabetesTip: "Peanut butter GI 14. Flaxseed adds omega-3 ALA and fibre. These balls release energy slowly — ideal pre-meal snack."
  },
  {
    name: "Chickpea & Avocado Smash Toast",
    category: "Breakfast", calories: 310, prep: 10,
    description: "Mashed chickpeas and avocado on whole-grain toast — plant-based, protein-rich, low-GI vegan breakfast.",
    tags: ["vegan", "high fibre", "plant protein", "quick"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    glycemic: "Low-Medium", giScore: 42,
    ingredients: ["2 slices whole-grain bread", "½ can chickpeas, drained", "1 avocado", "Juice of ½ lemon", "Salt, chilli flakes, cumin"],
    steps: ["Mash chickpeas and avocado together.", "Add lemon juice, cumin, chilli, salt.", "Toast bread.", "Spread mixture generously.", "Garnish with chilli flakes."],
    diabetesTip: "Chickpeas + avocado = fibre, protein, and healthy fat. This combination creates a very low post-meal glucose response."
  },
  {
    name: "Ethiopian Misir Wat (Red Lentil Stew)",
    category: "Dinner", calories: 265, prep: 35,
    description: "Spiced red lentil stew with berbere spice blend — 100% vegan, extremely diabetes-friendly.",
    tags: ["vegan", "high fibre", "Ethiopian", "anti-inflammatory"], cuisine: "Ethiopian", ethnicity: "African",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low", giScore: 29,
    ingredients: ["1 cup red lentils", "1 onion", "3 garlic cloves", "2 tsp berbere spice", "1 can diced tomatoes", "4 cups water", "2 tbsp olive oil"],
    steps: ["Sauté onion golden in oil.", "Add garlic and berbere.", "Add tomatoes, simmer 5 min.", "Add lentils and water, simmer 20–25 min.", "Serve with cauliflower rice."],
    diabetesTip: "Lentils GI 29. Berbere's fenugreek content has documented blood-glucose-lowering effects."
  },
  {
    name: "Green Smoothie Bowl",
    category: "Breakfast", calories: 245, prep: 5,
    description: "Thick spinach and frozen banana smoothie bowl with seeds and berries — vegan, plant-powered breakfast.",
    tags: ["vegan", "quick", "antioxidants", "plant-based"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
    glycemic: "Low-Medium", giScore: 48,
    ingredients: ["1 frozen banana", "1 cup spinach", "½ cup almond milk", "1 tbsp almond butter", "Toppings: chia seeds, blueberries, pumpkin seeds"],
    steps: ["Blend banana, spinach, almond milk, almond butter until very thick.", "Pour into bowl.", "Top with seeds and berries."],
    diabetesTip: "Frozen banana is riper but the spinach + almond butter protein and fat bring the blended GI to a moderate level. Eat slowly."
  },
];

// ─── MyDiabetes.health type-specific additions ───────────────────────────────
const myDiabetesHealth = [
  {
    name: "Apple-Cinnamon Overnight Oats",
    category: "Breakfast", calories: 310, prep: 5,
    description: "No-cook overnight oats with chia, apple, and cinnamon — prediabetes plate-method breakfast.",
    tags: ["prediabetes", "no-cook", "meal prep", "high fibre"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=800&q=80",
    glycemic: "Low", giScore: 40, source: "https://mydiabetes.health",
    ingredients: ["½ cup rolled oats", "¼ cup almond milk", "1 tbsp chia seeds", "1 small apple, diced", "½ tsp cinnamon"],
    steps: ["Combine oats, chia, almond milk, cinnamon.", "Fold in apple.", "Refrigerate overnight.", "Stir and eat cold or warm."],
    diabetesTip: "Beta-glucan oat fibre + chia gel flatten the glucose curve. Cinnamon lowers post-meal spikes."
  },
  {
    name: "Greek Yogurt Berry Parfait",
    category: "Breakfast", calories: 280, prep: 5,
    description: "Plain Greek yogurt layered with berries, walnuts, and honey — Type 2 plate-method breakfast.",
    tags: ["high protein", "probiotic", "quick", "type 2"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    glycemic: "Low", giScore: 32, source: "https://mydiabetes.health",
    ingredients: ["¾ cup plain Greek yogurt", "½ cup mixed berries", "2 tbsp walnuts", "1 tsp honey"],
    steps: ["Spoon yogurt into glass.", "Layer berries on top.", "Scatter walnuts.", "Drizzle honey."],
    diabetesTip: "Yogurt probiotics reduce gut inflammation. Berries' anthocyanins improve insulin sensitivity."
  },
  {
    name: "Steel-Cut Oats with Walnuts & Blueberries",
    category: "Breakfast", calories: 350, prep: 30,
    description: "Hearty steel-cut oats with walnuts and blueberries — Type 1 breakfast with 45g precisely counted carbs.",
    tags: ["type 1", "carb counting", "anti-inflammatory"], cuisine: "American", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=800&q=80",
    glycemic: "Low", giScore: 42, source: "https://mydiabetes.health",
    ingredients: ["½ cup steel-cut oats", "2 cups water", "¼ cup walnuts", "½ cup blueberries", "½ tsp cinnamon"],
    steps: ["Boil water. Add oats, simmer 25–30 min.", "Stir in cinnamon.", "Top with walnuts and blueberries."],
    diabetesTip: "Steel-cut GI 42 vs quick oats GI 66. Walnut ALA omega-3s reduce inflammation."
  },
  {
    name: "Chickpea & Quinoa Power Salad",
    category: "Lunch", calories: 420, prep: 15,
    description: "Type 1-friendly quinoa and chickpea salad — 45g carbs, precisely portioned for insulin dosing.",
    tags: ["type 1", "carb counting", "high fibre"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    glycemic: "Low-Medium", giScore: 48, source: "https://mydiabetes.health",
    ingredients: ["½ cup cooked quinoa", "¼ cup chickpeas", "2 cups arugula", "½ cup cherry tomatoes", "¼ cup feta", "Olive oil, lemon dressing"],
    steps: ["Cook and cool quinoa.", "Whisk dressing.", "Toss all ingredients.", "Top with feta."],
    diabetesTip: "~45g carbs per bowl — ideal for insulin-to-carb ratio dosing."
  },
  {
    name: "Rainbow Salad Bowl",
    category: "Lunch", calories: 340, prep: 10,
    description: "Vibrant prediabetes plate-method salad — 9g fibre, 12g protein, average GI under 40.",
    tags: ["prediabetes", "high fibre", "plant-based", "quick", "vegan"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    glycemic: "Low", giScore: 38, source: "https://mydiabetes.health",
    ingredients: ["3 cups mixed greens", "½ cup chickpeas", "¼ cup quinoa", "Cucumber, cherry tomatoes, carrot", "Olive oil and apple cider vinegar dressing"],
    steps: ["Whisk dressing.", "Arrange greens.", "Add veg and pulses.", "Drizzle and toss."],
    diabetesTip: "Apple cider vinegar slows gastric emptying, lowering the full meal's GI."
  },
  {
    name: "Sardine & Farro Mediterranean Bowl",
    category: "Lunch", calories: 445, prep: 20,
    description: "Whole-grain farro with omega-3 sardines — Type 2 Mediterranean-plan lunch with 28g protein.",
    tags: ["omega-3", "type 2", "Mediterranean", "whole grain"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    glycemic: "Low-Medium", giScore: 45, source: "https://mydiabetes.health",
    ingredients: ["½ cup cooked farro", "1 can sardines", "2 cups mixed greens", "Cherry tomatoes", "Olive oil, lemon"],
    steps: ["Cook farro, cool.", "Whisk dressing.", "Assemble greens and farro.", "Flake sardines on top.", "Dress and serve."],
    diabetesTip: "Farro GI ~40. Sardines provide more omega-3s per gram than salmon."
  },
  {
    name: "Baked Chicken Thighs with Roasted Veg",
    category: "Dinner", calories: 420, prep: 40,
    description: "Herb-roasted chicken thighs with zucchini, eggplant, and bell peppers — ADA Mediterranean Type 2 dinner.",
    tags: ["type 2", "Mediterranean", "meal prep", "high protein"], cuisine: "Mediterranean", ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80",
    glycemic: "Low", giScore: 28, source: "https://mydiabetes.health",
    ingredients: ["4 skinless chicken thighs", "Zucchini, eggplant, bell peppers", "Olive oil, oregano, garlic, lemon", "¼ cup cooked quinoa per serving"],
    steps: ["Roast veg at 200°C.", "Rub chicken with oil and spices.", "Nestle chicken on veg.", "Roast 35–40 min.", "Serve over quinoa."],
    diabetesTip: "Non-starchy roasted veg have virtually no glycaemic impact. 30g protein per serving."
  },
];

// ─── MERGED & EXPORTED ────────────────────────────────────────────────────────
export const MEALS = [
  ...mediterranean,
  ...southAsian,
  ...eastAsian,
  ...southeastAsian,
  ...latinAmerican,
  ...african,
  ...western,
  ...european,
  ...vegan,
  ...myDiabetesHealth,
  // Additional cross-cultural snacks
  {
    name: "Spiced Roasted Almonds",
    category: "Snack", calories: 170, prep: 15,
    description: "Oven-roasted almonds with cinnamon and smoked paprika — a satisfying diabetes-friendly snack.",
    tags: ["low carb", "healthy fats", "high protein"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    glycemic: "Low", giScore: 15,
    ingredients: ["1 cup whole almonds", "1 tsp cinnamon", "½ tsp smoked paprika", "¼ tsp sea salt", "1 tsp olive oil"],
    steps: ["Toss almonds in oil, cinnamon, paprika, salt.", "Spread on baking tray.", "Roast at 175°C for 12–15 min.", "Cool completely."],
    diabetesTip: "Almonds GI 15. Studies show eating 30g almonds before a carb-heavy meal reduces post-meal glucose by up to 30%."
  },
  {
    name: "Avocado Cacao Mousse",
    category: "Snack", calories: 190, prep: 5,
    description: "Creamy avocado and raw cacao mousse — a decadent-tasting zero-sugar, high-fibre diabetes snack.",
    tags: ["vegan", "no added sugar", "healthy fats"], cuisine: "International", ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1548940740-204726a19be3?w=800&q=80",
    glycemic: "Low", giScore: 20,
    ingredients: ["2 ripe avocados", "3 tbsp raw cacao powder", "2 tbsp maple syrup or sugar-free sweetener", "½ tsp vanilla extract", "Pinch of salt", "Raspberries to top"],
    steps: ["Blend avocados, cacao, sweetener, vanilla.", "Taste and adjust sweetness.", "Refrigerate 30 min.", "Top with raspberries."],
    diabetesTip: "Avocado fat + cacao fibre = very low glycaemic load. Raw cacao improves insulin sensitivity."
  },
];

export const ETHNICITIES = [
  { key: "All", emoji: "🌍" },
  { key: "Mediterranean", emoji: "🫒" },
  { key: "East Asian", emoji: "🍜" },
  { key: "South Asian", emoji: "🍛" },
  { key: "Southeast Asian", emoji: "🌿" },
  { key: "Latin American", emoji: "🌶️" },
  { key: "African", emoji: "🌍" },
  { key: "Western", emoji: "🥑" },
  { key: "European", emoji: "🍝" },
];

export const CATEGORIES = ["All", "Breakfast", "Lunch", "Snack", "Dinner", "Vegan"];
export const GI_FILTERS = ["All GI", "Low", "Low-Medium", "Medium"];
export const GI_LABELS = {
  Low: "bg-green-100 text-green-700",
  "Low-Medium": "bg-yellow-100 text-yellow-700",
  Medium: "bg-orange-100 text-orange-700"
};
export const GI_BAR_COLORS = {
  Low: "bg-green-500",
  "Low-Medium": "bg-yellow-400",
  Medium: "bg-orange-400"
};