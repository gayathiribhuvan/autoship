const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger');

// In-memory "deployments" store — simulates a tiny database
const deployments = [
  {
    id: 1,
    app: 'frontend-service',
    version: 'v1.2.0',
    status: 'running',
    deployedAt: new Date(Date.now() - 86400000).toISOString(),
    environment: 'production',
  },
  {
    id: 2,
    app: 'auth-service',
    version: 'v3.0.1',
    status: 'running',
    deployedAt: new Date(Date.now() - 3600000).toISOString(),
    environment: 'staging',
  },
];

// GET /api/deployments — list all deployments
router.get('/deployments', (req, res) => {
  logger.info(`Fetched ${deployments.length} deployments`);
  res.json({ success: true, count: deployments.length, data: deployments });
});

// GET /api/deployments/:id — get one deployment
router.get('/deployments/:id', (req, res) => {
  const deployment = deployments.find((d) => d.id === parseInt(req.params.id));
  if (!deployment) {
    return res.status(404).json({ success: false, error: 'Deployment not found' });
  }
  res.json({ success: true, data: deployment });
});

// POST /api/deployments — simulate triggering a new deployment
router.post('/deployments', (req, res) => {
  const { app, version, environment } = req.body;

  // Basic input validation
  if (!app || !version || !environment) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: app, version, environment',
    });
  }

  const newDeployment = {
    id: deployments.length + 1,
    app,
    version,
    status: 'deploying',
    deployedAt: new Date().toISOString(),
    environment,
  };

  deployments.push(newDeployment);
  logger.info(`New deployment triggered: ${app}@${version} to ${environment}`);

  // Simulate deployment completing after 2 seconds
  setTimeout(() => {
    newDeployment.status = 'running';
    logger.info(`Deployment complete: ${app}@${version}`);
  }, 2000);

  res.status(201).json({ success: true, data: newDeployment });
});

// GET /api/info — returns system/build info
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      appName: 'AutoShip',
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development',
      buildTime: process.env.BUILD_TIME || 'local',
      commitSha: process.env.COMMIT_SHA || 'local',
    },
  });
});

module.exports = router;
