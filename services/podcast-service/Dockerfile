FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .

RUN DATABASE_URL=postgresql://build:build@localhost:5432/build pnpm prisma generate
RUN pnpm build

EXPOSE 4002
CMD ["node", "dist/index.js"]