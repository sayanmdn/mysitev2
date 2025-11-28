# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website (sayantanmishra.com) built with Next.js 14.2 using the App Router architecture. The project uses React 18.3 and follows a minimal setup with JavaScript (not TypeScript).

**Authentication**: Implements Google OAuth authentication using NextAuth.js v5 (Auth.js) with MongoDB for session storage.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000 by default)
npm run dev

# Build for production
npm run build

# Start production server (must run build first)
npm run start
```

## Architecture

**Framework**: Next.js 14.2 with App Router

**Project Structure**:
- `app/` - Next.js App Router directory containing all pages and layouts
  - `layout.js` - Root layout component defining the HTML structure and metadata
  - `page.js` - Home page component (protected, requires authentication)
  - `login/page.js` - Login page with Google sign-in button
  - `api/auth/[...nextauth]/route.js` - NextAuth.js API route handlers
- `auth.js` - NextAuth.js configuration (providers, callbacks, adapter)
- `lib/mongodb.js` - MongoDB client connection for session storage

**Key Patterns**:
- Uses App Router file-based routing (files in `app/` directory)
- Server Components by default (no "use client" directive means server component)
- Metadata exports in layout files for SEO
- Server Actions for authentication (signIn, signOut functions)
- Session checking with `await auth()` in Server Components

**Build Output**: `.next/` directory (gitignored)

## Authentication

**Provider**: NextAuth.js v5 (Auth.js) with Google OAuth

**Dependencies**:
- `next-auth@beta` - Authentication library for Next.js
- `mongodb` - MongoDB driver for database operations
- `@auth/mongodb-adapter` - MongoDB adapter for NextAuth.js

**Authentication Flow**:
1. Unauthenticated users are redirected to `/login`
2. Click "Sign in with Google" triggers Google OAuth flow
3. After successful authentication, user is redirected to home page
4. User session and account data stored in MongoDB
5. Protected pages check authentication with `await auth()`

**Usage in Pages**:
```javascript
import { auth } from "../auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Access user data: session.user.email, session.user.name, session.user.image
  return <div>Protected content</div>
}
```

**Sign Out**:
```javascript
import { signOut } from "../auth"

// In a Server Action
<form action={async () => {
  "use server"
  await signOut({ redirectTo: "/login" })
}}>
  <button type="submit">Sign Out</button>
</form>
```

## Environment Variables

Required environment variables in `.env` file (gitignored):

```bash
# MongoDB connection string for session storage
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Google OAuth credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# NextAuth secret for encrypting tokens and sessions
AUTH_SECRET=your-random-secret-key

# Base URL for authentication callbacks
# Development: http://localhost:3000
# Production: https://v2.sayantanmishra.com
AUTH_URL=http://localhost:3000
```

**Google Cloud Console Setup**:
- Create OAuth 2.0 Client ID in Google Cloud Console
- Add authorized redirect URIs:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://v2.sayantanmishra.com/api/auth/callback/google`

## Notes

- No TypeScript configuration present - project uses plain JavaScript
- Inline styles used for components (no Tailwind or CSS modules)
- No testing framework configured
- Production site hosted at: `v2.sayantanmishra.com`
