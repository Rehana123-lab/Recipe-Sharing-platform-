import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Authorization = ({ setToken }) => {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [isLogin, SetIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let endpoint = "";

    if (isLogin) {
      // check for admin login
      if (username === "admin1") {
        endpoint = "adminLogin";
      } else {
        endpoint = "login";
      }
    } else {
      endpoint = "register";
    }

    try {
      const res = await axios.post(`http://localhost:3001/router/${endpoint}`, {
        username,
        password,
      });

      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
      }

      alert(res.data.message || "Success");

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.data.role === "user") {
        navigate("/"); // redirect to user homepage
      } else {
        alert("Login successful!");
      }
    } catch (err) {
      alert(err.response?.data?.error || "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Switch link */}
        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => SetIsLogin(!isLogin)}
            className="text-orange-600 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authorization;






