const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db"); // your existing pool

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// =====================
// 📤 Upload Image
// =====================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const [result] = await db.promise().query(
      "INSERT INTO gallery (image_url) VALUES (?)",
      [imagePath]
    );

    res.json({
      success: true,
      message: "Image uploaded successfully",
      image: { id: result.insertId, image_url: imagePath },
    });
  } catch (err) {
    console.error("Upload Image Error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// =====================
// 📸 Fetch All Images
// =====================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM gallery ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("Fetch Images Error:", err);
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

// =====================
// 🗑️ Delete Image by ID
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.promise().query("SELECT * FROM gallery WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, "..", rows[0].image_url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await db.promise().query("DELETE FROM gallery WHERE id = ?", [id]);

    res.json({ success: true, message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete Image Error:", err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// =====================
// ✏️ Update (Replace) Image
// =====================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.promise().query("SELECT * FROM gallery WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No new image uploaded" });
    }

    const newImagePath = `/uploads/${req.file.filename}`;

    // Delete old file from disk
    const oldFilePath = path.join(__dirname, "..", rows[0].image_url);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    await db.promise().query(
      "UPDATE gallery SET image_url = ? WHERE id = ?",
      [newImagePath, id]
    );

    res.json({
      success: true,
      message: "Image updated successfully",
      image: { id, image_url: newImagePath },
    });
  } catch (err) {
    console.error("Update Image Error:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

module.exports = router;
