# Clear Lakes Dental - Intern Assessment

## Project Overview

Full-stack Nuxt 3 application with Supabase authentication, database, and storage.

## Features

- User authentication (signup/login/logout)
- Database: Form submissions with CRUD operations
- Storage: Photo upload and gallery
- Protected routes with middleware

## Technologies Used

- Nuxt 3
- TypeScript
- Supabase (Auth, Database, Storage)
- Tailwind CSS

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with Supabase credentials:

```
   SUPABASE_URL=your_url
   SUPABASE_KEY=your_key
```

4. Run `npm run dev`
5. Visit `http://localhost:3000`

## Supabase Setup

- Table: `submissions` with columns: id, created_at, user_id, title, description
- Storage bucket: `photos` (public bucket with RLS disabled)
- Auth: Email/password authentication enabled

## Live Demo

[\[Vercel Link\]](https://clearlakedentalsinternproject.vercel.app/photos)


## High Level Architecture

             ┌──────────────────────────────────────────────────────────────┐
             │                          USER ACTIONS                        │
             │ (Login, Signup, Submit Form, Upload Photo, View Submissions) │
             └──────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
                       ┌──────────────────────────────────────┐
                       │        Nuxt 3 Frontend (Client)      │
                       │ - Captures input                     │
                       │ - Sends requests to /api/*           │
                       └──────────────────────────────────────┘
                                         │  (Fetch / Axios)
                                         ▼
                       ┌──────────────────────────────────────┐
                       │     Nuxt Server API Endpoints        │
                       │    (server/api/**/*.ts files)        │
                       │--------------------------------------│
                       │ AUTH FLOW:                           │
                       │   - /api/auth/signup                 │
                       │   - /api/auth/login                  │
                       │   - /api/auth/logout                 │
                       │--------------------------------------│
                       │ SUBMISSIONS:                         │
                       │   - /api/submissions/add             │
                       │   - /api/submissions/get             │
                       │--------------------------------------│
                       │ PHOTOS:                              │
                       │   - /api/photos/upload               │
                       │   - /api/photos/list                 │
                       └──────────────────────────────────────┘
                                      │
                                      ▼
              ┌──────────────────────────────────────────────────────────┐
              │                Supabase Services (Backend)               │
              │----------------------------------------------------------│
              │ 🔐 AUTH:                                                 │
              │   - Validates credentials                                │
              │   - Returns auth tokens (JWT)                            │
              │----------------------------------------------------------│
              │ 🗄️ DATABASE (submissions table):                         │
              │   - Inserts new submission records                       │
              │   - Returns list of submissions                          │
              │----------------------------------------------------------│
              │ 🖼️ STORAGE (photos bucket):                              │
              │   - Uploads image via API                                │
              │   - Generates public URL                                 │
              └──────────────────────────────────────────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────────┐
                  │  Nuxt 3 Server → Returns API responses to client │
                  │   • success/failure message                      │
                  │   • database records                             │
                  │   • public photo URLs                            │
                  └──────────────────────────────────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────────┐
                  │              Frontend UI Updates                 │
                  │  - Shows login success / redirects               │
                  │  - Displays uploaded photos                      │
                  │  - Shows submissions list                        │
                  └──────────────────────────────────────────────────┘



