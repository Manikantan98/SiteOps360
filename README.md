# SiteOps360

Construction-site workforce and operations management platform.

## MVP

Authenticate → Company/Project/Site → Workforce → Attendance → Assign Work → Track Progress → Review Activity → Dashboard.

## Stack

- Next.js + React + TypeScript
- PostgreSQL + Prisma (backend phase)
- REST API + JWT/RBAC (backend phase)
- Responsive, mobile-first experience

## Current status

Phase 1 foundation is implemented: responsive application shell, navigation, dashboard KPI cards, site overview and recent activity components.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Never commit real credentials. Copy `.env.example` to `.env.local` for local configuration.
