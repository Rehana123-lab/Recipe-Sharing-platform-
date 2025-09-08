import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { Authorization: `Bearer ${token}` },
  });

  // ⬇️ One function to load recipes (we'll reuse after update/delete)
  const fetchRecipes = useCallback(async () => {
    const res = await api.get("/recipes");
    setRecipes(Array.isArray(res.data) ? res.data : []);
  }, [api]);

  useEffect(() => {
    fetchRecipes().catch((e) => {
      console.error(e);
      alert("Failed to load recipes");
    });
  }, [fetchRecipes]);

  // Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}`);
      await fetchRecipes(); // refresh list
      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  // Pre-fill edit form
  useEffect(() => {
    if (editingRecipe) {
      setEditForm({
        title: editingRecipe.title || "",
        description: editingRecipe.description || "",
        ingredients: Array.isArray(editingRecipe.ingredients)
          ? editingRecipe.ingredients.join(", ")
          : "",
        steps: Array.isArray(editingRecipe.steps)
          ? editingRecipe.steps.join(", ")
          : "",
      });
    }
  }, [editingRecipe]);

  // Update
  const handleUpdate = async () => {
    try {
      const payload = {
        title: editForm.title,
        description: editForm.description,
        ingredients: editForm.ingredients
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        steps: editForm.steps
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await api.put(`/recipes/${editingRecipe._id}`, payload);

      // Support both shapes: `{recipe: {...}}` or `{...recipe}`
      const updatedRecipe = res.data?.recipe ?? res.data;

      if (!updatedRecipe?._id) {
        // If backend didn't send the pure recipe, just refetch
        await fetchRecipes();
      } else {
        setRecipes((prev) =>
          prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
        );
      }

      setEditingRecipe(null);
      alert("Recipe updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update recipe");
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-green-100 via-white to-green-200 min-h-screen">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="mb-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-extrabold text-center text-emerald-700 mb-8">
        Manage Recipes
      </h1>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-xl rounded-2xl p-6 hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">
                {recipe?.title ?? "Untitled"}
              </h2>
              <p className="text-gray-700 mb-4">{recipe?.description}</p>

              <h3 className="font-semibold text-emerald-600">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-600 mb-3">
                {(recipe?.ingredients ?? []).map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-emerald-600">Steps:</h3>
              <ol className="list-decimal list-inside text-gray-600">
                {(recipe?.steps ?? []).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditingRecipe(recipe)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No recipes found
          </p>
        )}
      </div>

      {/* Edit Form */}
      {editingRecipe && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">Edit Recipe</h2>
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Title"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            placeholder="Description"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="text"
            value={editForm.ingredients}
            onChange={(e) =>
              setEditForm({ ...editForm, ingredients: e.target.value })
            }
            placeholder="Ingredients (comma separated)"
            className="w-full mb-3 p-3 border rounded-lg"
          />
          <input
            type="text"
            value={editForm.steps}
            onChange={(e) =>
              setEditForm({ ...editForm, steps: e.target.value })
            }
            placeholder="Steps (comma separated)"
            className="w-full mb-3 p-3 border rounded-lg"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Update Recipe
            </button>
            <button
              onClick={() => setEditingRecipe(null)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRecipes;


