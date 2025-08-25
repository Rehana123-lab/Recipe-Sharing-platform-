import React from "react";
import { useParams } from "react-router-dom";

const recipes = {
  "chicken-biriyani": {
    name: "Chicken biriyani",
    description: "Fragrant basmati rice layered with spiced, tender chicken and herbs, cooked on dum for rich aroma and flavor.",
    ingredients: [
      "700g chicken (bone-in preferred)",
    "2 cups basmati rice (soaked 30 mins)",
    "3 onions (thinly sliced)",
    "2 tomatoes (chopped)",
    "1/2 cup yogurt",
    "2 tsp ginger-garlic paste",
    "2–3 green chilies (slit)",
    "1/2 cup mint leaves",
    "1/2 cup coriander leaves",
    "Whole spices (2 bay leaves, 1\" cinnamon, 4 cloves, 4 green cardamom)",
    "2 tsp biryani masala",
    "1/2 tsp turmeric",
    "1 tsp chili powder",
    "1 tsp garam masala",
    "Juice of 1/2 lemon",
    "3 tbsp oil + 2 tbsp ghee",
    "Saffron strands in 1/4 cup warm milk (optional)",
    "Salt"
    ],
    steps: [
      "Rinse and soak rice 30 mins. Boil water with salt and half the whole spices; parboil rice to ~70% doneness. Drain and set aside.",
    "Heat oil; fry sliced onions until deep golden (birista). Reserve half for layering.",
    "Marinate chicken with yogurt, ginger-garlic paste, chili powder, turmeric, biryani masala, lemon juice, and salt (15–30 mins).",
    "In the same pot, add ghee and remaining whole spices; sauté 30 seconds. Add tomatoes and cook till soft.",
    "Add marinated chicken; cook on medium until sealed and ~70% cooked, oil separates.",
    "Stir in half of the mint and coriander.",
    "Layering: Spread half the parboiled rice over chicken. Top with fried onions, remaining herbs, saffron milk (if using), and a pinch of garam masala. Add remaining rice and repeat toppings.",
    "Seal the pot (foil or tight lid). Cook on low heat (dum) for 20–25 minutes until rice and chicken are fully done.",
    "Rest 10 minutes, fluff gently, and serve hot with raita and salad."
    ]
  },

  "kerala-meals": {
  name: "Kerala Meals",
  description: "Traditional Kerala-style rice meal served with curries, sambar, rasam, and side dishes.",
  ingredients: [
    "2 cups rice (matta rice preferred)",
    "1 cup sambar",
    "1/2 cup rasam",
    "1/2 cup moru curry (buttermilk curry)",
    "Avial (mixed vegetables with coconut)",
    "Thoran (vegetable stir-fry with coconut)",
    "Olan (ash gourd curry with coconut milk)",
    "Pickles (mango, lime)",
    "Pappadam",
    "Banana chips",
    "Salt as needed"
  ],
  steps: [
    "Cook rice until fluffy and set aside.",
    "Prepare sambar with tamarind, dal, and mixed vegetables.",
    "Make rasam with tamarind, tomatoes, and spices.",
    "Cook moru curry using buttermilk, turmeric, and curry leaves.",
    "Prepare side dishes: avial, thoran, and olan.",
    "Serve rice on a banana leaf with curries, side dishes, pappadam, and chips.",
    "Enjoy the traditional Kerala sadya-style meal."
  ]
},


  "spicy-noodles": {
  name: "Spicy Schezwan Noodles",
  description: "Fiery Indo-Chinese style noodles tossed with vegetables and a bold Schezwan sauce.",
  ingredients: [
    "200g noodles",
    "1 onion (sliced)",
    "1 capsicum (sliced)",
    "1 carrot (julienned)",
    "1/2 cup cabbage (shredded)",
    "2–3 spring onions (chopped)",
    "2 tsp ginger-garlic paste",
    "2 tbsp Schezwan sauce",
    "1 tbsp soy sauce",
    "1 tbsp chili sauce",
    "1 tbsp tomato ketchup",
    "2 tbsp oil",
    "Salt & pepper"
  ],
  steps: [
    "Boil noodles until 90% cooked, drain, and toss with a little oil to prevent sticking.",
    "Heat oil in a wok, sauté ginger-garlic paste for a minute.",
    "Add onion, carrot, capsicum, and cabbage; stir-fry on high heat for 2–3 minutes.",
    "Add Schezwan sauce, soy sauce, chili sauce, and ketchup; mix well.",
    "Toss in the cooked noodles, season with salt and pepper.",
    "Garnish with chopped spring onions and serve hot."
  ]
},


  pasta: {
    name: "Creamy Pasta",
    description: "Classic Italian pasta with creamy white sauce.",
    ingredients: ["200g pasta", "1 cup cream", "Cheese", "Garlic", "Butter", "Salt & pepper"],
    steps: [
      "Boil pasta until al dente.",
      "In a pan, heat butter and sauté garlic.",
      "Add cream and cheese, stir well.",
      "Mix in pasta and cook for 2 minutes.",
      "Serve hot with herbs sprinkled."
    ]
  },
  cake: {
    name: "Chocolate Cake",
    description: "Moist, rich, and absolutely delicious chocolate cake.",
    ingredients: ["2 cups flour", "1 cup sugar", "1 cup cocoa powder", "2 eggs", "Butter", "Milk"],
    steps: [
      "Mix flour, cocoa, and sugar.",
      "Add eggs, butter, and milk, whisk well.",
      "Pour into a baking tin.",
      "Bake at 180°C for 30-35 mins.",
      "Cool and serve with frosting."
    ]
  },
  brownie: {
  name: "Chocolate Brownie",
  description: "Rich, fudgy chocolate brownies with a soft center and crispy edges.",
  ingredients: [
    "1/2 cup butter",
    "1 cup sugar",
    "2 eggs",
    "1/2 cup all-purpose flour",
    "1/3 cup cocoa powder",
    "1/4 tsp baking powder",
    "1/4 tsp salt",
    "1 tsp vanilla extract",
    "1/2 cup chocolate chips (optional)"
  ],
  steps: [
    "Preheat oven to 180°C (350°F) and grease a baking pan.",
    "Melt butter and mix with sugar until smooth.",
    "Beat in eggs and vanilla extract.",
    "Sift in flour, cocoa powder, baking powder, and salt; mix gently.",
    "Fold in chocolate chips if using.",
    "Pour batter into the baking pan and spread evenly.",
    "Bake for 20–25 minutes until set but still fudgy inside.",
    "Cool slightly, cut into squares, and serve warm or chilled."
  ]
}

};

const Recipe = () => {
  const { recipeId } = useParams();
  const recipe = recipes[recipeId];

  if (!recipe) return <h2 className="text-center mt-10">Recipe not found!</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <p className="mb-4 text-gray-600">{recipe.description}</p>

      <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Steps</h2>
      <ol className="list-decimal list-inside">
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;
