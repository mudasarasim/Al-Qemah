const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 👉 Get Contact Info
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM contact_info LIMIT 1");
    if (rows.length === 0) return res.json({});
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch contact info" });
  }
});

// 👉 Update or Insert Contact Info (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { address, phone1, phone2, email1, email2, whatsapp } = req.body;
    const id = req.params.id;

    const [rows] = await db.promise().query("SELECT * FROM contact_info WHERE id=?", [id]);

    if (rows.length === 0) {
      // Insert if not exists
      await db.promise().query(
        "INSERT INTO contact_info (id, address, phone1, phone2, email1, email2, whatsapp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, address, phone1, phone2 || null, email1, email2 || null, whatsapp || null]
      );
    } else {
      // Update existing
      await db.promise().query(
        "UPDATE contact_info SET address=?, phone1=?, phone2=?, email1=?, email2=?, whatsapp=? WHERE id=?",
        [address, phone1, phone2 || null, email1, email2 || null, whatsapp || null, id]
      );
    }

    res.json({ success: true, message: "Contact info saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Save failed" });
  }
});

module.exports = router;
