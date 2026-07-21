import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Flame, Search, ChefHat, Leaf, ChevronRight, Activity } from "lucide-react";
import RecipeModal from "@/components/meals/RecipeModal";

const MEALS = [
  {
    name: "Grilled Salmon with Roasted Broccoli",
    category: "Dinner",
    calories: 380,
    prep: 25,
    description: "Omega-3 rich salmon with fibre-packed broccoli. Great for blood sugar stability.",
    tags: ["high protein", "low carb", "heart healthy"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    glycemic: "Low",
    giScore: 12,
    ingredients: ["2 salmon fillets (150g each)", "2 cups broccoli florets", "2 tbsp olive oil", "3 garlic cloves, minced", "Juice of 1 lemon", "Salt, pepper, dried oregano"],
    steps: [
      "Preheat oven to 200°C (400°F). Line a baking tray with parchment paper.",
      "Toss broccoli florets in 1 tbsp olive oil, salt, and pepper. Spread on one half of the tray.",
      "Place salmon fillets on the other half. Drizzle with remaining olive oil, lemon juice, and minced garlic.",
      "Season salmon with salt, pepper, and a pinch of oregano.",
      "Roast everything together for 15–18 minutes until salmon flakes easily and broccoli edges are lightly charred.",
      "Serve immediately with a wedge of lemon. Pairs well with a side salad."
    ],
    diabetesTip: "Salmon's omega-3 fatty acids improve insulin sensitivity. The zero-carb profile of this meal means no blood sugar spike."
  },
  {
    name: "Greek Yogurt Berry Bowl",
    category: "Breakfast",
    calories: 210,
    prep: 5,
    description: "High-protein Greek yogurt with antioxidant-rich berries and a sprinkle of chia seeds.",
    tags: ["high protein", "low sugar", "quick"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
    glycemic: "Low",
    giScore: 18,
    ingredients: ["200g plain full-fat Greek yogurt", "½ cup mixed berries (blueberries, strawberries, raspberries)", "1 tbsp chia seeds", "1 tbsp walnuts, roughly chopped", "½ tsp cinnamon", "Optional: 1 tsp honey (if GI allows)"],
    steps: [
      "Spoon Greek yogurt into a bowl.",
      "Scatter the mixed berries over the top.",
      "Sprinkle chia seeds and chopped walnuts evenly.",
      "Dust with cinnamon — cinnamon has been shown to improve insulin sensitivity.",
      "If using honey, drizzle lightly. Eat immediately for best texture."
    ],
    diabetesTip: "Berries have one of the lowest GI scores of any fruit. Chia seeds slow digestion further, preventing glucose spikes after breakfast."
  },
  {
    name: "Lentil & Spinach Soup",
    category: "Lunch",
    calories: 290,
    prep: 30,
    description: "Protein and fibre-rich lentils slow glucose absorption — a diabetes superfood meal.",
    tags: ["high fibre", "plant-based", "filling"],
    cuisine: "Indian",
    ethnicity: "South Asian",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low",
    giScore: 29,
    ingredients: ["1 cup red lentils, rinsed", "2 cups spinach, roughly chopped", "1 onion, diced", "3 garlic cloves, minced", "1 tsp cumin", "1 tsp turmeric", "½ tsp garam masala", "1 tbsp olive oil", "4 cups vegetable stock", "Salt and pepper to taste"],
    steps: [
      "Heat olive oil in a large pot over medium heat. Add onion and cook for 5 minutes until softened.",
      "Add garlic, cumin, turmeric, and garam masala. Stir for 1 minute until fragrant.",
      "Add rinsed lentils and vegetable stock. Bring to a boil.",
      "Reduce heat and simmer for 20 minutes, stirring occasionally, until lentils are soft.",
      "Stir in fresh spinach and cook for 2 more minutes until wilted.",
      "Season with salt and pepper. Serve hot with a squeeze of lemon juice."
    ],
    diabetesTip: "Lentils have a GI of just 29 — one of the lowest of any food. The high soluble fibre forms a gel that slows glucose absorption dramatically."
  },
  {
    name: "Avocado Egg Toast on Whole Grain",
    category: "Breakfast",
    calories: 320,
    prep: 10,
    description: "Healthy fats from avocado paired with protein-rich eggs on low-GI whole grain bread.",
    tags: ["healthy fats", "low GI", "quick"],
    cuisine: "International",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 50,
    ingredients: ["2 slices whole grain bread (look for 100% whole grain)", "1 ripe avocado", "2 eggs", "Salt, pepper, red chilli flakes", "Juice of ½ lemon", "Optional: cherry tomatoes, microgreens"],
    steps: [
      "Toast the whole grain bread slices until golden and crispy.",
      "While toasting, halve the avocado and remove the stone. Scoop flesh into a bowl.",
      "Mash avocado with lemon juice, a pinch of salt, and chilli flakes. Keep slightly chunky.",
      "Fry or poach the eggs to your preference (poached is lowest calorie).",
      "Spread mashed avocado generously over toast.",
      "Place an egg on each slice. Top with salt, pepper, and optional microgreens or tomatoes."
    ],
    diabetesTip: "Avocado's monounsaturated fats slow gastric emptying, blunting the glucose response from bread. Choose bread with at least 3g fibre per slice."
  },
  {
    name: "Chicken & Vegetable Stir Fry",
    category: "Dinner",
    calories: 340,
    prep: 20,
    description: "Lean chicken with colourful vegetables in a light sauce — minimal carbs, maximum nutrients.",
    tags: ["lean protein", "low carb", "colourful"],
    cuisine: "Asian",
    ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    glycemic: "Low",
    giScore: 20,
    ingredients: ["300g chicken breast, thinly sliced", "1 cup broccoli florets", "1 red bell pepper, sliced", "1 cup snap peas", "2 garlic cloves, minced", "1 tsp fresh ginger, grated", "2 tbsp low-sodium soy sauce", "1 tbsp sesame oil", "1 tsp cornstarch mixed with 2 tbsp water"],
    steps: [
      "Heat sesame oil in a wok or large skillet over high heat.",
      "Add chicken slices in a single layer. Stir-fry for 4–5 minutes until golden. Remove and set aside.",
      "In the same wok, add broccoli, bell pepper, and snap peas. Stir-fry for 3 minutes on high heat.",
      "Add garlic and ginger. Stir for 30 seconds until fragrant.",
      "Return chicken to the wok. Add soy sauce and cornstarch mixture. Toss everything together.",
      "Cook for 1–2 more minutes until sauce thickens slightly. Serve immediately."
    ],
    diabetesTip: "Serve without rice to keep this virtually carb-free. The ginger and garlic both have documented blood-sugar lowering properties."
  },
  {
    name: "Munggo Beans (Filipino Mung Bean Stew)",
    category: "Dinner",
    calories: 260,
    prep: 40,
    description: "Traditional Filipino mung bean stew — high fibre, plant-based protein, diabetes-friendly.",
    tags: ["high fibre", "plant-based", "traditional"],
    cuisine: "Filipino",
    ethnicity: "Southeast Asian",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
    glycemic: "Low",
    giScore: 31,
    ingredients: ["1 cup dried mung beans (monggo)", "100g pork belly or tofu (cubed)", "2 cups spinach or malunggay leaves", "1 onion, diced", "3 garlic cloves, minced", "2 tomatoes, chopped", "4 cups water or broth", "1 tbsp fish sauce (patis) or soy sauce", "1 tbsp cooking oil"],
    steps: [
      "Rinse mung beans thoroughly. Soak in water for 30 minutes to reduce cook time.",
      "Heat oil in a pot. Sauté garlic until golden, then add onion and tomatoes. Cook until softened.",
      "Add pork or tofu and cook for 3 minutes. Pour in the broth and drained mung beans.",
      "Bring to a boil, then simmer on medium heat for 25–30 minutes until beans are soft and creamy.",
      "Season with fish sauce or soy sauce. Adjust to taste.",
      "Add spinach or malunggay leaves in the last 2 minutes of cooking. Stir and serve hot with cauliflower rice."
    ],
    diabetesTip: "Mung beans have a GI of 31. The high fibre and protein combination provides hours of sustained energy with minimal glucose impact."
  },
  {
    name: "Quinoa Salad with Chickpeas",
    category: "Lunch",
    calories: 310,
    prep: 15,
    description: "Complete protein quinoa with chickpeas, cucumber, and lemon dressing. No blood sugar spike.",
    tags: ["complete protein", "plant-based", "meal prep"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    glycemic: "Low",
    giScore: 35,
    ingredients: ["½ cup quinoa, rinsed", "1 cup vegetable broth", "1 can chickpeas, drained and rinsed", "1 cucumber, diced", "1 cup cherry tomatoes, halved", "¼ red onion, finely diced", "Large handful fresh parsley", "3 tbsp olive oil", "Juice of 1 lemon", "Salt and black pepper"],
    steps: [
      "Cook quinoa in vegetable broth (not water — more flavour). Bring to boil, cover, simmer 12 minutes. Fluff with fork.",
      "Allow quinoa to cool for 5 minutes.",
      "In a large bowl, combine cooled quinoa, chickpeas, cucumber, tomatoes, and red onion.",
      "In a small bowl, whisk olive oil, lemon juice, salt, and pepper together for the dressing.",
      "Pour dressing over salad and toss well.",
      "Fold in fresh parsley. Taste and adjust seasoning. Serve at room temperature or chilled."
    ],
    diabetesTip: "Quinoa is a complete protein with a GI of just 53, lower than most grains. The chickpeas add resistant starch, which feeds gut bacteria and improves insulin sensitivity."
  },
  {
    name: "Zucchini Noodles with Turkey Bolognese",
    category: "Dinner",
    calories: 295,
    prep: 25,
    description: "Swap pasta for zucchini noodles — all the comfort, fraction of the carbs.",
    tags: ["low carb", "pasta alternative", "lean protein"],
    cuisine: "Italian",
    ethnicity: "European",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    glycemic: "Low",
    giScore: 15,
    ingredients: ["3 large zucchini (courgettes)", "300g lean turkey mince", "1 can (400g) crushed tomatoes", "1 onion, finely diced", "3 garlic cloves, minced", "1 tsp dried basil", "1 tsp dried oregano", "1 tbsp olive oil", "Salt, pepper, pinch of chilli flakes"],
    steps: [
      "Spiralise zucchini into noodles using a spiraliser or vegetable peeler. Set aside on paper towels to absorb moisture.",
      "Heat olive oil in a skillet. Brown turkey mince over medium-high heat for 5 minutes, breaking it up.",
      "Add onion and garlic. Cook for 3 more minutes until softened.",
      "Pour in crushed tomatoes. Add basil, oregano, and chilli flakes. Season well.",
      "Simmer sauce for 10 minutes until slightly thickened.",
      "In a separate pan, sauté zucchini noodles for just 2 minutes — you want them slightly firm, not mushy.",
      "Plate zucchini noodles and top with turkey bolognese. Serve immediately."
    ],
    diabetesTip: "Traditional pasta has a GI of 49–65. Zucchini noodles are essentially zero carb with a GI near 0 — a complete game-changer for pasta lovers with diabetes."
  },
  {
    name: "Overnight Oats with Cinnamon & Nuts",
    category: "Breakfast",
    calories: 280,
    prep: 5,
    description: "Rolled oats soaked overnight with cinnamon (a natural blood sugar regulator) and mixed nuts.",
    tags: ["slow release", "high fibre", "meal prep"],
    cuisine: "International",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1517673408745-02e11419c4f4?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 55,
    ingredients: ["½ cup rolled oats (not instant)", "¾ cup unsweetened almond milk", "2 tbsp Greek yogurt", "1 tsp chia seeds", "½ tsp cinnamon", "10 almonds, roughly chopped", "5 walnut halves", "½ cup blueberries (fresh or frozen)"],
    steps: [
      "In a mason jar or container with lid, add rolled oats and chia seeds.",
      "Pour in almond milk and stir in Greek yogurt.",
      "Add cinnamon and stir everything together until well combined.",
      "Seal the container and refrigerate overnight (minimum 6 hours, up to 3 days).",
      "In the morning, give it a stir. Add a splash more milk if too thick.",
      "Top with chopped almonds, walnuts, and blueberries just before eating."
    ],
    diabetesTip: "Overnight soaking increases resistant starch in oats by up to 30%, lowering the GI significantly. Cinnamon (½ tsp daily) has been clinically shown to reduce fasting blood glucose."
  },
  {
    name: "Tuna Lettuce Wraps",
    category: "Lunch",
    calories: 190,
    prep: 10,
    description: "High-protein tuna in crisp lettuce cups with avocado and tomato. Zero refined carbs.",
    tags: ["high protein", "low carb", "quick"],
    cuisine: "International",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    glycemic: "Low",
    giScore: 10,
    ingredients: ["2 cans (185g each) tuna in spring water, drained", "1 ripe avocado, diced", "1 cup cherry tomatoes, halved", "¼ red onion, finely diced", "Juice of 1 lime", "8 large butter lettuce leaves (cups)", "Salt, pepper, hot sauce to taste", "Optional: 1 tbsp light mayo"],
    steps: [
      "Drain tuna thoroughly and break into flakes in a large bowl.",
      "Add diced avocado, cherry tomatoes, and red onion.",
      "Squeeze in lime juice. Season generously with salt, pepper, and a dash of hot sauce.",
      "Gently fold everything together — keep avocado pieces chunky.",
      "Wash and dry the butter lettuce leaves. They act as your 'wrap'.",
      "Spoon the tuna mixture into each lettuce cup. Eat immediately while lettuce is crispy."
    ],
    diabetesTip: "This meal has essentially zero carbohydrate content. Tuna provides 25g of pure protein per can, which has minimal effect on blood glucose and keeps you full for hours."
  },
  {
    name: "Roasted Sweet Potato & Black Bean Bowl",
    category: "Lunch",
    calories: 350,
    prep: 35,
    description: "Sweet potato's natural sugars are balanced by black bean fibre for steady glucose release.",
    tags: ["high fibre", "plant-based", "filling"],
    cuisine: "Latin",
    ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?w=800&q=80",
    glycemic: "Medium",
    giScore: 61,
    ingredients: ["1 medium sweet potato, cubed (2cm pieces)", "1 can (400g) black beans, drained and rinsed", "1 tsp cumin", "1 tsp smoked paprika", "1 tbsp olive oil", "1 cup romaine lettuce", "½ avocado, sliced", "2 tbsp salsa", "Juice of ½ lime", "Salt and pepper"],
    steps: [
      "Preheat oven to 200°C (400°F).",
      "Toss sweet potato cubes in olive oil, cumin, smoked paprika, salt, and pepper.",
      "Spread on a baking tray and roast for 25–30 minutes, flipping halfway, until tender and caramelised.",
      "While sweet potato roasts, warm black beans in a small saucepan with a pinch of cumin and salt.",
      "Assemble bowl: start with a bed of romaine lettuce, add warm sweet potato and black beans.",
      "Top with avocado slices, salsa, and a squeeze of lime. Serve warm."
    ],
    diabetesTip: "Sweet potato has a lower GI than white potato (54 vs 82). Paired with black beans (GI 30), the overall meal GI is balanced. Eat with protein to reduce the impact further."
  },
  {
    name: "Baked Cod with Lemon & Herbs",
    category: "Dinner",
    calories: 220,
    prep: 20,
    description: "Light, lean white fish baked with herbs and lemon — virtually zero carbs, pure protein.",
    tags: ["low carb", "lean protein", "heart healthy"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    glycemic: "Low",
    giScore: 5,
    ingredients: ["2 cod fillets (150g each)", "Juice of 1 lemon", "Zest of ½ lemon", "3 garlic cloves, thinly sliced", "2 tbsp olive oil", "1 tbsp fresh parsley, chopped", "1 tbsp fresh dill", "Salt, white pepper, pinch of paprika"],
    steps: [
      "Preheat oven to 190°C (375°F). Lightly oil a baking dish.",
      "Place cod fillets in the dish. Season both sides with salt, white pepper, and paprika.",
      "In a small bowl, mix olive oil, lemon juice, lemon zest, and sliced garlic.",
      "Pour lemon-garlic mixture over the fish.",
      "Bake for 15–18 minutes until fish is opaque and flakes easily with a fork. Do not overbake.",
      "Remove from oven, scatter fresh parsley and dill on top. Serve with steamed vegetables or a large salad."
    ],
    diabetesTip: "White fish like cod is one of the purest protein sources — virtually zero carbs, zero sugar. This entire meal has a negligible effect on blood glucose."
  },
  {
    name: "Soba Noodle Bowl with Edamame",
    category: "Lunch",
    calories: 330,
    prep: 15,
    description: "Buckwheat soba noodles with protein-rich edamame, sesame dressing — a Japanese diabetes staple.",
    tags: ["whole grain", "plant protein", "Japanese"],
    cuisine: "Japanese",
    ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 46,
    ingredients: ["100g dried soba (buckwheat) noodles", "1 cup edamame beans, shelled", "1 cucumber, julienned", "2 spring onions, sliced", "1 tbsp sesame seeds", "2 tbsp low-sodium soy sauce", "1 tbsp rice vinegar", "1 tsp sesame oil", "½ tsp fresh ginger, grated"],
    steps: [
      "Cook soba noodles according to package instructions (usually 4–5 minutes). Rinse immediately under cold water.",
      "Cook edamame in salted boiling water for 3 minutes. Drain and set aside.",
      "Whisk together soy sauce, rice vinegar, sesame oil, and grated ginger for the dressing.",
      "In a large bowl, toss cooled noodles with the dressing.",
      "Add cucumber, edamame, and spring onions. Toss gently.",
      "Serve in bowls, topped with sesame seeds."
    ],
    diabetesTip: "Buckwheat (not wheat) has a GI of 46 and contains D-chiro-inositol, a compound shown to improve insulin sensitivity — making this one of the most diabetes-supportive noodle dishes."
  },
  {
    name: "Nigerian Efo Riro (Spinach Stew)",
    category: "Dinner",
    calories: 245,
    prep: 35,
    description: "Classic West African leafy green stew packed with vegetables, lean protein, and antioxidants.",
    tags: ["high fibre", "African", "antioxidants"],
    cuisine: "Nigerian",
    ethnicity: "African",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    glycemic: "Low",
    giScore: 22,
    ingredients: ["4 cups fresh spinach or ugwu leaves", "300g lean beef or tofu, cubed", "2 red bell peppers, blended", "1 scotch bonnet (optional)", "1 onion, diced", "2 tbsp palm oil or olive oil", "2 tsp locust beans (iru) — optional", "Salt, seasoning to taste"],
    steps: [
      "Blend red peppers (and scotch bonnet if using) into a rough purée.",
      "Heat oil in a pot over medium heat. Add onion and fry until golden.",
      "Add beef or tofu. Cook for 5–7 minutes until browned.",
      "Pour in pepper purée. Stir well and cook for 10 minutes until oil floats on top.",
      "Add locust beans (iru) if using. Season with salt.",
      "Add spinach in batches, stirring between each addition. Cook for just 3–4 minutes — don't overcook the greens.",
      "Serve hot with cauliflower rice or brown rice for a diabetes-friendly meal."
    ],
    diabetesTip: "Leafy greens like spinach have virtually zero glycaemic impact. This stew delivers magnesium and potassium — both nutrients that directly support insulin function."
  },
];

const ETHNICITIES = [
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

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner"];
const GI_FILTERS = ["All GI", "Low", "Low-Medium", "Medium"];
const GI_LABELS = {
  Low: "bg-green-100 text-green-700",
  "Low-Medium": "bg-yellow-100 text-yellow-700",
  Medium: "bg-orange-100 text-orange-700"
};
const GI_BAR_COLORS = {
  Low: "bg-green-500",
  "Low-Medium": "bg-yellow-400",
  Medium: "bg-orange-400"
};

export default function Meals() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [ethnicity, setEthnicity] = useState("All");
  const [giFilter, setGiFilter] = useState("All GI");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const filtered = MEALS.filter(m => {
    if (category !== "All" && m.category !== category) return false;
    if (ethnicity !== "All" && m.ethnicity !== ethnicity) return false;
    if (giFilter !== "All GI" && m.glycemic !== giFilter) return false;
    const q = search.toLowerCase();
    if (q && !m.name.toLowerCase().includes(q) && !m.tags.some(t => t.includes(q)) && !m.cuisine.toLowerCase().includes(q) && !m.ethnicity.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-blue-200/20 dark:bg-blue-900/10 pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-blue-600" />
            <span className="font-heading font-bold text-base text-blue-900 dark:text-white">Diabetes-Friendly Meals</span>
          </div>
        </div>
        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{filtered.length} meals</span>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mission strip */}
        <div className="bg-blue-600 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <Leaf className="w-5 h-5 text-blue-200 flex-shrink-0" />
          <p className="text-sm text-white"><strong>Every meal is designed for blood sugar stability</strong> — with step-by-step recipes, GI scores, and voice AI guidance. Tap any card to start cooking.</p>
        </div>

        {/* Search + category filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals, cuisines, tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={giFilter} onChange={e => setGiFilter(e.target.value)} className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {GI_FILTERS.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        {/* Ethnicity filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ETHNICITIES.map(e => (
            <button
              key={e.key}
              onClick={() => setEthnicity(e.key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                ethnicity === e.key
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              <span>{e.emoji}</span>{e.key}
              {e.key !== "All" && (
                <span className={`text-xs rounded-full px-1.5 font-semibold ${ethnicity === e.key ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                  {MEALS.filter(m => m.ethnicity === e.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ChefHat className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No meals match your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((meal, i) => (
              <motion.div
                key={meal.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                onClick={() => setSelectedMeal(meal)}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-300 transition-all group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 text-xs font-semibold px-2.5 py-1 rounded-full text-blue-700 border border-blue-100">
                    {meal.category}
                  </span>
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${GI_LABELS[meal.glycemic] || "bg-gray-100 text-gray-600"}`}>
                    GI {meal.giScore}
                  </span>
                  {/* Ethnicity badge */}
                  <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    {ETHNICITIES.find(e => e.key === meal.ethnicity)?.emoji} {meal.ethnicity}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
                    {meal.description}
                  </p>

                  {/* GI mini bar */}
                  <div className="mb-3">
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${GI_BAR_COLORS[meal.glycemic] || "bg-gray-400"}`}
                        style={{ width: `${(meal.giScore / 100) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">GI Score</span>
                      <span className={`text-xs font-semibold ${meal.glycemic === "Low" ? "text-green-600" : meal.glycemic === "Low-Medium" ? "text-yellow-600" : "text-orange-600"}`}>{meal.glycemic}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-400" />{meal.calories} cal</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-400" />{meal.prep} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      Cook <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {selectedMeal && <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}
    </div>
  );
}