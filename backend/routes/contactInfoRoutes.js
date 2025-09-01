const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET - Fetch Contact Info (sirf ek hi record rakhna hai)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM contact_info LIMIT 1";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching contact info:", err);
      return res.status(500).json({ error: "Database error" });
    }
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
  });
});

// ✅ POST - Update / Insert Contact Info
router.post("/", (req, res) => {
  const { phone1, phone2, whatsapp, email, email2, address } = req.body;

  const checkSql = "SELECT * FROM contact_info LIMIT 1";
  db.query(checkSql, (err, results) => {
    if (err) {
      console.error("Error checking contact info:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      // update if exists
      const updateSql =
        "UPDATE contact_info SET phone1=?, phone2=?, whatsapp=?, email=?, email2=?, address=? WHERE id=?";
      db.query(
        updateSql,
        [phone1, phone2, whatsapp, email, email2, address, results[0].id],
        (err2) => {
          if (err2) {
            console.error("Error updating contact info:", err2);
            return res.status(500).json({ error: "Database error" });
          }
          res.json({ message: "Contact info updated successfully" });
        }
      );
    } else {
      // insert if not exists
      const insertSql =
        "INSERT INTO contact_info (phone1, phone2, whatsapp, email, email2, address) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(
        insertSql,
        [phone1, phone2, whatsapp, email, email2, address],
        (err3) => {
          if (err3) {
            console.error("Error inserting contact info:", err3);
            return res.status(500).json({ error: "Database error" });
          }
          res.json({ message: "Contact info saved successfully" });
        }
      );
    }
  });
});

module.exports = router;
