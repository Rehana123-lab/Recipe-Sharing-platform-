const express = require("express");
const User = require("../models/users");
const { authenticateJWT, isAdmin } = require("../utility/auth");

const router = express.Router();

// Get all users (admin only)
router.get("/", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // hide password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Delete a user by ID (admin only)
router.delete("/:id", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
