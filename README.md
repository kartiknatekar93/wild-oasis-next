# The Wild Oasis: Guest Website

The guest-facing side of The Wild Oasis. Visitors browse cabins, pick dates, and make and manage reservations.

**Live demo:** https://wild-oasis-next-ebon.vercel.app/  
**Repo:** https://github.com/kartiknatekar93/wild-oasis-next



## Features

- Cabin listing with filtering by capacity
- Cabin detail pages with a date-range picker that disables booked dates
- Reservation creation, editing, and deletion
- Guest account area with profile updates (protected routes)
- Sign-in with Google
- Loading, error, and not-found states per route

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js (App Router) |
| Rendering | Server Components, Server Actions |
| Styling | Tailwind CSS |
| Database | Supabase |
| Auth | <NextAuth with Google / Supabase Auth, match what you built> |
| Language | <JavaScript / TypeScript> |

## How it works

- **Server Components for data:** pages fetch from the database directly on the server, so no API layer is needed and secrets never reach the browser. Client Components are kept small and at the leaves, only where state or browser APIs are needed.
- **Server Actions for mutations:** booking, updating a profile, and deleting a reservation run as Server Actions followed by `revalidatePath` to refresh the UI. Every action checks the session, validates input, and confirms the booking belongs to the user.
- **Streaming:** `loading.js` and Suspense boundaries show fallbacks while slow sections load. `error.js` and `not-found.js` handle failures per route segment.
- **Route protection:** middleware guards account routes, and sessions are checked again inside actions, since middleware alone is not enough.
- **Date range across components:** a context provider in a small client wrapper shares the selection between the calendar and the reservation form.
- **Dynamic routes:** cabin pages are generated with `generateStaticParams`, with metadata set per page and `next/image` for optimized images.
- **Double-booking prevention:** booked dates are fetched on the server and disabled in the picker, and validated again in the action.

## Design decisions and trade-offs

- **Server vs Client Components:** less JavaScript and safe database access on the server, at the cost of no hooks or interactivity there.
- **Server Actions vs API routes:** less boilerplate and colocated logic, but each action is a public endpoint and needs its own auth and validation. They are also harder to reuse from outside clients.
- **Static generation for cabin pages:** fast and cheap, but data can go stale, so revalidation is needed.
- **Caching:** powerful but the hardest part of Next.js to reason about, and it has changed between versions.
- **Hosting on Vercel:** smoothest path for Next.js, with some vendor coupling.

## Getting started

```bash
git clone <repo-url>
cd wild-oasis-website
npm install
```

Create a `.env.local` file:

```
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
# add your auth variables here (for example Google client ID/secret and an auth secret)
```

Then:

```bash
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Possible improvements

- A database constraint to prevent overlapping bookings
- Optimistic UI with `useOptimistic` for deleting reservations
- Playwright tests for the booking flow
- Server Action input validation with a schema library
- Accessibility audit of the date picker

## Credits

Built while following a React and Next.js course, then extended with: <list what you changed or added>.
