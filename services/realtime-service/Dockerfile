FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies (including devDependencies for TypeScript build)
RUN npm install

# Copy source code
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Expose WebSocket port
EXPOSE 3001

# Run the built application
CMD ["node", "dist/server.js"]
