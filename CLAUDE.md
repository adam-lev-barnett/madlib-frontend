# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Type-check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

This is a React 19 + TypeScript + Vite single-page app for turning any text into a madlib via an external backend API.

### Three-phase user flow

The app is orchestrated entirely by `LandingPage` (`src/pages/landing/LandingPage.tsx`) using a `MadlibPhase` union type (`"SUBMIT_SOURCE" | "REPLACE_WORDS" | "COMPLETE"`). All state and API calls live in `LandingPage`; child components are purely presentational and communicate upward via callbacks.

1. **SUBMIT_SOURCE** — `SourceTextSubmit` collects the source text and a "skipper" value (how many madlibifiable words to skip before blanking), then calls `POST /madlibs/madlibify` on the backend. Response: `{ blankedText, partsOfSpeech[] }`.
2. **REPLACE_WORDS** — `ReplacementWordForm` dynamically renders one `FormTextBox` per part of speech returned by the API. On submit, calls `POST /madlibs/fillMadlib`. Response: `{ completeMadlib }`.
3. **COMPLETE** — `CompletedMadlibBlock` displays the finished madlib text.

### Backend API

Production base URL: `https://sea-lion-app-qnlay.ondigitalocean.app`

In dev, `/api/*` proxies to `http://localhost:8080` (configured in `vite.config.ts`), but the current `LandingPage` calls the production URL directly — not through the proxy.

### Component structure

- `src/components/forms/Form.tsx` — Generic reusable form wrapper; accepts `formFields: ReactNode[]` and an `onSubmit` callback. Prevents default browser submission.
- `src/components/forms/entryfields/` — `FormTextBox` (single-line), `FormTextArea` (multi-line), `FormNumberEntry` (number input). Each calls `onChange` on every keystroke.
- `src/components/text/CompletedMadlibBlock.tsx` — Displays the final madlib result.
- `src/pages/partofspeechentry/WordReplacementText.tsx` — Static heading for the REPLACE_WORDS phase.

### Authentication

Google OAuth flow:
1. `GoogleLogin` (`src/components/GoogleLogin.tsx`) redirects the browser to `${VITE_BACKEND_URL}/oauth2/authorization/google`.
2. After Google authenticates, the backend redirects to `/auth/callback?token=...`.
3. `AuthCallback` (`src/pages/auth/AuthCallback.tsx`) reads the token from the URL, saves it to `localStorage`, dispatches `window.dispatchEvent(new Event('authChange'))`, then navigates to `/`.
4. `NavBar` (`src/components/NavBar.tsx`) listens for the `'authChange'` event via `useEffect` and re-reads `localStorage` to update its sign-in/sign-out button.

**Why the custom event?** `NavBar` and `AuthCallback` are sibling subtrees — neither is a parent of the other. React state can't flow between siblings without lifting it to a common ancestor. `localStorage` is a shared side-effect store that React doesn't know about, so writing to it doesn't trigger re-renders. The `window` custom event (`'authChange'`) is a lightweight broadcast that lets `AuthCallback` notify any listener (here, `NavBar`) that auth state changed, without needing a global state library (Redux, Zustand, Context) or prop-drilling all the way up to `App`.

The built-in `'storage'` event would be the natural solution, but browsers only fire it for changes made in *other* tabs — same-tab writes are silent. The custom event works in both same-tab and cross-tab scenarios when paired with a `storage` listener (only the custom event is needed here since everything happens in one tab).

### Analytics

`@vercel/analytics` is installed as a dependency but not yet wired up in `main.tsx`.
