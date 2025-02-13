# --------------------
# 1. BUILD STAGE
# --------------------
FROM node:16-alpine AS builder

# Create a work directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies for building (devDependencies included)
RUN npm install

# Copy the entire project (after .dockerignore excludes unnecessary files)
COPY . .

# Build the project (compile TypeScript)
RUN npm run build


# --------------------
# 2. PRODUCTION STAGE
# --------------------
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy only compiled dist folder from build stage
COPY --from=builder /usr/src/app/dist ./dist
# If you need any runtime dependencies from node_modules:
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Expose the port the app listens on (3000 by default)
EXPOSE 3000

# Use the 'node dist/index.js' command to start the app
CMD ["node", "dist/index.js"]
