const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

// Upload folder set karna
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage: storage });

// 📌 Upload Image API
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  const sql = "INSERT INTO gallery (url) VALUES (?)";
  db.query(sql, [imageUrl], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Image uploaded successfully", url: imageUrl });
  });
});

// 📌 Get All Images API
router.get("/", (req, res) => {
  const sql = "SELECT * FROM gallery ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 📌 Delete Image API
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM gallery WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Image deleted successfully" });
  });
});

// 📌 Update (Replace) Image API
router.put("/update/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const newUrl = `/uploads/${req.file.filename}`;
  const sql = "UPDATE gallery SET url = ? WHERE id = ?";
  db.query(sql, [newUrl, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Image updated successfully", url: newUrl });
  });
});
module.exports = router;
