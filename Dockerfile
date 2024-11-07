# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production
# Set Next.js to production mode
ENV NEXT_PUBLIC_NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --only=production

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
