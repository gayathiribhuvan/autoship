# ---- Stage 1: Build ----
# Use a full Node image to install dependencies
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files FIRST (Docker caches this layer if unchanged)
# This means npm install only re-runs when package.json changes
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# ---- Stage 2: Production ----
# Use a minimal image for the final container (smaller = more secure)
FROM node:18-alpine AS production

# Create a non-root user for security (never run apps as root!)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy installed dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source code
COPY src/ ./src/
COPY public/ ./public/

# Set ownership to our non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Health check — Docker will mark container unhealthy if this fails
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "src/app.js"]
