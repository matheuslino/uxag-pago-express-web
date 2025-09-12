# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the SSR application
RUN npm run build -- --configuration production

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package.json for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from build stage
COPY --from=build /app/dist/pago-express-web/ ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S angular -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R angular:nodejs /app
USER angular

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/ || exit 1

# Start the SSR server
CMD ["node", "server/server.mjs"]