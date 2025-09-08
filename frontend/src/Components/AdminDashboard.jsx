import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-emerald-200">
      {/* Top Navbar */}
      <header className="bg-gradient-to-r from-blue-800 to-emerald-700 text-white shadow-2xl">
        <div className="w-full px-16 py-8 flex justify-between items-center">
          <h1 className="text-5xl font-extrabold tracking-wide">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-800 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Links */}
      <main className="w-full px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Go to Manage Users */}
        <div className="bg-white shadow-2xl rounded-3xl p-12 hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Manage Users</h2>
          <p className="text-gray-700 text-lg mb-8">
            View or delete registered users.
          </p>
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-blue-800 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-900 transition"
          >
            Go to Users
          </button>
        </div>

        {/* Go to Manage Recipes */}
        <div className="bg-white shadow-2xl rounded-3xl p-12 hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">Manage Recipes</h2>
          <p className="text-gray-700 text-lg mb-8">
            Edit or delete user-submitted recipes.
          </p>
          <button
            onClick={() => navigate("/admin/recipes")}
            className="bg-emerald-700 text-white text-lg px-8 py-4 rounded-xl hover:bg-emerald-800 transition"
          >
            Go to Recipes
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;




