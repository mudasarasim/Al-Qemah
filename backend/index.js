const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const bcrypt = require('bcryptjs');

console.log(bcrypt.hashSync("12345", 10));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// -------------------- API Routes --------------------
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const galleryRoutes = require("./routes/galleryRoutes");
app.use("/api/gallery", galleryRoutes);

const contactInfoRoutes = require("./routes/contactInfoRoutes");
app.use("/api/contact-info", contactInfoRoutes);

const processStepsRoutes = require("./routes/processSteps");
app.use("/api/process-steps", processStepsRoutes);

// Protected Route Example
const { protect } = require('./middleware/authMiddleware');
app.get('/api/admin/dashboard', protect, (req, res) => {
  res.json({
    title: "Welcome to Admin Dashboard",
    description: "Here you can manage your gallery, uploads, and contact easily."
  });
});

// -------------------- Serve React Frontend --------------------
// Serve static files from React build folder
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all: send React's index.html for any non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// --------------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
