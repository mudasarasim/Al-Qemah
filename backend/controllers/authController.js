const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "mysecretkey"; // 🔴 isko env file me rakho production ke liye

// Admin Login
const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and Password required" });
  }

  const sql = 'SELECT * FROM admins WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    // JWT Token generate
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "✅ Login successful",
      token
    });
  });
};

module.exports = { loginAdmin };
