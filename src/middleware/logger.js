// A simple logger that timestamps every message
// In production, you'd replace this with Winston or Pino
const logger = {
  info: (msg) => console.log(`[${new Date().toISOString()}] INFO: ${msg}`),
  error: (msg) => console.error(`[${new Date().toISOString()}] ERROR: ${msg}`),
  warn: (msg) => console.warn(`[${new Date().toISOString()}] WARN: ${msg}`),
};

module.exports = logger;
