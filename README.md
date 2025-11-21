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
 ┌────────────────────────┐
 │        Frontend        │  (Nuxt 3 + Vue)
 │  Pages, Layouts, UI    │
 │  TailwindCSS, Routing  │
 └────────────┬───────────┘
              │ Calls API Routes
              ▼
 ┌────────────────────────┐
 │     Nuxt Server API    │  (/server/api/*)
 │  Auth, Database, Files │
 │  Uses Supabase Server   │
 │  -> Secure operations   │
 └────────────┬───────────┘
              │ Uses Service Key
              ▼
 ┌────────────────────────┐
 │        Supabase        │
 │ Auth  | Database | Storage
 │ RLS   | REST API | Buckets
 └────────────────────────┘


