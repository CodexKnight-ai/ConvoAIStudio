FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY api-gateway/package*.json ./
COPY shared/ ../shared/
RUN npm install

COPY . .

RUN DATABASE_URL=postgresql://build:build@localhost:5432/build pnpm prisma generate
RUN pnpm build

EXPOSE 4002
CMD ["node", "dist/server.js"]