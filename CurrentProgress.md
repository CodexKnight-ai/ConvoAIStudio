# Project Progress: Convo-AI-Studio

Convo-AI-Studio is an AI-powered realtime podcast platform. The codebase has migrated from a planned monolithic layout (`apps/server`, `apps/web`) to a **microservices architecture** with an API gateway, isolated databases per service, and a standalone Next.js frontend.

**Last analyzed:** June 24, 2026

**Update:** Progress review and status summary added on June 24, 2026.

---

## Architecture Snapshot

| Layer | Target (AGENTS.md) | Current State |
|-------|-------------------|---------------|
| Frontend | `apps/client` (Next.js 15, Apollo/GraphQL) | `Client/web` (Next.js 16, REST via axios) |
| API Gateway | Fastify + Mercurius GraphQL + circuit breakers | Fastify reverse proxy (`@fastify/reply-from`) — **REST only** |
| Auth | `auth-service` (isolated DB) | **Implemented** |
| Podcasts | `podcast-service` (isolated DB) | **Partially implemented** |
| Realtime | `realtime-service` (WebSockets, WebRTC) | **Not started** |
| AI Pipeline | `ai-engine` (Python FastAPI, gRPC) | **Not started** (mock 15s timer in podcast-service) |
| Shared packages | `proto-contracts`, `ts-config` | **Not created** |
| Infra | `infra/k8s`, `infra/monitoring` | **Not created** |
| Queues | BullMQ / Redis Pub/Sub | **Not implemented** |
| GraphQL | Mercurius at gateway | **Not implemented** |

---

## Monorepo Layout (Actual)

```
ai-podcast/
├── Client/web/                 # Next.js 16 frontend (not in root pnpm workspace)
├── services/
│   ├── api-gateway/            # Entry point :4000 — proxies to downstream services
│   ├── auth-service/           # IAM :4001 — auth_db
│   └── podcast-service/        # Channels & podcasts :4002 — podcast_db
├── docker-compose.yaml         # Postgres, Redis, gateway, auth, podcast
├── pnpm-workspace.yaml         # apps/*, services/*, packages/* (apps/ & packages/ empty)
├── AGENTS.md                   # Target architecture blueprint
└── README.md                   # Outdated — still describes old monolith + GraphQL
```

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

**Migration applied:** `20260621163423_add_foregin_key`

### 5. Frontend (`Client/web`)
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
- No **BullMQ** job queue — AI processing runs as an in-memory `setTimeout`.
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
| `ai-engine` | Python FastAPI multi-agent pipeline, LangChain, gRPC server |
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
| Auth & sessions | ~90% |
| Channel management | ~75% |
| Podcast CRUD & AI pipeline | ~30% |
| API gateway | ~50% |
| Frontend UI | ~85% |
| Frontend ↔ API integration | ~25% |
| Realtime / WebSockets | 0% |
| AI engine (Python) | 0% |
| GraphQL / federation | 0% |
| Infra / observability | ~10% (Docker Compose only) |
| Tests / CI | 0% |

**Overall project maturity: ~35–40%** — solid auth and channel foundations with a polished frontend shell; core realtime AI, job queues, and cross-service features remain ahead.
