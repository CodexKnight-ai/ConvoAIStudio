# Project Progress: Convo-AI-Studio

Convo-AI-Studio is an AI-powered realtime podcast platform. The codebase has migrated from a planned monolithic layout (`apps/server`, `apps/web`) to a **microservices architecture** with an API gateway, isolated databases per service, and a standalone Next.js frontend.

**Last analyzed:** June 30, 2026

**Update:** Completed comprehensive codebase analysis. Verified gRPC client-server stream connection between `podcast-service` and `ai_engine`, integration of `realtime-service` with WebSockets and Redis Pub/Sub, and monorepo workspace consolidation.

---

## Architecture Snapshot

| Layer | Target (AGENTS.md) | Current State |
|-------|-------------------|---------------|
| Frontend | `apps/client` (Next.js 15, Apollo/GraphQL) | `apps/client` (Next.js 16, REST via axios) — **Integrated in Workspace** |
| API Gateway | Fastify + Mercurius GraphQL + circuit breakers | Fastify reverse proxy (`@fastify/reply-from`) + central gRPC-based JWT Authenticate middleware |
| Auth | `auth-service` (isolated DB) | **Implemented** (Argon2, Redis-based token rotation/blacklisting/sessions, gRPC handlers) |
| Podcasts | `podcast-service` (isolated DB) | **Partially implemented** (CRUD, subscriptions, scheduling) |
| Realtime | `realtime-service` (WebSockets, WebRTC) | **Partially implemented** (WS connection/message handling, Room management, Redis Pub/Sub subscriber) |
| AI Pipeline | `ai-engine` (Python FastAPI, gRPC) | **Partially implemented** (Python gRPC stream responder, gRPC client in podcast-service) |
| Shared packages | `proto-contracts`, `ts-config` | `@convoai/shared` (TypeScript proto-generated stubs for auth & ai_engine) |
| Infra | `infra/k8s`, `infra/monitoring` | **Not created** (Docker Compose handles postgres/redis/gateway/services locally) |
| Queues | BullMQ / Redis Pub/Sub | **Implemented** (BullMQ worker + Redis Pub/Sub in podcast-service connected to gRPC streaming) |
| GraphQL | Mercurius at gateway | **Not implemented** |

---

## Monorepo Layout (Actual)

```
ai-podcast/
├── apps/
│   └── client/                  # Next.js 16 frontend (fully integrated in root pnpm workspace)
├── services/
│   ├── api-gateway/            # Entry point :4000 — central gateway & JWT validation via gRPC
│   ├── auth-service/           # IAM :4001 / gRPC :50051 — auth_db & Redis token/session stores
│   ├── podcast-service/        # Channels & podcasts :4002 — podcast_db & BullMQ worker
│   ├── realtime-service/       # Dedicated WebSockets & Redis Pub/Sub listener :4003
│   └── ai_engine/              # Python AI pipeline — gRPC server :50052 (streaming stubs)
├── packages/
│   └── shared/                 # Shared gRPC generated code (@convoai/shared)
├── proto/                      # Protocol buffer definitions (auth.proto, ai_engine.proto)
├── docker-compose.yaml         # Postgres, Redis, gateway, auth, podcast, realtime, ai_engine
├── pnpm-workspace.yaml         # apps/*, services/*, packages/*
├── AGENTS.md                   # Target architecture blueprint
└── README.md                   # Outdated — still describes old monolith + GraphQL
```

---

## Complete Codebase Index

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root dependencies, concurrently command for startup, and proto generation scripts |
| `pnpm-workspace.yaml` | Monorepo configuration mapping apps/*, services/*, packages/* |
| `docker-compose.yaml` | Infrastructure: PostgreSQL (5432), Redis (6379) |
| `tsconfig.base.json` | Base TypeScript config with path aliases |
| `AGENTS.md` | Architecture blueprint and constraints |
| `README.md` | Comprehensive project documentation |
| `.gitignore` | Git ignore patterns |

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

---

### API Gateway: `services/api-gateway/`

**Technology:** Fastify 5.8.5, @fastify/reply-from 12.6.2, @grpc/grpc-js 1.14.4

**Directory Structure:**
```
services/api-gateway/
├── src/
│   ├── index.ts                        # Server bootstrap with cors, rate-limit, and proxy configs
│   ├── routes/
│   │   └── auth.routes.ts              # Auth routes proxied to auth-service via gRPC
│   ├── middleware/
│   │   └── auth.middleware.ts          # Central JWT validation calling auth-service gRPC
│   ├── grpc/
│   │   └── auth-client.ts              # gRPC client setup for auth-service
│   └── types/
│       └── fastify.d.ts                # Fastify type definitions
```

**Key Features:**
- Token authorization is centralized here and validates tokens using gRPC client.
- Proxies `/api/v1/channels/*` and `/api/v1/podcasts/*` requests to the podcast-service via replyFrom, rewriting headers as needed.

---

### Auth Service: `services/auth-service/`

**Technology:** Fastify 5.8.5, Prisma 7.8.0, PostgreSQL, Redis, @fastify/jwt 10.1.0, argon2 0.44.0

**gRPC Interface (proto/auth.proto):**
- ValidateToken, Register, Login, Refresh, Logout, GetMe.

---

### Podcast Service: `services/podcast-service/`

**Technology:** Fastify 5.8.5, Prisma 7.8.0, PostgreSQL, Redis, BullMQ 5.79.1, gRPC Client

**Queue Jobs:**
- `START_PODCAST` - Connects to `ai_engine` via gRPC streaming (`startPodcast`), processes streamed transcript chunks, and publishes them as `TRANSCRIPT_CHUNK` events to Redis Pub/Sub (`podcast:{podcastId}:events`).
- `END_PODCAST` - Ends the live podcast and flags it as `ENDED`.
- `CANCEL_PODCAST` - Cancels the podcast and sets status to `CANCELLED`.

---

### Realtime Service: `services/realtime-service/`

**Technology:** Node.js, WebSockets (`ws`), Redis (Pub/Sub subscription)

**Directory Structure:**
```
services/realtime-service/
├── src/
│   ├── server.ts                       # Service entry point; bootstraps WS and Redis subscriber
│   ├── config/
│   │   └── env.ts                      # Configuration validation
│   ├── logger/
│   │   └── logger.ts                   # Pino logging
│   ├── redis/
│   │   ├── subscriber.ts               # Redis subscription client (connects to DB 1)
│   │   └── message.handler.ts          # Handles Redis messages and forwards to WS rooms
│   ├── rooms/
│   │   └── room.manager.ts             # Tracks active client connections per podcast room
│   ├── websocket/
│   │   ├── websockets.server.ts        # WS Server instantiation
│   │   ├── connection.handler.ts       # Handles socket connect/disconnect
│   │   └── message.handler.ts          # Handles socket messages (join/leave room)
│   └── types/
│       └── event.types.ts              # Event payload types
```

**Mechanics:**
- Clients join rooms corresponding to specific `podcastId`s using WebSockets.
- Realtime service subscribes to Redis channel `podcast:{podcastId}:events`.
- Incoming event payloads (such as `TRANSCRIPT_CHUNK` or audio chunks) are parsed and immediately broadcasted to all connected clients in that room.

---

### AI Engine: `services/ai_engine/`

**Technology:** Python, gRPC (`grpcio`, `grpcio-tools`), stream-to-stream processing

**Directory Structure:**
```
services/ai_engine/
├── app/
│   ├── grpc/
│   │   ├── server.py                  # Initialise Python gRPC server on 50052
│   │   └── service.py                 # Implements AIEngineServicer (StartPodcast)
│   ├── config.py
│   └── main.py                        # Entry point
├── generated/                         # Python files compiled from protobuf stubs
└── requirement.txt                    # Dependencies (grpcio, grpcio-tools)
```

**Mechanics:**
- Implements `StartPodcast` streaming RPC.
- Yields simulated transcript fragments dynamically to the calling client (`podcast-service`).

---

### Shared Packages: `packages/shared/`

**Directory Structure:**
```
packages/shared/
├── package.json                       # Exposes @convoai/shared/proto/*
└── src/
    └── proto/
        ├── ai_engine.ts               # Generated TS client/server code for ai_engine.proto
        └── auth.ts                    # Generated TS client/server code for auth.proto
```

---

## Completed Work

1. **Integrated Monorepo:** Frontend moved to `apps/client` and now correctly resolves within the monorepo workspace.
2. **Centralized Gateway Auth:** Added JWT Authenticate middleware on API Gateway which uses the gRPC client to check token validity on the auth-service before proxying channel/podcast requests.
3. **gRPC Engine Pipeline Integration:** The `podcast-service` worker implements the full `START_PODCAST` logic by resolving the gRPC server stream from `ai_engine` (`startPodcast`), reading incoming chunks, and forwarding them down to Redis Pub/Sub.
4. **Scaffolded Realtime WebSockets:** Initialized the `realtime-service` with active rooms and Redis Pub/Sub events subscription support to broadcast transcript and AI events in real-time.
5. **Python gRPC Server:** Implemented the Python `ai_engine` gRPC server and stubs handling streaming `StartPodcast` requests.

---

## Partially Done / In Progress

- **Frontend Wiring:** Discover, feed, channel detail, and podcast player pages still rely on mock data. Views and votes have no REST endpoints.
- **Slug-based Channel Lookup:** No route exists for `/channels/slug/:slug` yet.
- **AI pipeline refinement:** The Python AI pipeline emits mock chunks ("Hello everyone...", etc.) and needs actual LangChain/agent debate logic and audio synthesis integration.

---

## Not Started

- **WebRTC Integration:** Audience interactions and WebRTC audio stream pathways.
- **GraphQL Gateway:** Mercurius integration for federated queries.
- **Production DevOps:** Kubernetes deployment configuration and Grafana monitoring profiles.

---

## Progress Summary

| Area | Completion |
|------|------------|
| Microservices scaffold | ~90% |
| Auth & sessions | ~98% |
| Channel management | ~75% |
| Podcast CRUD & AI pipeline | ~60% |
| API gateway | ~80% |
| Frontend UI | ~85% |
| Frontend ↔ API integration | ~30% |
| Realtime / WebSockets | ~50% (Scaffolded + redis pub/sub broadcasting) |
| AI engine (Python) | ~25% (gRPC server & stubs working) |
| GraphQL / federation | 0% |
| Infra / observability | ~15% (Docker Compose updated) |
| Tests / CI | 0% |

**Overall project maturity: ~60%** — Core infrastructure services are fully scaffolded and communicating via gRPC/Redis. Next steps should focus on wiring the frontend to use the actual APIs and building out the real AI logic in the python `ai_engine`.
