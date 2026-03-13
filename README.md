# NextGig — Freelancing Project Management System

A full-stack freelancing platform that connects clients and freelancers, enabling job posting, proposal submission, and project management.

---

## Features

### For Freelancers
- Register and log in as a Freelancer
- Browse available jobs
- Submit proposals with cover letter, rate, and timeline
- Track proposal status and active jobs from the Freelancer Dashboard

### For Clients
- Register and log in as a Client
- Post new jobs with budget and description
- View and manage incoming proposals
- Accept proposals and track active projects from the Client Dashboard

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, HTML, CSS |
| Backend | Hono (Bun runtime) |
| Database | MySQL |
| ORM/DB Tool | MySQL Workbench |
| Deployment | Railway |

---

## Database Schema

The MySQL database (`nexgig`) contains the following tables:

- `users` — stores freelancers and clients with roles
- `jobs` — job postings by clients
- `proposals` — freelancer proposals linked to jobs
- `messages` — messaging between users
- `chats` / `chat_participants` — chat room management
- `assignments` — active project assignments

---

## Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)

### Auth — Login & Role Selection
![Login](screenshots/login.png)

### Freelancer Dashboard — My Proposals
![Freelancer Dashboard](screenshots/freelancer_dashboard.png)

### Job Detail & Proposal Submission
![Job Detail](screenshots/job_detail.png)

### Client Dashboard — Overview
![Client Dashboard Overview](screenshots/client_dashboard_overview.png)

### Client Dashboard — My Jobs
![Client Dashboard Jobs](screenshots/client_dashboard_jobs.png)

### Client View — Accepted Proposal
![Accepted Proposal](screenshots/accepted_proposal.png)

---

## Backend & Database Verification

### MySQL Tables
The database was verified using MySQL Workbench. All 7 tables are present and functional:

![MySQL Tables](screenshots/mysql_tables.png)

### Users Table (Live Data)
Freelancer and client accounts stored with hashed passwords and role assignments:

![Users Table](screenshots/mysql_users.png)

### Proposals Table (Live Data)
Proposals with status tracking (`accepted`, `pending`) and contact details:

![Proposals Table](screenshots/mysql_proposals.png)

---

## Setup & Running Locally

### Prerequisites
- [Bun](https://bun.sh/) installed
- MySQL running locally

### Backend
```bash
cd backend
bun install
bun src/index.ts
```

### Frontend
```bash
cd frontend
bun install
bun run dev
```

### Database
Import the schema into MySQL Workbench or run:
```sql
CREATE DATABASE nexgig;
USE nexgig;
-- then run your schema SQL file
```

---

## Deployment

The backend is deployed on [Railway](https://railway.app) at:  
`https://nexgig-production.up.railway.app`

---
