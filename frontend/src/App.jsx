import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import Authorization from "./Components/Authorization";
import Protected from "./Components/Protected";
import Recipe from "./Components/Recipe";

import Navbar from "./Components/Navbar";
import CreateRecipe from "./Components/Createrecipe";
import AdminDashboard from "./Components/AdminDashboard";
import ManageRecipes from "./Components/ManageRecipes";


function App() {
  // ✅ Properly define token state
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        {/* other routes */}
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>

      <Routes>
        {/* Public Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Login Page */}
        <Route path="/login" element={<Authorization setToken={setToken} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Manage Recipes (Admin Only) */}
  <Route path="/admin/recipes" element={<ManageRecipes
   />} />



        {/* Protected Page (only if logged in) */}
        <Route
          path="/protected"
          element={
            token ? <Protected token={token} /> : <Authorization setToken={setToken} />
          }
        />

        {/* Recipe Details */}
        <Route path="/recipe/:recipeId" element={<Recipe />} />

        
      </Routes>
    </Router>
  );
}

export default App;

