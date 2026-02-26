const request = require('supertest');
const app = require('../src/app');

describe('AutoShip API', () => {
  // Health check
  test('GET /health returns 200 and healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
  });

  // Deployments list
  test('GET /api/deployments returns array', async () => {
    const res = await request(app).get('/api/deployments');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Single deployment
  test('GET /api/deployments/1 returns one deployment', async () => {
    const res = await request(app).get('/api/deployments/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  // 404 for missing deployment
  test('GET /api/deployments/999 returns 404', async () => {
    const res = await request(app).get('/api/deployments/999');
    expect(res.statusCode).toBe(404);
  });

  // Create deployment
  test('POST /api/deployments creates a new deployment', async () => {
    const res = await request(app)
      .post('/api/deployments')
      .send({ app: 'test-service', version: 'v1.0.0', environment: 'staging' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.app).toBe('test-service');
    expect(res.body.data.status).toBe('deploying');
  });

  // Validation
  test('POST /api/deployments with missing fields returns 400', async () => {
    const res = await request(app)
      .post('/api/deployments')
      .send({ app: 'incomplete-service' });
    expect(res.statusCode).toBe(400);
  });

  // System info
  test('GET /api/info returns app metadata', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.appName).toBe('AutoShip');
  });
});
