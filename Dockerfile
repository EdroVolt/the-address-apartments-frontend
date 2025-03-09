FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --ignore-scripts

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Install only production dependencies
RUN npm ci --omit=dev

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
