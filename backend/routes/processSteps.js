const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// ✅ GET - Fetch all steps
router.get("/", (req, res) => {
  const sql = "SELECT * FROM process_steps ORDER BY step_no ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching steps:", err);
      return res.status(500).json({ error: "Failed to fetch steps" });
    }
    res.status(200).json(results);
  });
});

// ✅ POST - Add new step (with image upload)
router.post("/", upload.single("image"), (req, res) => {
  const { step_no, title, description } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  if (!step_no || !img || !title || !description) {
    return res
      .status(400)
      .json({ error: "All fields (step_no, image, title, description) are required" });
  }

  const sql = "INSERT INTO process_steps (step_no, img, title, description) VALUES (?, ?, ?, ?)";
  db.query(sql, [step_no, img, title, description], (err, result) => {
    if (err) {
      console.error("❌ Error inserting step:", err);
      return res.status(500).json({ error: "Failed to add step" });
    }
    res.status(201).json({ message: "✅ Step added successfully", id: result.insertId });
  });
});

// ✅ PUT - Update step (with optional image)
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { step_no, title, description } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : req.body.img; // fallback if no new image

  if (!step_no || !title || !description) {
    return res.status(400).json({ error: "step_no, title and description are required" });
  }

  const sql = "UPDATE process_steps SET step_no=?, img=?, title=?, description=? WHERE id=?";
  db.query(sql, [step_no, img, title, description, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating step:", err);
      return res.status(500).json({ error: "Failed to update step" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Step not found" });
    }
    res.status(200).json({ message: "✅ Step updated successfully" });
  });
});

// ✅ DELETE - Remove step
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM process_steps WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting step:", err);
      return res.status(500).json({ error: "Failed to delete step" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Step not found" });
    }
    res.status(200).json({ message: "✅ Step deleted successfully" });
  });
});

module.exports = router;
