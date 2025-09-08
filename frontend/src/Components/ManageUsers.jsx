import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 ADD THIS

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // 👈 ADD THIS

  // Fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3001/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setUsers(users.filter((u) => u._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-emerald-200 p-10">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="mb-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
        Manage Users
      </h1>

      <div className="bg-white shadow-2xl rounded-3xl p-12 transition transform">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;




