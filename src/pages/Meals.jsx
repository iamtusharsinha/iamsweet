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
    name: "Baba Ghanoush with Veggie Dippers",
    category: "Lunch",
    calories: 160,
    prep: 40,
    description: "Smoky roasted eggplant dip from Mayo Clinic's diabetes meal plan — low-carb, high-fibre, and packed with flavour.",
    tags: ["low carb", "plant-based", "high fibre", "snack"],
    cuisine: "Middle Eastern",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80",
    glycemic: "Low",
    giScore: 15,
    source: "https://www.mayoclinic.org/healthy-lifestyle/recipes/baba-ghanoush/rcp-20049954",
    ingredients: ["2 medium eggplants", "3 tbsp tahini", "2 garlic cloves, minced", "Juice of 1 lemon", "1 tbsp olive oil", "½ tsp cumin", "Salt and pepper", "Cucumber, bell pepper, celery for dipping"],
    steps: [
      "Preheat oven to 220°C (425°F). Pierce eggplants all over with a fork.",
      "Place whole eggplants on a baking tray. Roast 35–40 minutes until completely collapsed and charred.",
      "Let cool slightly, then peel off the skin. Drain any excess liquid.",
      "Mash or blend eggplant flesh with tahini, garlic, lemon juice, cumin, salt, and pepper.",
      "Drizzle with olive oil and sprinkle with paprika to serve.",
      "Pair with sliced cucumber, bell pepper strips, and celery as low-carb dippers."
    ],
    diabetesTip: "Eggplant is exceptionally low-carb (GI ~15) and contains nasunin, an antioxidant shown to protect cells from free radical damage linked to diabetes complications."
  },
  {
    name: "Chipotle Spiced Shrimp",
    category: "Dinner",
    calories: 195,
    prep: 15,
    description: "Smoky chipotle-seasoned shrimp — a Mayo Clinic diabetes favourite that is virtually zero-carb and ready in minutes.",
    tags: ["low carb", "high protein", "quick", "spicy"],
    cuisine: "American",
    ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
    glycemic: "Low",
    giScore: 5,
    source: "https://www.mayoclinic.org/healthy-lifestyle/recipes/chipotle-spiced-shrimp/rcp-20049652",
    ingredients: ["400g large shrimp, peeled and deveined", "1 tsp chipotle powder", "½ tsp smoked paprika", "½ tsp garlic powder", "¼ tsp cumin", "1 tbsp olive oil", "Juice of 1 lime", "Salt to taste"],
    steps: [
      "Pat shrimp dry with paper towels.",
      "Mix chipotle powder, paprika, garlic powder, cumin, and salt together.",
      "Toss shrimp in olive oil then coat with the spice mix.",
      "Heat a skillet over high heat. Add shrimp in a single layer.",
      "Cook 2 minutes per side until pink and slightly charred.",
      "Squeeze lime juice over immediately. Serve with a green salad or cauliflower rice."
    ],
    diabetesTip: "Shrimp is one of the highest protein-to-calorie foods with virtually zero carbohydrates. This entire dish has no measurable glycaemic impact."
  },
  {
    name: "Black Bean & Corn Salad",
    category: "Lunch",
    calories: 270,
    prep: 10,
    description: "A bright, fibre-rich black bean and corn salad from Mayo Clinic's diabetes meal plan — ready in 10 minutes.",
    tags: ["high fibre", "plant-based", "quick", "meal prep"],
    cuisine: "Latin",
    ethnicity: "Latin American",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80",
    glycemic: "Low",
    giScore: 30,
    source: "https://www.mayoclinic.org/healthy-lifestyle/recipes/black-bean-and-corn-relish/rcp-20049744",
    ingredients: ["1 can black beans, drained and rinsed", "1 cup corn kernels (frozen, thawed)", "1 red bell pepper, diced", "¼ red onion, diced", "Juice of 2 limes", "2 tbsp olive oil", "1 tsp cumin", "Fresh cilantro", "Salt and pepper"],
    steps: [
      "Combine black beans, corn, bell pepper, and red onion in a large bowl.",
      "Whisk lime juice, olive oil, and cumin into a dressing.",
      "Pour dressing over the salad and toss well.",
      "Fold in fresh cilantro.",
      "Season with salt and pepper to taste.",
      "Refrigerate 10 minutes before serving for best flavour. Keeps 3 days in the fridge."
    ],
    diabetesTip: "Black beans have a GI of just 30 and are loaded with resistant starch — a type of fibre that feeds beneficial gut bacteria and measurably improves insulin sensitivity."
  },
  {
    name: "Ginger-Marinated Portobello Mushrooms",
    category: "Dinner",
    calories: 145,
    prep: 30,
    description: "Meaty portobello mushrooms marinated in ginger and soy — a satisfying plant-based Mayo Clinic dinner.",
    tags: ["plant-based", "low calorie", "anti-inflammatory"],
    cuisine: "Asian",
    ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    glycemic: "Low",
    giScore: 10,
    source: "https://www.mayoclinic.org/healthy-lifestyle/recipes/ginger-marinated-grilled-portobello-mushrooms/rcp-20049663",
    ingredients: ["4 large portobello mushroom caps", "2 tbsp low-sodium soy sauce", "1 tbsp fresh ginger, grated", "2 garlic cloves, minced", "1 tbsp rice vinegar", "1 tbsp sesame oil", "1 tsp honey", "Spring onions to garnish"],
    steps: [
      "Whisk soy sauce, ginger, garlic, rice vinegar, sesame oil, and honey into a marinade.",
      "Place mushroom caps gill-side up in a shallow dish. Pour marinade over them.",
      "Marinate at least 20 minutes, flipping once halfway through.",
      "Heat a grill or grill pan to medium-high. Grill mushrooms 5 minutes per side until tender.",
      "Baste with remaining marinade while grilling.",
      "Slice and serve over brown rice or cauliflower rice. Garnish with spring onions."
    ],
    diabetesTip: "Portobello mushrooms are extremely low in carbs and calories while providing beta-glucans — compounds that slow glucose absorption in the gut. Ginger further supports blood sugar regulation."
  },
  {
    name: "Roasted Butternut Squash Soup",
    category: "Dinner",
    calories: 210,
    prep: 45,
    description: "Velvety roasted butternut squash soup from Mayo Clinic — naturally sweet, warming, and blood sugar-friendly.",
    tags: ["plant-based", "anti-inflammatory", "high fibre"],
    cuisine: "American",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 51,
    source: "https://www.mayoclinic.org/healthy-lifestyle/recipes/roasted-butternut-squash-fries/rcp-20197740",
    ingredients: ["1 large butternut squash, peeled and cubed", "1 onion, diced", "3 garlic cloves", "1 tsp cinnamon", "½ tsp nutmeg", "4 cups vegetable broth", "1 tbsp olive oil", "Salt and pepper", "Pumpkin seeds to garnish"],
    steps: [
      "Preheat oven to 200°C (400°F). Toss squash cubes in olive oil, salt, and pepper.",
      "Spread on a baking tray and roast 30 minutes until caramelised.",
      "In a pot, sauté onion and garlic until soft, about 5 minutes.",
      "Add roasted squash, cinnamon, nutmeg, and vegetable broth.",
      "Simmer 10 minutes then blend until completely smooth.",
      "Season to taste. Serve hot topped with pumpkin seeds."
    ],
    diabetesTip: "Roasting butternut squash concentrates its flavour without adding carbs. Its fibre slows sugar absorption, and cinnamon actively supports insulin sensitivity."
  },
  {
    name: "Artichoke, Spinach & White Bean Dip",
    category: "Lunch",
    calories: 175,
    prep: 20,
    description: "A creamy, protein-rich dip from Mayo Clinic's diabetes plan — artichokes, spinach, and white beans with whole grain dippers.",
    tags: ["high fibre", "plant protein", "snack"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low",
    giScore: 31,
    source: "https://www.mayoclinic.org/healthy-lifestyle/recipes/artichoke-spinach-white-bean-dip/rcp-20152939",
    ingredients: ["1 can white beans, drained and rinsed", "1 can artichoke hearts, drained", "2 cups fresh spinach", "2 garlic cloves", "2 tbsp olive oil", "Juice of 1 lemon", "¼ tsp chilli flakes", "Salt and pepper"],
    steps: [
      "Sauté spinach in a little olive oil until wilted, about 2 minutes. Set aside.",
      "Add white beans, artichoke hearts, garlic, lemon juice, and olive oil to a food processor.",
      "Blend until smooth. Add the wilted spinach and pulse a few more times.",
      "Season with chilli flakes, salt, and pepper.",
      "Transfer to a bowl, drizzle with extra olive oil.",
      "Serve with whole-grain crackers, celery sticks, or bell pepper slices."
    ],
    diabetesTip: "White beans have a GI of just 31 and are one of the richest plant sources of resistant starch. Artichokes contain inulin — a prebiotic fibre that improves insulin sensitivity."
  },
  {
    name: "Spinach & Mozzarella Egg White Bites",
    category: "Breakfast",
    calories: 180,
    prep: 25,
    description: "Light protein-packed egg white bites with spinach and mozzarella — ADA-approved, great for blood sugar stability.",
    tags: ["high protein", "low carb", "meal prep"],
    cuisine: "American",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    glycemic: "Low",
    giScore: 10,
    source: "https://diabetesfoodhub.org/recipes/breakfast-brunch",
    ingredients: ["6 egg whites", "1 cup fresh spinach, chopped", "½ cup shredded mozzarella", "¼ cup diced red bell pepper", "Salt, pepper, garlic powder", "Cooking spray"],
    steps: [
      "Preheat oven to 180°C (350°F). Spray a 12-cup muffin tin with cooking spray.",
      "Whisk egg whites with salt, pepper, and garlic powder until frothy.",
      "Distribute chopped spinach, mozzarella, and bell pepper evenly across cups.",
      "Pour egg white mixture over the fillings, filling each cup about ¾ full.",
      "Bake 18–20 minutes until set and lightly golden on top.",
      "Cool for 5 minutes before removing. Store in the fridge for up to 4 days."
    ],
    diabetesTip: "Egg whites are pure protein with zero carbs — no blood sugar impact at all. Spinach adds magnesium which directly supports insulin function."
  },
  {
    name: "Cinnamon Apple Oatmeal",
    category: "Breakfast",
    calories: 260,
    prep: 10,
    description: "Warm rolled oats with diced apple and cinnamon — a cosy ADA-recommended breakfast that keeps glucose steady.",
    tags: ["slow release", "high fibre", "warm"],
    cuisine: "American",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 52,
    source: "https://diabetesfoodhub.org/recipes/breakfast-brunch",
    ingredients: ["½ cup rolled oats", "1 cup water or unsweetened almond milk", "½ medium apple, diced small", "½ tsp cinnamon", "Pinch of nutmeg", "1 tsp honey or sugar-free sweetener (optional)"],
    steps: [
      "Bring water or almond milk to a boil in a small saucepan.",
      "Stir in rolled oats. Reduce heat to medium and cook 4–5 minutes, stirring occasionally.",
      "Add diced apple in the last 2 minutes of cooking.",
      "Remove from heat. Stir in cinnamon and nutmeg.",
      "Sweeten with honey or sugar-free sweetener if desired.",
      "Serve warm. Top with a few chopped walnuts for added healthy fat."
    ],
    diabetesTip: "Rolled oats have significantly lower GI than instant oats. Cinnamon has clinical evidence for reducing fasting blood glucose — ½ tsp daily makes a measurable difference."
  },
  {
    name: "Spinach & Feta Omelet",
    category: "Breakfast",
    calories: 220,
    prep: 10,
    description: "Classic Mediterranean omelet — protein-rich eggs with wilted spinach and tangy feta. Zero blood sugar impact.",
    tags: ["high protein", "low carb", "Mediterranean"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80",
    glycemic: "Low",
    giScore: 8,
    source: "https://diabetesfoodhub.org/recipes/breakfast-brunch",
    ingredients: ["3 large eggs", "1 cup fresh spinach", "¼ cup crumbled feta cheese", "1 tbsp olive oil", "Salt and pepper to taste", "Pinch of dried oregano"],
    steps: [
      "Whisk eggs with a pinch of salt, pepper, and oregano until well combined.",
      "Heat olive oil in a non-stick skillet over medium heat.",
      "Add spinach and sauté for 1 minute until wilted. Remove and set aside.",
      "Pour eggs into the pan. Let them set on the bottom for 1 minute.",
      "Scatter wilted spinach and feta over one half of the omelet.",
      "Fold omelet in half. Cook 30 more seconds. Slide onto plate and serve."
    ],
    diabetesTip: "Eggs have a glycaemic index of essentially zero. The protein and fat combination keeps you full for 3–4 hours with no glucose spike."
  },
  {
    name: "Grilled Honey-Lime Chicken",
    category: "Lunch",
    calories: 290,
    prep: 20,
    description: "Juicy grilled chicken with a bright honey-lime marinade — lean protein that pairs with any vegetable side.",
    tags: ["lean protein", "grilled", "low carb"],
    cuisine: "American",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80",
    glycemic: "Low",
    giScore: 15,
    source: "https://diabetesfoodhub.org/recipes/lunch",
    ingredients: ["2 chicken breasts (150g each)", "Juice of 2 limes", "1 tbsp honey", "2 garlic cloves, minced", "1 tsp cumin", "1 tbsp olive oil", "Salt and pepper"],
    steps: [
      "Whisk lime juice, honey, garlic, cumin, olive oil, salt and pepper into a marinade.",
      "Place chicken in a zip-lock bag with marinade. Refrigerate at least 30 minutes (or overnight).",
      "Preheat grill or grill pan to medium-high heat.",
      "Grill chicken 6–7 minutes per side until cooked through (internal temp 75°C/165°F).",
      "Rest for 5 minutes before slicing.",
      "Serve over a green salad or with roasted vegetables."
    ],
    diabetesTip: "Pure lean protein like chicken breast has zero glycaemic impact. The small amount of honey in the marinade is minimal per serving — easily offset by the protein content."
  },
  {
    name: "Mediterranean Chopped Jar Salad",
    category: "Lunch",
    calories: 310,
    prep: 15,
    description: "Layers of crisp vegetables, chickpeas, olives, and feta in a jar — ADA-recommended meal prep lunch.",
    tags: ["meal prep", "high fibre", "plant-based", "Mediterranean"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    glycemic: "Low",
    giScore: 28,
    source: "https://diabetesfoodhub.org/recipes/lunch",
    ingredients: ["1 can chickpeas, drained", "1 cucumber, diced", "1 cup cherry tomatoes, halved", "½ cup kalamata olives, halved", "¼ cup crumbled feta", "2 cups romaine lettuce, chopped", "3 tbsp olive oil", "2 tbsp red wine vinegar", "Salt, dried oregano"],
    steps: [
      "Whisk olive oil, red wine vinegar, oregano, and salt into a dressing.",
      "In a large jar or bowl, layer in order: chickpeas, cucumber, tomatoes, olives, feta.",
      "Add romaine on top (keeps it from getting soggy until ready to eat).",
      "Pour dressing over just before eating.",
      "Shake jar or toss bowl to combine everything.",
      "Makes 2 servings — refrigerate the second jar for next day's lunch."
    ],
    diabetesTip: "Chickpeas are one of the lowest-GI legumes (GI 28). The vinegar in the dressing further lowers the glycaemic response of the entire meal."
  },
  {
    name: "Turkey & Veggie Stir-Fry",
    category: "Lunch",
    calories: 300,
    prep: 20,
    description: "Lean turkey mince with colourful vegetables in a light sauce — an ADA favourite for blood sugar control.",
    tags: ["lean protein", "low carb", "quick"],
    cuisine: "Asian",
    ethnicity: "East Asian",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    glycemic: "Low",
    giScore: 18,
    source: "https://diabetesfoodhub.org/recipes/lunch",
    ingredients: ["300g lean turkey mince", "1 cup broccoli florets", "1 red bell pepper, sliced", "1 cup snap peas", "2 garlic cloves, minced", "1 tsp grated ginger", "2 tbsp low-sodium soy sauce", "1 tbsp sesame oil", "Chilli flakes to taste"],
    steps: [
      "Heat sesame oil in a wok over high heat.",
      "Add turkey mince. Cook 5 minutes, breaking it apart, until browned.",
      "Add garlic and ginger. Stir 30 seconds.",
      "Add broccoli, bell pepper, and snap peas. Stir-fry 3–4 minutes.",
      "Drizzle in soy sauce and chilli flakes. Toss everything well.",
      "Serve as-is or over a small portion of brown rice."
    ],
    diabetesTip: "Turkey is one of the leanest proteins available. Serving this without rice keeps the meal virtually carb-free with no blood glucose impact."
  },
  {
    name: "Pesto Chicken Wrap",
    category: "Lunch",
    calories: 340,
    prep: 10,
    description: "Grilled chicken with basil pesto, crisp greens, and tomatoes wrapped in a whole-wheat tortilla.",
    tags: ["quick", "high protein", "whole grain"],
    cuisine: "Italian",
    ethnicity: "European",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 48,
    source: "https://diabetesfoodhub.org/recipes/lunch",
    ingredients: ["1 large whole-wheat tortilla", "150g cooked chicken breast, sliced", "2 tbsp basil pesto", "1 cup mixed greens", "½ cup cherry tomatoes, halved", "2 tbsp shaved parmesan", "Salt and pepper"],
    steps: [
      "Warm the whole-wheat tortilla in a dry pan for 30 seconds per side.",
      "Spread pesto evenly over the tortilla.",
      "Layer greens, chicken slices, tomatoes, and parmesan.",
      "Season with salt and pepper.",
      "Roll tightly, tucking in the sides as you go.",
      "Slice diagonally and serve immediately or wrap in foil to take on the go."
    ],
    diabetesTip: "Whole-wheat tortillas have a lower GI than white flour wraps. The high protein from chicken slows glucose absorption from the carbohydrates."
  },
  {
    name: "Strawberry-Jalapeño Salsa Grilled Chicken",
    category: "Dinner",
    calories: 310,
    prep: 25,
    description: "Grilled chicken topped with a vibrant fresh strawberry and jalapeño salsa — a stunning ADA-featured dinner.",
    tags: ["lean protein", "low carb", "antioxidants"],
    cuisine: "American",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80",
    glycemic: "Low",
    giScore: 20,
    source: "https://diabetesfoodhub.org/recipes/dinner",
    ingredients: ["2 chicken breasts", "1 cup fresh strawberries, diced", "1 jalapeño, seeded and minced", "¼ red onion, finely diced", "Juice of 1 lime", "2 tbsp fresh cilantro", "1 tbsp olive oil", "Salt and pepper"],
    steps: [
      "Season chicken breasts with olive oil, salt, and pepper.",
      "Grill over medium-high heat 6–7 minutes per side until cooked through.",
      "While chicken grills, combine strawberries, jalapeño, red onion, lime juice, and cilantro in a bowl.",
      "Season salsa with a pinch of salt. Let flavours meld for 5 minutes.",
      "Slice grilled chicken and plate it.",
      "Spoon the strawberry-jalapeño salsa generously over the top. Serve immediately."
    ],
    diabetesTip: "Strawberries have one of the lowest GI scores of any fruit (GI 41) and are rich in polyphenols that improve insulin sensitivity. This dish is near-zero carb overall."
  },
  {
    name: "Lamb Chops with Spring Vegetables",
    category: "Dinner",
    calories: 420,
    prep: 30,
    description: "Tender grilled lamb chops with seasonal spring vegetables — rich in protein and zinc for diabetes management.",
    tags: ["lean protein", "grilled", "low carb"],
    cuisine: "Mediterranean",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    glycemic: "Low",
    giScore: 12,
    source: "https://diabetesfoodhub.org/recipes/dinner",
    ingredients: ["4 lamb loin chops", "1 cup asparagus, trimmed", "1 cup green peas", "1 cup baby potatoes, halved", "3 garlic cloves, minced", "2 tbsp olive oil", "1 tbsp fresh rosemary", "Juice of ½ lemon", "Salt and pepper"],
    steps: [
      "Marinate lamb chops in olive oil, garlic, rosemary, salt, and pepper for at least 20 minutes.",
      "Boil baby potatoes 10 minutes until just tender. Drain.",
      "Heat a grill pan over high heat. Grill lamb chops 3–4 minutes per side for medium-rare.",
      "In the same pan, sauté asparagus and peas for 3 minutes with a drizzle of olive oil.",
      "Arrange lamb, potatoes, and vegetables on a plate.",
      "Squeeze lemon over everything and serve immediately."
    ],
    diabetesTip: "Lamb provides zinc, which plays a direct role in insulin synthesis and secretion. Using baby potatoes in a small portion keeps the overall carb load moderate."
  },
  {
    name: "Spiced Ginger Carrot Soup",
    category: "Dinner",
    calories: 195,
    prep: 30,
    description: "Velvety ginger and carrot soup with anti-inflammatory spices — warming, low-calorie, and blood sugar friendly.",
    tags: ["anti-inflammatory", "plant-based", "low calorie"],
    cuisine: "International",
    ethnicity: "Western",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    glycemic: "Low-Medium",
    giScore: 45,
    source: "https://diabetesfoodhub.org/recipes/dinner",
    ingredients: ["500g carrots, peeled and chopped", "1 onion, diced", "3 garlic cloves", "2 tsp fresh ginger, grated", "1 tsp cumin", "½ tsp turmeric", "4 cups vegetable broth", "1 tbsp olive oil", "Salt and pepper", "Squeeze of lemon"],
    steps: [
      "Heat olive oil in a large pot. Sauté onion and garlic 5 minutes until soft.",
      "Add ginger, cumin, and turmeric. Stir 1 minute until fragrant.",
      "Add carrots and vegetable broth. Bring to a boil.",
      "Reduce heat and simmer 20 minutes until carrots are very tender.",
      "Blend until silky smooth using an immersion blender.",
      "Season with salt, pepper, and a squeeze of lemon. Serve hot."
    ],
    diabetesTip: "Ginger has clinically demonstrated blood glucose-lowering effects. Turmeric's curcumin reduces insulin resistance. This soup is both medicine and comfort food."
  },
  {
    name: "Lentil Soup with Dates & Spinach",
    category: "Dinner",
    calories: 280,
    prep: 35,
    description: "Rich lentil soup from the ADA Food Hub — fibre-dense, plant-based protein with a touch of natural sweetness from dates.",
    tags: ["high fibre", "plant-based", "iron-rich"],
    cuisine: "Middle Eastern",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1562016776-c7786f4c2d80?w=800&q=80",
    glycemic: "Low",
    giScore: 30,
    source: "https://diabetesfoodhub.org/recipes/lunch",
    ingredients: ["1 cup green or brown lentils, rinsed", "3 Medjool dates, pitted and chopped", "2 cups spinach", "1 onion, diced", "3 garlic cloves", "1 tsp cumin", "½ tsp cinnamon", "4 cups vegetable broth", "1 tbsp olive oil", "Juice of ½ lemon"],
    steps: [
      "Heat olive oil in a pot. Sauté onion and garlic until soft, about 5 minutes.",
      "Add cumin and cinnamon. Stir 30 seconds.",
      "Add rinsed lentils, chopped dates, and vegetable broth.",
      "Bring to a boil then simmer 25 minutes until lentils are tender.",
      "Stir in spinach and cook 2 more minutes.",
      "Finish with lemon juice. Adjust seasoning and serve hot."
    ],
    diabetesTip: "Lentils have a GI of just 30. Though dates are sweet, the fibre in this soup slows sugar absorption dramatically — the overall glycaemic response is very low."
  },
  {
    name: "Chicken Shawarma Collard Wraps",
    category: "Lunch",
    calories: 320,
    prep: 25,
    description: "Shawarma-spiced chicken in collard green leaves — a low-carb grain-free wrap bursting with Middle Eastern flavour.",
    tags: ["low carb", "high protein", "grain-free"],
    cuisine: "Middle Eastern",
    ethnicity: "Mediterranean",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80",
    glycemic: "Low",
    giScore: 14,
    source: "https://diabetesfoodhub.org/recipes/lunch",
    ingredients: ["300g chicken breast, thinly sliced", "4 large collard green leaves", "1 tsp cumin", "1 tsp smoked paprika", "½ tsp turmeric", "½ tsp garlic powder", "1 tbsp olive oil", "½ cup hummus", "¼ cup diced tomato", "¼ cup sliced cucumber"],
    steps: [
      "Mix cumin, paprika, turmeric, garlic powder, salt, and olive oil into a marinade.",
      "Coat chicken slices and cook in a hot skillet 4–5 minutes per side until charred and cooked through.",
      "Trim the thick stem from each collard leaf to make it pliable.",
      "Spread 2 tbsp hummus down the centre of each leaf.",
      "Layer chicken, tomato, and cucumber on top.",
      "Roll tightly like a burrito. Slice in half and serve."
    ],
    diabetesTip: "Collard leaves replace tortilla (GI 70+) with essentially zero carbs. Hummus adds plant protein and fibre that further slow any glucose response."
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