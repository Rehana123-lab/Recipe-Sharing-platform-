import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  return (
    <nav className="bg-white text-black shadow-md">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    {/* Logo */}

    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-black">
  <img src="/logo1.png" alt="Logo" className="h-12 w-12 object-contain" />
   <span className="text-orange-600 font-serif tracking-wide">
    foodieBook
  </span>
</Link>

    

    {/* Links */}
    <div className="hidden md:flex space-x-6">
      <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
<Link to="/protected" className="text-blue-600 hover:text-blue-800">Protected</Link>

    </div>

    {/* Login / Logout */}
    {/* Login / Logout */}
{token ? (
  <button
    onClick={() => setToken(null)}
    className="px-5 py-2 rounded-full border border-red-500 text-red-500 font-semibold bg-white hover:bg-red-500 hover:text-white transition-all duration-300"
  >
    Logout
  </button>
) : (
  <Link
    to="/login"
    className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Login
  </Link>
)}
{/* Create Recipe Button */}
          <Link
            to="/create-recipe"
            className="px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300"
          >
            + Create Recipe
          </Link>

  </div>
</nav>

  );
};

export default Navbar;
