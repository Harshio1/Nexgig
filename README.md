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
<img width="2879" height="1427" alt="Screenshot 2025-10-31 231117" src="https://github.com/user-attachments/assets/fd494720-8a15-4bcf-9020-24ef146e9711" />


### Auth — Login & Role Selection
<img width="2879" height="1429" alt="Screenshot 2025-10-31 231148" src="https://github.com/user-attachments/assets/443eec28-f9ba-4e39-935d-d78148389cdb" />


### Freelancer Dashboard — My Proposals
<img width="2879" height="1421" alt="Screenshot 2025-10-31 231205" src="https://github.com/user-attachments/assets/ea21914f-3db0-4b37-bcbc-1e620724b43d" />


### Job Detail & Proposal Submission
<img width="2865" height="1549" alt="Screenshot 2025-10-31 231740" src="https://github.com/user-attachments/assets/26e29fbc-0a2a-4e17-a7eb-a0b02995f1b4" />


### Client Dashboard — Overview
<img width="2727" height="1434" alt="Screenshot 2025-10-31 231615" src="https://github.com/user-attachments/assets/6468a17f-1640-49aa-b57f-36c4779828de" />


### Client Dashboard — My Jobs
<img width="2872" height="1366" alt="Screenshot 2025-10-31 231646" src="https://github.com/user-attachments/assets/a008d025-d969-4a84-b862-0cc9fafcada6" />


### Client View — Accepted Proposal
<img width="2876" height="1542" alt="Screenshot 2025-10-31 231703" src="https://github.com/user-attachments/assets/ac7cf11d-507c-4874-bc27-9c558a202161" />

---

## Backend & Database Verification

### MySQL Tables
The database was verified using MySQL Workbench. All 7 tables are present and functional:

<img width="2879" height="1799" alt="Screenshot 2025-10-31 231809" src="https://github.com/user-attachments/assets/14aaa55c-892d-4506-a7e2-807482a33dec" />


### Users Table (Live Data)
Freelancer and client accounts stored with hashed passwords and role assignments:

<img width="2879" height="1704" alt="Screenshot 2025-10-31 231830" src="https://github.com/user-attachments/assets/2e5584ca-f96e-450a-b8c4-272a39cf867d" />


### Proposals Table (Live Data)
Proposals with status tracking (`accepted`, `pending`) and contact details:

<img width="2879" height="1707" alt="Screenshot 2025-10-31 231848" src="https://github.com/user-attachments/assets/86a30d51-fe22-4746-b8c1-1daec8680471" />


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

The website is deployed on [Railway](https://railway.app) at:  
`https://nexgig-production.up.railway.app`

---
