require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const logger = require('./middleware/logger');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// --- Middleware Stack ---
// helmet adds security-related HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// cors allows the frontend to talk to the API
app.use(cors());

// morgan logs every HTTP request to the console
app.use(morgan('combined'));

// parse incoming JSON request bodies
app.use(express.json());

// serve the public folder as static files (our UI)
app.use(express.static(path.join(__dirname, '../public')));

// --- Routes ---
app.use('/api', apiRoutes);

// Health check endpoint — used by Docker and CI/CD to verify the app is alive
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: ENV,
    uptime: process.uptime().toFixed(2) + 's',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler — catches any unhandled errors
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server only if this file is run directly (not imported in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`AutoShip running on port ${PORT} in ${ENV} mode`);
  });
}

module.exports = app;
