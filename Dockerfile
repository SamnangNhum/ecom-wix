# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files and build the app
COPY . .
RUN npm run build

# Stage 2: Production image with Nginx
FROM nginx:stable-alpine

# Copy built Next.js static files to Nginx HTML directory
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
