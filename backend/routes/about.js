const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // ← add this

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/about";

    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 👉 Get About Info
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM about_info LIMIT 1");
    if (rows.length === 0) return res.json({});
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch About info" });
  }
});

// 👉 Add / Update About Info (Image optional)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image_url = req.file ? `/uploads/about/${req.file.filename}` : null;

    const [rows] = await db.promise().query("SELECT * FROM about_info LIMIT 1");

    if (rows.length === 0) {
      // Insert new row
      await db.promise().query(
        "INSERT INTO about_info (title, description, image_url) VALUES (?, ?, ?)",
        [title, description, image_url]
      );
    } else {
      // Update existing row
      let sql = "UPDATE about_info SET title=?, description=?";
      const params = [title, description];

      if (image_url) {
        sql += ", image_url=?";
        params.push(image_url);
      }

      sql += " WHERE id=?";
      params.push(rows[0].id);

      await db.promise().query(sql, params);
    }

    res.json({ success: true, message: "About info saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Save failed" });
  }
});

module.exports = router;
