
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

// User registration
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await Users.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Username registered" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
};
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = "admin";   
  const ADMIN_PASSWORD = "admin123"; 
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin", username: ADMIN_USERNAME },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: "admin", message: "Admin logged in successfully" });
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    role: user.role || "user", // send role to frontend
    message: "Login successful"
  });
};



