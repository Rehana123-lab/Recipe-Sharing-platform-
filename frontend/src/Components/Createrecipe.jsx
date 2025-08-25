import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Utensils, FileText, ListChecks, ClipboardList, Image } from "lucide-react";

const Createrecipe = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [image, setImage] = useState(""); // <-- new state for image
  const navigate = useNavigate();

  // Handlers
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3001/recipes",
        { title, description, ingredients, steps, image }, // include image
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to share recipe");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-200 to-orange-300 p-10 flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/20 w-full max-w-3xl">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/20">
          <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-6">
            Create a New Recipe
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Title */}
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2 text-orange-600">
                <Utensils size={20} /> Recipe Title
              </label>
              <input
                type="text"
                placeholder="Enter recipe..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2 text-orange-600">
                <FileText size={20} /> Description
              </label>
              <textarea
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                rows={3}
              />
            </div>

      

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-orange-600 no-underline">
                <ListChecks size={20} /> Ingredients
              </h3>
              {ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  

                  <input
                    type="text"
                    placeholder={`Ingredient ${index + 1}`}
                    value={ing}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 no-underline"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="bg-red-500 text-white px-3 rounded-xl hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="bg-green-500 text-black px-4 py-2 rounded-xl hover:bg-green-600 mt-2"
              >
                + Add Ingredient
              </button>
            </div>

            {/* Steps */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-orange-600">
                <ClipboardList size={20} /> Steps
              </h3>
              {steps.map((step, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Step ${index + 1}`}
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 no-underline"
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="bg-red-500 text-white px-3 rounded-xl hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 mt-2"
              >
                + Add Step
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-pink-500 text-black py-3 rounded-xl font-bold hover:bg-pink-600 transition transform hover:scale-105 shadow-lg"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createrecipe;






