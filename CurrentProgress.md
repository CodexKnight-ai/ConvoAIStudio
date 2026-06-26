# Project Progress: Convo-AI-Studio

Convo-AI-Studio is an AI-powered realtime podcast platform. The codebase has migrated from a planned monolithic layout (`apps/server`, `apps/web`) to a **microservices architecture** with an API gateway, isolated databases per service, and a standalone Next.js frontend.

**Last analyzed:** June 27, 2026

**Update:** Full codebase index completed on June 26, 2026. Updated ai-engine scaffold status and monorepo layout on June 27, 2026.

---

## Architecture Snapshot

| Layer | Target (AGENTS.md) | Current State |
|-------|-------------------|---------------|
| Frontend | `apps/client` (Next.js 15, Apollo/GraphQL) | `Client/web` (Next.js 16, REST via axios) |
| API Gateway | Fastify + Mercurius GraphQL + circuit breakers | Fastify reverse proxy (`@fastify/reply-from`) — **REST only** |
| Auth | `auth-service` (isolated DB) | **Implemented** |
| Podcasts | `podcast-service` (isolated DB) | **Partially implemented** |
| Realtime | `realtime-service` (WebSockets, WebRTC) | **Not started** |
| AI Pipeline | `ai-engine` (Python FastAPI, gRPC) | **Scaffolded** (basic structure, gRPC deps) |
| Shared packages | `proto-contracts`, `ts-config` | **Not created** |
| Infra | `infra/k8s`, `infra/monitoring` | **Not created** |
| Queues | BullMQ / Redis Pub/Sub | **Implemented (BullMQ in podcast-service)** |
| GraphQL | Mercurius at gateway | **Not implemented** |

---

## Monorepo Layout (Actual)

```
ai-podcast/
├── apps/
│   └── client/                  # Next.js 16 frontend (not in root pnpm workspace)
├── services/
│   ├── api-gateway/            # Entry point :4000 — proxies to downstream services
│   ├── auth-service/           # IAM :4001 — auth_db
│   ├── podcast-service/        # Channels & podcasts :4002 — podcast_db
│   └── ai_engine/              # Python AI pipeline (scaffolded)
├── packages/
│   └── shared/                 # Shared gRPC generated code
├── proto/                      # Protocol buffer definitions
├── docker-compose.yaml         # Postgres, Redis, gateway, auth, podcast
├── pnpm-workspace.yaml         # apps/*, services/*, packages/*
├── AGENTS.md                   # Target architecture blueprint
└── README.md                   # Outdated — still describes old monolith + GraphQL
```

---

## Complete Codebase Index

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root dependencies (gRPC, Redis, protobuf), proto generation script |
| `pnpm-workspace.yaml` | Monorepo configuration for apps/*, services/*, packages/* |
| `docker-compose.yaml` | Infrastructure: PostgreSQL (5432), Redis (6379), API Gateway (4000), Auth Service (4001/50051), Podcast Service (4002) |
| `tsconfig.base.json` | Base TypeScript config with path aliases (@shared/*) |
| `AGENTS.md` | Architecture blueprint and constraints |
| `README.md` | Comprehensive project documentation |
| `.gitignore` | Git ignore patterns (AGENTS.md, CurrentProgress.md excluded) |

### Frontend: `apps/client/`

**Technology:** Next.js 16.2.6, React 19.2.4, TailwindCSS 4, Zustand 5.0.14, axios 1.17.0, Framer Motion 12.38.0

**Directory Structure:**
```
apps/client/
├── app/
│   ├── (pages)/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx          # Login form (wired to API)
│   │   │   └── sign-up/page.tsx        # Registration form (wired to API)
│   │   ├── channels/
│   │   │   ├── [slug]/                 # Channel detail page (mock data)
│   │   │   ├── _components/            # Channel-specific components
│   │   │   └── page.tsx                # Channels listing (mock data)
│   │   ├── discover/
│   │   │   ├── _components/            # Discovery UI components
│   │   │   └── page.tsx                # Discover page (mock data)
│   │   ├── feed/
│   │   │   ├── _components/            # Feed UI components
│   │   │   ├── _data/                  # Mock data
│   │   │   └── page.tsx                # Feed page (mock data)
│   │   ├── podcast/
│   │   │   └── [slug]/                 # Podcast player page (mock data)
│   │   └── profile/
│   │       └── page.tsx                # User profile with channel management (wired to API)
│   ├── Client Components/
│   │   ├── Home/
│   │   │   ├── Hero.tsx                # Landing hero with Spline 3D
│   │   │   ├── Features.tsx            # Feature showcase
│   │   │   ├── HowItWorks.tsx          # How it works section
│   │   │   ├── TopPodcasts.tsx         # Top podcasts showcase
│   │   │   ├── CTASection.tsx          # Call-to-action section
│   │   │   └── SplineComponent.tsx     # Spline 3D integration
│   │   ├── Navbar.tsx                  # Navigation bar
│   │   └── Footer.tsx                  # Footer component
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page
├── components/
│   └── ui/                             # Shared UI components
├── lib/
│   └── utils.ts                        # Utility functions
├── store/
│   └── authStore.ts                    # Zustand auth state management
├── public/                             # Static assets
├── package.json                        # Frontend dependencies
├── tsconfig.json                       # TypeScript config
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # TailwindCSS configuration
└── .env                                # Environment variables
```

**Key Dependencies:**
- `@radix-ui/react-icons`, `@radix-ui/react-slot` - UI primitives
- `@splinetool/react-spline` - 3D Spline integration
- `lucide-react` - Icon library
- `react-hot-toast` - Toast notifications
- `framer-motion` - Animation library
- `zustand` - State management
- `axios` - HTTP client

### API Gateway: `services/api-gateway/`

**Technology:** Fastify 5.8.5, @fastify/reply-from 12.6.2, @grpc/grpc-js 1.14.4

**Directory Structure:**
```
services/api-gateway/
├── src/
│   ├── index.ts                        # Server bootstrap with middleware (helmet, cors, rate-limit, cookie)
│   ├── routes/
│   │   └── auth.routes.ts              # Auth routes proxied to auth-service via gRPC
│   ├── middleware/
│   │   └── auth.middleware.ts          # JWT validation
│   ├── grpc/
│   │   └── auth-client.ts              # gRPC client setup for auth-service
│   └── types/
│       └── fastify.d.ts                # Fastify type definitions
├── package.json                        # Gateway dependencies
├── tsconfig.json                       # TypeScript config
├── Dockerfile                          # Docker build configuration
├── .dockerignore                       # Docker ignore patterns
└── .env                                # Environment variables
```

**Key Dependencies:**
- `@fastify/helmet` - Security headers
- `@fastify/cors` - CORS support
- `@fastify/rate-limit` - Rate limiting (100 req/min)
- `@fastify/cookie` - Cookie parsing
- `@fastify/reply-from` - Reverse proxy
- `@bufbuild/protobuf` - Protocol buffers
- `@grpc/grpc-js` - gRPC client

**Routes:**
- `/api/v1/auth/*` → auth-service (HTTP:4001, gRPC:50051)
- `/api/v1/channels/*` → podcast-service (HTTP:4002)
- `/api/v1/podcasts/*` → podcast-service (HTTP:4002)

### Auth Service: `services/auth-service/`

**Technology:** Fastify 5.8.5, Prisma 7.8.0, PostgreSQL, Redis, @fastify/jwt 10.1.0, argon2 0.44.0

**Directory Structure:**
```
services/auth-service/
├── src/
│   ├── server.ts                       # gRPC server bootstrap (port 50051)
│   ├── app.ts                          # HTTP server bootstrap (port 4001)
│   ├── auth/
│   │   ├── auth.controllers.ts         # HTTP request handlers
│   │   ├── auth.services.ts            # Business logic (register, login, refresh, logout)
│   │   ├── auth.repository.ts          # Database operations
│   │   ├── auth.route.ts               # Route definitions
│   │   ├── jwt.ts                      # JWT token management
│   │   ├── password.ts                 # Argon2 password hashing
│   │   └── session.ts                  # Session management with Redis
│   ├── grpc/
│   │   ├── server.ts                   # gRPC server setup
│   │   └── auth.grpc.ts                # gRPC service handlers
│   ├── middlewares/
│   │   └── authenticate.ts             # JWT authentication middleware
│   ├── plugins/
│   │   ├── jwt.ts                      # JWT plugin configuration
│   │   └── prisma.ts                   # Prisma plugin configuration
│   ├── types/                          # TypeScript type definitions
│   └── generated/                      # Generated Prisma and gRPC code
├── prisma/
│   ├── schema.prisma                   # Database schema (User, Session models)
│   ├── migrations/                     # Database migrations
│   │   ├── 20260621100527_init_auth_service_db
│   │   └── 20260621103239_add_username_and_names
│   └── prisma.config.ts                # Prisma configuration
├── package.json                        # Service dependencies
├── tsconfig.json                       # TypeScript config
├── Dockerfile                          # Docker build configuration
├── .dockerignore                       # Docker ignore patterns
└── .env                                # Environment variables
```

**Database Schema (auth_db):**
```prisma
model User {
  id           String   @id @default(uuid())
  username     String   @unique
  email        String   @unique
  firstName    String
  lastName     String?
  passwordHash String
  role         Role     @default(USER)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  sessions     Session[]
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  refreshToken String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Role {
  USER
  CREATOR
  ADMIN
}
```

**Key Dependencies:**
- `@prisma/client` - ORM
- `@prisma/adapter-pg` - PostgreSQL adapter
- `@fastify/jwt` - JWT authentication
- `@fastify/redis` - Redis integration
- `argon2` - Password hashing
- `ioredis` - Redis client
- `zod` - Schema validation

**gRPC Service (proto/auth.proto):**
- `ValidateToken` - Token validation
- `Register` - User registration
- `Login` - User login
- `Refresh` - Token refresh
- `Logout` - User logout
- `GetMe` - Get current user info

### Podcast Service: `services/podcast-service/`

**Technology:** Fastify 5.8.5, Prisma 7.8.0, PostgreSQL, Redis, BullMQ 5.79.1

**Directory Structure:**
```
services/podcast-service/
├── src/
│   ├── server.ts                       # HTTP server bootstrap (port 4002)
│   ├── app.ts                          # Fastify app configuration
│   ├── worker.ts                       # BullMQ background worker
│   ├── channel/
│   │   ├── channel.controllers.ts      # Channel HTTP handlers
│   │   ├── channel.services.ts         # Channel business logic
│   │   ├── channel.repository.ts       # Channel database operations
│   │   └── channel.routes.ts           # Channel route definitions
│   ├── podcasts/
│   │   ├── podcast.controllers.ts      # Podcast HTTP handlers
│   │   ├── podcast.services.ts         # Podcast business logic
│   │   ├── podcast.repository.ts       # Podcast database operations
│   │   └── podcast.routes.ts           # Podcast route definitions
│   ├── queues/
│   │   ├── podcast.queue.ts            # BullMQ queue setup
│   │   ├── podcast.worker.ts           # Queue job processor
│   │   └── job-types.ts                # Job type definitions
│   ├── middlewares/
│   │   ├── authenticate.ts             # JWT authentication middleware
│   │   └── channel-owner.ts            # Channel ownership verification
│   ├── plugins/
│   │   ├── jwt.ts                      # JWT plugin configuration
│   │   └── prisma.ts                   # Prisma plugin configuration
│   ├── types/                          # TypeScript type definitions
│   └── generated/                      # Generated Prisma code
├── prisma/
│   ├── schema.prisma                   # Database schema (Channel, Podcast, ChannelSubscription)
│   ├── migrations/                     # Database migrations
│   │   ├── 20260621163423_add_foregin_key
│   │   ├── 20260625050935
│   │   └── 20260625095121_add_schedulerid
│   └── prisma.config.ts                # Prisma configuration
├── package.json                        # Service dependencies
├── tsconfig.json                       # TypeScript config
├── Dockerfile                          # Docker build configuration
├── .dockerignore                       # Docker ignore patterns
└── .env                                # Environment variables
```

**Database Schema (podcast_db):**
```prisma
model Channel {
  id                String  @id @default(uuid())
  name              String
  slug              String  @unique
  description       String
  bannerUrl         String?
  profilePictureUrl String?
  subscriberCount   Int     @default(0)
  podcastCount      Int     @default(0)
  ownerId           String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt @default(now())
  deletedAt         DateTime?
  podcasts          Podcast[]
  subscriptions     ChannelSubscription[]
  @@index([ownerId])
  @@index([slug])
}

model ChannelSubscription {
  userId    String
  channelId String
  channel   Channel @relation(fields: [channelId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  @@id([userId, channelId])
  @@index([channelId])
  @@index([userId])
}

model Podcast {
  id              String        @id @default(uuid())
  title           String
  description     String
  thumbnailUrl    String?
  visibility      Visibility    @default(PUBLIC)
  status          PodcastStatus @default(DRAFT)
  duration        Int?
  scheduledAt     DateTime?
  schedulerJobId  String?
  startedAt       DateTime?
  endedAt         DateTime?
  peakViewers     Int           @default(0)
  totalViews      Int           @default(0)
  channelId       String
  channel         Channel       @relation(fields: [channelId], references: [id], onDelete: Cascade)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  deletedAt       DateTime?
  @@index([channelId])
  @@index([status])
  @@index([scheduledAt])
  @@index([visibility])
  @@index([visibility, scheduledAt])
}

enum PodcastStatus {
  DRAFT
  SCHEDULED
  LIVE
  ENDED
  CANCELLED
  FAILED
}

enum Visibility {
  PUBLIC
  PRIVATE
  UNLISTED
}
```

**Key Dependencies:**
- `@prisma/client` - ORM
- `@prisma/adapter-pg` - PostgreSQL adapter
- `@fastify/jwt` - JWT authentication
- `@fastify/redis` - Redis integration
- `bullmq` - Job queue
- `pg` - PostgreSQL client

**BullMQ Jobs:**
- `START_PODCAST` - Start podcast processing
- `END_PODCAST` - Complete podcast processing
- `CANCEL_PODCAST` - Cancel podcast processing

### Shared Packages: `packages/shared/`

**Directory Structure:**
```
packages/shared/
└── src/
    └── proto/
        └── auth.ts                    # Generated TypeScript from auth.proto (57KB)
```

**Purpose:** Shared gRPC protocol buffer definitions and generated TypeScript code for inter-service communication.

### Proto Definitions: `proto/`

**Directory Structure:**
```
proto/
└── auth.proto                         # AuthService gRPC contract (105 lines)
```

**gRPC Service Definition:**
- Package: `auth`
- Service: `AuthService`
- Methods: ValidateToken, Register, Login, Refresh, Logout, GetMe
- Messages: Request/Response pairs for each method

**Generation Command:**
```bash
protoc --proto_path=proto --ts_proto_out=packages/shared/src/proto --ts_proto_opt=esModuleInterop=true,outputServices=grpc-js,outputClientImpl=grpc-js proto/*.proto
```

### AI Engine: `services/ai_engine/`

**Technology:** Python, grpcio, grpcio-tools

**Directory Structure:**
```
services/ai_engine/
├── app/
│   ├── __init__.py
│   ├── config.py                    # Configuration
│   ├── grpc/                        # gRPC server setup
│   └── main.py                      # Main entry point
├── generated/                       # Generated gRPC code
├── requirement.txt                  # Python dependencies (grpcio, grpcio-tools)
└── .gitignore                      # Python ignore patterns
```

**Status:** Scaffolded with basic structure and gRPC dependencies. No FastAPI, LangChain, or agent logic implemented yet.

---

## Completed Work

### 1. Infrastructure & DevOps
- **Docker Compose** orchestrates PostgreSQL 16, Redis 7, `api-gateway`, `auth-service`, and `podcast-service`.
- **Database-per-service isolation**: `auth_db` and `podcast_db` on shared Postgres instance with separate Prisma schemas.
- **Redis isolation**: auth-service uses DB `0`, podcast-service uses DB `1`.
- Per-service **Dockerfiles** and health check endpoints (`/health`).

### 2. API Gateway (`services/api-gateway`)
- Reverse-proxies traffic to downstream services:
  - `GET|POST|… /api/v1/auth/*` → auth-service
  - `GET|POST|… /api/v1/channels/*` → podcast-service
  - `GET|POST|… /api/v1/podcasts/*` → podcast-service
- Security middleware: Helmet, CORS (credentials), rate limiting (100 req/min).
- Structured logging via Pino.

### 3. Auth Service (`services/auth-service`)
Three-layer pattern: **repository → service → controller → routes**.

**Database models** (`prisma/schema.prisma`):
- `User` — id, username, email, firstName, lastName, passwordHash, role (`USER` | `CREATOR` | `ADMIN`)
- `Session` — defined in schema but **unused**; sessions live in Redis instead

**Endpoints** (prefix `/api/v1/auth`):

| Method | Route | Status |
|--------|-------|--------|
| POST | `/register` | Done |
| POST | `/login` | Done |
| POST | `/refresh` | Done |
| POST | `/logout` | Done |
| GET | `/me` | Done |

**Auth mechanics:**
- Argon2 password hashing
- JWT access tokens (15 min) + refresh tokens (7 days) in HttpOnly cookies
- Session state stored in **Redis** (not the Prisma `Session` table)
- Refresh token rotation with reuse detection
- Robust body-parsing support for `text/plain` requests on the API gateway
- Fixed serialization order and aligned `firstName`/`lastName` properties over gRPC boundaries
- Integrated `refreshToken` validation in the logout gRPC sequence

**Migrations applied:** `20260621100527_init_auth_service_db`, `20260621103239_add_username_and_names`

### 4. Podcast Service (`services/podcast-service`)
Three-layer pattern: **repository → service → controller → routes**.

**Database models** (`prisma/schema.prisma`):
- `Channel` — name, slug, description, banner/profile URLs, subscriber/podcast counts, `ownerId` (logical ref, no cross-DB FK)
- `ChannelSubscription` — composite PK `(userId, channelId)`
- `Podcast` — title, description, thumbnail, audioUrl, duration, views, votes, status, visibility

**Channel endpoints** (prefix `/api/v1/channels`):

| Method | Route | Auth | Status |
|--------|-------|------|--------|
| POST | `/` | Required | Done |
| PUT | `/:channelId` | Owner | Done |
| DELETE | `/:channelId` | Owner | Done |
| GET | `/:channelId` | Required | Done |
| GET | `/me` | Required | Done |
| POST | `/subscribe/:channelId` | Required | Done |
| POST | `/unsubscribe/:channelId` | Required | Done |
| GET | `/subscriptions` | Required | Done |
| GET | `/isSubscribed/:channelId` | Required | Done |

**Podcast endpoints** (prefix `/api/v1/podcasts`):

| Method | Route | Auth | Status |
|--------|-------|------|--------|
| POST | `/podcast` | Owner | Done |
| GET | `/podcast/:id` | Public | Done |
| GET | `/podcast/channel/:channelId` | Public | Done |

**Mock AI pipeline:** On podcast creation, status is set to `PROCESSING`, then a 15-second in-process timer simulates synthesis and sets status to `PUBLISHED` with a placeholder audio URL.

**Migrations applied:** `20260621163423_add_foregin_key`, `20260625050935`, `20260625095121_add_schedulerid`

### 5. Queues & Background Processing
- Scaffolded **BullMQ** queue structures (`podcastQueue` and `createPodcastWorker`) inside `services/podcast-service` to manage podcast lifecycles asynchronously (processing states like `START_PODCAST`, `END_PODCAST`, and `CANCEL_PODCAST`).

### 6. Frontend (`Client/web`)
Next.js 16 (App Router), React 19, TailwindCSS 4, Framer Motion, Zustand, axios.

**Pages built:**

| Route | UI | API Integration |
|-------|-----|-----------------|
| `/` | Landing (Hero, Features, How It Works, Top Podcasts, CTA) | Mock data |
| `/login` | Auth form | Wired to gateway |
| `/sign-up` | Auth form | Wired to gateway |
| `/profile` | User info, channel management, history/watch-later tabs | Auth + channels **wired** |
| `/discover` | Search hero, trending, categories, regional filters | Mock data |
| `/feed` | Podcast feed grid with filters | Mock data |
| `/channels` | Subscribed channels, activity hub | Mock data |
| `/channels/[slug]` | Channel detail, featured/all podcasts | Mock data |
| `/podcast/[slug]` | Player, comments, engagement, related sidebar | Mock data |

**Shared UI:** Dark premium theme, bento grids, beam backgrounds, Spline 3D hero component.

---

## Partially Done / In Progress

### Backend
- Podcast **views/votes** fields exist in schema but have no update endpoints.
- No **slug-based channel lookup** route (`GET /channels/slug/:slug`) — frontend channel pages use local mock data instead.
- No **public discovery** endpoints (trending, search, categories).
- `channelOwner` and `authenticate` middleware duplicated across auth-service and podcast-service (JWT verification not centralized at gateway).

### Frontend
- Only **auth** and **profile/channel CRUD** call the real API.
- Discover, feed, channel detail, and podcast detail pages are **UI-complete but data-mocked**.
- Profile channel-create form sends `imageUrl` and `visibility` fields the backend does not accept.
- Frontend is **outside the root pnpm workspace** (`Client/web` vs `apps/*`).

### Documentation
- `README.md` describes the old monolith (`apps/server`, GraphQL, Apollo) and does not match the current microservices layout.
- `pnpm-workspace.yaml` references `apps/*` and `packages/*` directories that do not exist.

---

## Not Started

| Component | Description |
|-----------|-------------|
| `realtime-service` | WebSockets, live chat, audience reactions, WebRTC signaling |
| `ai-engine` | Python FastAPI multi-agent pipeline, LangChain, gRPC server — **Scaffolded** (basic structure only) |
| `packages/proto-contracts` | Shared gRPC `.proto` definitions |
| `packages/ts-config` | Shared TypeScript configs |
| `infra/k8s` | Kubernetes deployment manifests |
| `infra/monitoring` | Prometheus / Grafana configs |
| GraphQL / Mercurius | Federated reads at API gateway |
| BullMQ workers | Analytics, email, transcription, media processing |
| AI character library | `ai_characters` model, admin CRUD, prompt templates |
| Message / transcript persistence | Live message storage and replay |
| Tests & CI | No test files or GitHub Actions workflows found |
| Frontend Docker service | Not included in `docker-compose.yaml` |

---

## Tech Stack (Current)

| Layer | Technology |
|-------|------------|
| Monorepo | pnpm workspaces (partial — frontend excluded) |
| Frontend | Next.js 16, React 19, TailwindCSS 4, Zustand, axios |
| Gateway | Fastify 5, `@fastify/reply-from`, Helmet, rate-limit |
| Services | Fastify 5, Prisma 7, PostgreSQL, Redis, JWT, Argon2 |
| Containers | Docker Compose (Postgres 16, Redis 7) |

---

## Known Gaps & Tech Debt

1. **Session model drift** — Prisma `Session` table exists but auth uses Redis exclusively; table is never written to.
2. **No slug API** — Channel pages cannot load real data by slug.
3. **Mock AI** — No gRPC call to a Python engine; processing is a local timer stub.
4. **No circuit breakers** — Gateway proxies directly without failure fallbacks (required by AGENTS.md).
5. **Cross-service auth** — Podcast-service validates JWT independently; no shared auth middleware package.
6. **README / workspace mismatch** — Docs and workspace config lag behind the microservices migration.

---

## Recommended Next Steps

1. **Wire frontend to backend** — Connect discover, feed, channel `[slug]`, and podcast `[slug]` pages to podcast-service APIs; add slug lookup endpoint.
2. **Align monorepo** — Move `Client/web` → `apps/client`, add to pnpm workspace, update README.
3. **Replace mock AI** — Scaffold `services/ai-engine` (Python) + `packages/proto-contracts`; enqueue jobs via BullMQ instead of `setTimeout`.
4. **Add realtime-service** — WebSocket layer for live AI token streaming and audience reactions.
5. **GraphQL gateway** — Add Mercurius for federated reads once cross-service stitching is needed.
6. **Tests & CI** — Unit tests for auth/channel/podcast services; GitHub Actions lint + build pipeline.
7. **Clean up auth schema** — Remove unused Prisma `Session` model or migrate session persistence to Postgres.

---

## Progress Summary

| Area | Completion |
|------|------------|
| Microservices scaffold | ~60% |
| Auth & sessions | ~98% |
| Channel management | ~75% |
| Podcast CRUD & AI pipeline | ~40% |
| API gateway | ~55% |
| Frontend UI | ~85% |
| Frontend ↔ API integration | ~25% |
| Realtime / WebSockets | 0% |
| AI engine (Python) | 0% |
| GraphQL / federation | 0% |
| Infra / observability | ~10% (Docker Compose only) |
| Tests / CI | 0% |

**Overall project maturity: ~38–43%** — solid auth and channel foundations with a polished frontend shell; core realtime AI, job queues, and cross-service features remain ahead.
