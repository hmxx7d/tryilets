# IELTS Prep MVP

A minimal, production-leaning MVP for an IELTS preparation platform (Reading + Writing + Speaking upload placeholder).

## Features
- Landing page + Pricing
- Reading set (auto-graded) — sample data included
- Writing Task 2 — AI scoring via OpenAI (with local mock if no key)
- Speaking upload endpoint placeholder
- Dark, responsive UI with Tailwind

## Tech
- Next.js 14 (App Router)
- TailwindCSS
- Supabase (optional for auth/storage/db; schema provided in `supabase/schema.sql`)
- OpenAI API (optional; mocked if not configured)

## Quick Start
1. **Clone & install**
   ```bash
   npm i
   npm run dev
   ```

2. **Env**
   Copy `.env.example` to `.env` and fill in:
   - `OPENAI_API_KEY` (optional)
   - `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` if using Supabase

3. **Reading content**
   Sample at `public/content/reading-set-1.json`. Add more sets under `public/content/`.

4. **Writing scoring**
   - If `OPENAI_API_KEY` is set, real IELTS-style JSON feedback is returned.
   - Otherwise you get a safe **mock** response for local dev.

5. **Supabase (optional)**
   - Create project at supabase.com
   - Run `supabase/schema.sql` in the SQL editor
   - Configure Auth (email magic link recommended) and Storage for audio

6. **Deployment**
   - Vercel: import repo → set env vars
   - Domain: map to Vercel
   - (Optional) Payment: integrate Stripe/Thawani on `/pricing`

## Notes
- This MVP keeps things simple: no auth UI, no database writes. You can add those next.
- For Speaking: accept `multipart/form-data`, store to Supabase Storage, transcribe with Whisper, and score with OpenAI (see `/app/api/speaking-upload/route.ts`).

## Roadmap
- Auth + user dashboard with persistent scores
- More reading/listening sets
- Payment gates (Pro/Premium)
- Human review workflow for Premium users
- Mobile app (React Native / Expo) later
