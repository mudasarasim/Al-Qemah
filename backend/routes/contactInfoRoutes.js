const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET - Fetch Contact Info (only one record kept)
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM contact_info LIMIT 1");

    if (results.length === 0) {
      return res.json({
        phone1: "",
        phone2: "",
        whatsapp: "",
        email: "",
        email2: "",
        address: "",
      });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("❌ Error fetching contact info:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ POST - Update / Insert Contact Info
router.post("/", async (req, res) => {
  const { phone1, phone2, whatsapp, email, email2, address } = req.body;

  try {
    const [results] = await db.query("SELECT * FROM contact_info LIMIT 1");

    if (results.length > 0) {
      // Update if exists
      await db.query(
        "UPDATE contact_info SET phone1=?, phone2=?, whatsapp=?, email=?, email2=?, address=? WHERE id=?",
        [phone1, phone2, whatsapp, email, email2, address, results[0].id]
      );
      return res.json({ message: "Contact info updated successfully" });
    } else {
      // Insert if not exists
      await db.query(
        "INSERT INTO contact_info (phone1, phone2, whatsapp, email, email2, address) VALUES (?, ?, ?, ?, ?, ?)",
        [phone1, phone2, whatsapp, email, email2, address]
      );
      return res.json({ message: "Contact info saved successfully" });
    }
  } catch (err) {
    console.error("❌ Error saving contact info:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
