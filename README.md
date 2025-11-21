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

              flowchart TD

%% FRONTEND
A[User<br/>Browser] --> B[Nuxt 3 Frontend<br/>(Pages + Components)]
B --> C[Route Middleware<br/>(Auth Check)]

%% SERVER
C --> D[Nuxt Server API<br/>(/api/* Endpoints)]

%% AUTH
D --> E[Supabase Auth<br/>(Email/Password)]
E --> D

%% DATABASE
D --> F[Supabase Database<br/>(submissions table)]

%% STORAGE
D --> G[Supabase Storage<br/>(photos bucket)]

%% RETURN FLOW
F --> D
G --> D
D --> B

## Data Flow Diagram (End-to-End)
sequenceDiagram
    participant U as User
    participant F as Nuxt Frontend
    participant API as Nuxt Server API
    participant SB_AUTH as Supabase Auth
    participant SB_DB as Supabase Database
    participant SB_ST as Supabase Storage

    %% LOGIN/SIGNUP FLOW
    U->>F: Enter email & password
    F->>API: POST /api/auth/login or signup
    API->>SB_AUTH: Validate credentials
    SB_AUTH-->>API: user + session + token
    API-->>F: return session
    F-->>U: Save token & redirect

    %% SUBMISSION FLOW
    U->>F: Fill form & submit
    F->>API: POST /api/submissions/add
    API->>SB_DB: Insert submission row
    SB_DB-->>API: Return inserted data
    API-->>F: Response
    F-->>U: Show success

    %% GET SUBMISSIONS
    F->>API: GET /api/submissions/get
    API->>SB_DB: Fetch rows
    SB_DB-->>API: Return list
    API-->>F: JSON submissions
    F-->>U: Display submissions

    %% PHOTO UPLOAD
    U->>F: Upload image
    F->>API: POST /api/photos/upload (base64)
    API->>SB_ST: Upload to photos bucket
    SB_ST-->>API: Upload success
    API-->>F: OK

    %% LIST PHOTOS
    F->>API: GET /api/photos/list
    API->>SB_ST: Get file list + public URLs
    SB_ST-->>API: File metadata
    API-->>F: Array of URLs
    F-->>U: Display gallery grid


## Component Interaction Diagram
flowchart LR

subgraph Frontend [Nuxt 3 Frontend]
    P[Pages\n(Login, Signup, Photos, Submissions)]
    M[Middleware\nauth.global.ts]
    C[Components\n(Form, Cards, Gallery)]
end

subgraph ServerAPI [Nuxt Server API]
    A1[/api/auth/*]
    S1[/api/submissions/*]
    P1[/api/photos/*]
end

subgraph Supabase
    A[Auth Service]
    D[Postgres Database\n(submissions table)]
    ST[Storage Bucket\n(photos)]
end

P --> M
M --> A1
M --> P1
M --> S1

A1 --> A
S1 --> D
P1 --> ST

A --> A1
D --> S1
ST --> P1

A1 --> P
S1 --> P
P1 --> P


