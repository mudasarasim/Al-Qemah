const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const bcrypt = require('bcryptjs');

console.log(bcrypt.hashSync("12345", 10));

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  'https://alqemahgoldsmith.com', // Your live frontend domain
  'http://localhost:3000'         // Optional: local development frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy does not allow access from the specified Origin.'));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const galleryRoutes = require('./routes/galleryRoutes');
app.use('/api/gallery', galleryRoutes);

const contactInfoRoutes = require('./routes/contactInfoRoutes');
app.use('/api/contact-info', contactInfoRoutes);

const processStepsRoutes = require('./routes/processSteps');
app.use('/api/process-steps', processStepsRoutes);

// ✅ Protected route example
const { protect } = require('./middleware/authMiddleware');
app.get('/api/admin/dashboard', protect, (req, res) => {
  res.json({
    title: "Welcome to Admin Dashboard",
    description: "Here you can manage your gallery, uploads, and contact easily."
  });
});

// ✅ Serve React Frontend (static build)
app.use(express.static(path.join(__dirname, '../build')));

// ✅ Catch-all for React Router
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// ✅ CORS error handler (optional but useful for debugging)
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message.includes('CORS')) {
    res.status(403).json({ message: 'CORS Error: Access denied' });
  } else {
    next(err);
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
