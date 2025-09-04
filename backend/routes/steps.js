const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pool = require("../config/db"); // your existing pool

// Ensure uploads/steps folder exists
const uploadDir = path.join(__dirname, "../uploads/steps");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// 👉 Get all steps
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.promise().query("SELECT * FROM steps ORDER BY step_number ASC");
    res.json(results);
  } catch (err) {
    console.error("Get Steps Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Add a step
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { step_number, title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image file is required" });
    }

    const image_url = `/uploads/steps/${req.file.filename}`;
    const [result] = await pool.promise().query(
      "INSERT INTO steps (step_number, title, description, image_url) VALUES (?, ?, ?, ?)",
      [step_number, title, description, image_url]
    );

    res.json({ success: true, id: result.insertId, image_url });
  } catch (err) {
    console.error("Add Step Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Update step
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, step_number } = req.body;
    const params = [title, description, step_number];
    let updateQuery = "UPDATE steps SET title=?, description=?, step_number=?";

    if (req.file) {
      updateQuery += ", image_url=?";
      params.push(`/uploads/steps/${req.file.filename}`);
    }

    updateQuery += " WHERE id=?";
    params.push(req.params.id);

    await pool.promise().query(updateQuery, params);
    res.json({ success: true });
  } catch (err) {
    console.error("Update Step Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Delete step
router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await pool.promise().query("SELECT image_url FROM steps WHERE id=?", [req.params.id]);
    if (rows.length > 0 && rows[0].image_url) {
      const filePath = path.join(__dirname, "..", rows[0].image_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // delete image file
      }
    }

    await pool.promise().query("DELETE FROM steps WHERE id=?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete Step Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
