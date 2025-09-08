const express = require("express");
const Recipe = require("../models/Recipe");
const { authenticateJWT, isAdmin } = require("../utility/auth");

const router = express.Router();

// Share a New Recipe (user or admin)
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;

    if (!title || !ingredients || !steps) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      createdBy: req.user.userId,
    });

    await recipe.save();
    res.status(201).json({ message: "Recipe shared successfully!", recipe });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to share recipe" });
  }
});

// Get all recipes (public)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Update recipe (admin only)
router.put("/:id", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, description, ingredients, steps },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe updated successfully!", recipe: updatedRecipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// Delete recipe (admin only)
router.delete("/:id", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

module.exports = router;





// const express = require("express");
// const Recipe = require("../models/Recipe");
// const verifyToken = require("../utility/auth");

// const router = express.Router();

// //  Share a New Recipe (requires token)
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const { title, description, ingredients, steps } = req.body;

//     if (!title || !ingredients || !steps) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const recipe = new Recipe({
//       title,
//       description,
//       ingredients,
//       steps,
//       createdBy: req.user.userId, //  use userId from JWT
//     });

//     await recipe.save();
//     res.status(201).json({ message: "Recipe shared successfully!", recipe });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: "Failed to share recipe" });
//   }
// });

// // Get all recipes
// router.get("/", async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch recipes" });
//   }
// });

// //  Update a recipe by ID (requires token)
// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const { title, description, ingredients, steps } = req.body;

//     const updatedRecipe = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       { title, description, ingredients, steps },
//       { new: true, runValidators: true }
//     );

//     if (!updatedRecipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     res.json({ message: "Recipe updated successfully!", recipe: updatedRecipe });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update recipe" });
//   }
// });

// //  Delete a recipe by ID (requires token)
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const recipe = await Recipe.findByIdAndDelete(req.params.id);
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }
//     res.json({ message: "Recipe deleted successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete recipe" });
//   }
// });

// module.exports = router;



