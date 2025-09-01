const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In production, always keep secret in .env file
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// =======================
// Admin Login Controller
// =======================
const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "⚠️ Username and password are required" });
  }

  const sql = 'SELECT * FROM admins WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error, please try again later" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "❌ Invalid username or password" });
    }

    const admin = results[0];

    try {
      // Compare password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "❌ Invalid username or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "✅ Login successful",
        token,
        admin: {
          id: admin.id,
          username: admin.username
        }
      });

    } catch (error) {
      console.error("Error in login process:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
};

module.exports = { loginAdmin };
