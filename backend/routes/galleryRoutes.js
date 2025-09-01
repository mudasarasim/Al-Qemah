const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 📌 Upload Image API
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    await db.query("INSERT INTO gallery (url) VALUES (?)", [imageUrl]);
    res.json({ message: "Image uploaded successfully", url: imageUrl });
  } catch (err) {
    console.error("❌ Error uploading image:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Get All Images API
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM gallery ORDER BY id DESC");
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching gallery:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Delete Image API
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM gallery WHERE id = ?", [id]);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting image:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Update (Replace) Image API
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const newUrl = `/uploads/${req.file.filename}`;
    await db.query("UPDATE gallery SET url = ? WHERE id = ?", [newUrl, id]);
    res.json({ message: "Image updated successfully", url: newUrl });
  } catch (err) {
    console.error("❌ Error updating image:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
