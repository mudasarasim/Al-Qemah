const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// API Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const galleryRoutes = require("./routes/gallery");
app.use("/api/gallery", galleryRoutes);

app.use("/api/steps", require("./routes/steps"));

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

const aboutRoutes = require("./routes/about");
app.use("/api/about", aboutRoutes);

// ✅ Serve React frontend build
const buildPath = path.join(__dirname, "../build");
app.use(express.static(buildPath));

// ✅ Express v5 compatible catch-all for React Router (excluding /api routes)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
