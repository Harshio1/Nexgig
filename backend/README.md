# Nexgig Backend (Bun + Hono + MySQL)

This is the backend API for Nexgig, built with Bun and Hono, using MySQL and JWT auth.

## Features
- Hono on Bun runtime
- CORS enabled for the React frontend
- MySQL connection via `mysql2` with simple schema bootstrap for `users`
- JWT authentication (register, login, me)
- Jobs and Chats routes (mocked data initially, ready to persist later)

## Requirements
- Bun (`https://bun.sh`)
- MySQL 8+

## Environment Variables
Create a `.env` file in `backend/`:

```
PORT=8787
DATABASE_URL="mysql://root:password@localhost:3306/nexgig"
JWT_SECRET="change_this_to_a_long_random_secret_32_chars_min"
```

## Install & Run
```
cd backend
bun install
bun run dev
```

The server will start at `http://localhost:8787` with base path `/api`.

## API Overview
- POST `/api/auth/register` { email, password, name?, role? }
- POST `/api/auth/login` { email, password } → { token, user }
- GET `/api/auth/me` (Authorization: Bearer <token>)
- GET `/api/jobs` → { jobs }
- GET `/api/jobs/:id` → { job }
- POST `/api/jobs` (client only, Authorization header)
- GET `/api/chats` (Authorization header)
- GET `/api/chats/:id/messages` (Authorization header)
- POST `/api/chats/:id/messages` { text } (Authorization header)

## Frontend Compatibility
- All endpoints are namespaced under `/api` to avoid dev-proxy needs.
- Add `Authorization: Bearer <token>` for protected endpoints.

## Notes
- `users` table is auto-created if missing. Extend schema as you add resources (jobs, chats) and migrate data off mocks.
- For production, use a strong `JWT_SECRET`, TLS for DB, and restrict CORS.


