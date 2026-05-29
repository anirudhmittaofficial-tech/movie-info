# 🎬 MOVIE Info — IMDb Clone

> A beginner-friendly React.js college project that replicates the IMDb experience.
> Built using **only syllabus-level React concepts** with Vite.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [How It Works — The Big Picture](#-how-it-works--the-big-picture)
3. [Folder Structure Explained](#-folder-structure-explained)
4. [Application Workflow (Step-by-Step)](#-application-workflow-step-by-step)
5. [File-by-File Explanation](#-file-by-file-explanation)
6. [Syllabus Concepts Used](#-syllabus-concepts-used)
7. [How To Run](#-how-to-run)
8. [Tech Stack](#-tech-stack)

---

## 🎯 Project Overview

**WHAT**: MOVIE Info is a frontend-only IMDb clone that lets users:
- Browse trending, now playing, top-rated, and upcoming movies
- Search for movies
- View detailed movie information (cast, crew, ratings, budget)
- Create an account and sign in (simulated with localStorage)
- Save movies to a personal watchlist (persisted in localStorage)

**WHY**: This project demonstrates all core React.js concepts taught in the college syllabus — from basic JSX and components to Context API and protected routes.

**HOW**: The app fetches real movie data from the TMDB (The Movie Database) API using `fetch()`, manages state with `useState` and Context API, handles routing with React Router DOM, and persists data using `localStorage`.

---

## 🔄 How It Works — The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                           │
│                    (HTML entry point)                        │
│                           │                                 │
│                      loads main.jsx                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        main.jsx                             │
│              (React entry point — renders App)              │
│                                                             │
│   Wraps App with these Providers (outer → inner):           │
│                                                             │
│   <BrowserRouter>          ← Enables URL routing            │
│     <AuthProvider>         ← Provides auth state globally   │
│       <WatchlistProvider>  ← Provides watchlist globally    │
│         <App />            ← The actual app                 │
│       </WatchlistProvider>                                   │
│     </AuthProvider>                                         │
│   </BrowserRouter>                                          │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                             │
│              (Root layout — always visible)                  │
│                                                             │
│   ┌─────────────────────────────────────────┐               │
│   │  Navbar (fixed at top)                  │               │
│   ├─────────────────────────────────────────┤               │
│   │  SearchOverlay (modal, opens on click)  │               │
│   ├─────────────────────────────────────────┤               │
│   │  AppRoutes (renders current page)       │               │
│   │    /          → HomePage                │               │
│   │    /movie/:id → MovieDetailPage         │               │
│   │    /signin    → SignInPage              │               │
│   │    /signup    → SignUpPage              │               │
│   │    /watchlist → ProtectedRoute          │               │
│   │                  → WatchlistPage        │               │
│   │    /*         → NotFoundPage (404)      │               │
│   ├─────────────────────────────────────────┤               │
│   │  Footer (always at bottom)              │               │
│   └─────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
    TMDB API (Internet)
        │
        │ fetch() requests
        ▼
   ┌─────────┐       ┌──────────────────┐
   │ tmdb.js │──────▶│  React Components │
   │  (API)  │       │  (Pages/UI)       │
   └─────────┘       └────────┬─────────┘
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
              ┌──────────┐ ┌──────┐ ┌──────────┐
              │AuthContext│ │State │ │Watchlist  │
              │(login/   │ │(use  │ │Context   │
              │ logout)  │ │State)│ │(add/     │
              └────┬─────┘ └──────┘ │ remove)  │
                   │                └────┬─────┘
                   ▼                     ▼
              ┌─────────────────────────────┐
              │      localStorage           │
              │  (persists auth token       │
              │   and watchlist data)       │
              └─────────────────────────────┘
```

---

## 📁 Folder Structure Explained

```
movie-info/
│
├── public/                    ← Static files (favicon, etc.)
│
├── src/                       ← ALL source code lives here
│   │
│   ├── api/                   ← WHERE: API communication layer
│   │   └── tmdb.js            ← WHAT: All TMDB API fetch calls
│   │                             WHY: Separates API logic from UI
│   │
│   ├── assets/                ← WHERE: Static assets
│   │   ├── images/            ← WHAT: Image files
│   │   └── icons/             ← WHAT: Icon files
│   │
│   ├── components/            ← WHERE: Reusable UI building blocks
│   │   ├── Navbar/            ← Navigation bar (top of every page)
│   │   ├── Footer/            ← Footer (bottom of every page)
│   │   ├── HeroSection/       ← Big banner on homepage
│   │   ├── MovieCard/         ← Single movie poster card
│   │   ├── MobileSidebar/     ← Slide-out menu for mobile
│   │   ├── SearchOverlay/     ← Full-screen search modal
│   │   ├── SkeletonLoader/    ← Placeholder shapes while loading
│   │   ├── SpinnerLoader/     ← Loading spinner (react-spinners)
│   │   └── ProtectedRoute/    ← Auth guard wrapper
│   │
│   ├── context/               ← WHERE: Global state management
│   │   ├── AuthContext.jsx    ← WHAT: Login/logout/user state
│   │   └── WatchlistContext.jsx ← WHAT: Watchlist add/remove state
│   │                             WHY: Avoids prop drilling
│   │
│   ├── pages/                 ← WHERE: Full-page components
│   │   ├── HomePage/          ← Landing page with movie rows
│   │   ├── MovieDetailPage/   ← Individual movie details
│   │   ├── SignInPage/        ← Login form
│   │   ├── SignUpPage/        ← Registration form
│   │   ├── WatchlistPage/     ← User's saved movies
│   │   └── NotFoundPage/      ← 404 error page
│   │
│   ├── routes/                ← WHERE: Routing configuration
│   │   └── AppRoutes.jsx      ← WHAT: Maps URLs to pages
│   │
│   ├── utils/                 ← WHERE: Helper functions
│   │   ├── constants.js       ← WHAT: API keys, nav links, config
│   │   ├── helpers.js         ← WHAT: Formatting functions
│   │   └── localStorage.js   ← WHAT: JWT + localStorage utilities
│   │
│   ├── App.jsx                ← WHAT: Root component (layout)
│   ├── App.css                ← WHAT: Layout styles
│   ├── main.jsx               ← WHAT: React entry point
│   └── index.css              ← WHAT: Global styles & design tokens
│
├── index.html                 ← HTML shell (loads main.jsx)
├── package.json               ← Dependencies & scripts
├── vite.config.js             ← Vite build configuration
└── README.md                  ← This file
```

### WHY This Structure?

| Principle | Explanation |
|-----------|-------------|
| **Separation of Concerns** | API calls, UI components, pages, state, and utilities are in separate folders |
| **Component-per-Folder** | Each component has its `.jsx` and `.css` together — easy to find |
| **Reusability** | Components like `MovieCard` are used in multiple pages |
| **No Prop Drilling** | Context API (`context/`) provides global state without passing props through every level |

---

## 🔄 Application Workflow (Step-by-Step)

### Step 1: App Starts → `index.html` → `main.jsx`

```
User opens http://localhost:5173
    → Browser loads index.html
    → index.html loads main.jsx via <script>
    → main.jsx renders <App /> wrapped in Providers
```

**WHY Providers?** Without Providers, every component would need auth and watchlist data passed down as props through many layers. Context API Providers make this data available *anywhere* in the component tree.

### Step 2: App.jsx Renders Layout

```
App.jsx renders:
    1. <Navbar />          — always visible at top
    2. <SearchOverlay />   — hidden until user clicks search icon
    3. <AppRoutes />       — renders the current page based on URL
    4. <Footer />          — always visible at bottom
```

### Step 3: User Visits Home Page (`/`)

```
URL: / → AppRoutes → <HomePage />

HomePage does:
    1. useState() creates empty arrays for trending, nowPlaying, topRated, upcoming
    2. useState() creates loading=true and error=null
    3. useEffect() runs on mount (empty dependency array [])
    4. Inside useEffect: calls fetch() via tmdb.js API functions
    5. API returns data → setState updates the arrays → loading=false
    6. Component re-renders with movie data
    7. Renders <HeroSection /> with first trending movie
    8. Renders 4 <MovieRow /> sections, each containing <MovieCard /> components
```

### Step 4: User Clicks a Movie → Movie Detail (`/movie/:id`)

```
URL: /movie/12345 → AppRoutes → <MovieDetailPage />

MovieDetailPage does:
    1. useParams() extracts "12345" from the URL
    2. useEffect([id]) fetches movie details, credits, similar movies
    3. Shows SpinnerLoader while loading
    4. On success: renders backdrop, poster, title, genres, cast, etc.
    5. useContext(WatchlistContext) provides watchlist toggle button
```

### Step 5: User Clicks "Add to Watchlist"

```
User clicks watchlist button on any MovieCard or HeroSection

Flow:
    1. onClick calls toggleWatchlist(movie) from WatchlistContext
    2. WatchlistContext checks: is movie already in list?
    3. If NO → adds movie to watchlist array (immutable: [...prev, newMovie])
       Uses uuid package to generate unique watchlist entry ID
    4. If YES → removes movie (immutable: prev.filter(m => m.id !== movieId))
    5. useEffect([watchlist]) detects change → saves to localStorage
    6. All components using WatchlistContext automatically re-render
```

### Step 6: User Tries to Visit Watchlist Page (`/watchlist`)

```
URL: /watchlist → AppRoutes → <ProtectedRoute> → <WatchlistPage />

ProtectedRoute does:
    1. useContext(AuthContext) gets { isAuthenticated, loading }
    2. If loading → shows SpinnerLoader
    3. If NOT authenticated → <Navigate to="/signin" /> (redirect)
    4. If authenticated → renders <WatchlistPage /> (children)
```

### Step 7: User Signs Up (`/signup`)

```
URL: /signup → <SignUpPage />

SignUpPage does:
    1. useState() for name, email, password, confirmPassword (controlled components)
    2. On form submit: validates inputs client-side
    3. Calls register(name, email, password) from AuthContext
    4. AuthContext → localStorage.js → registerUser():
       a. Checks if email already exists in localStorage
       b. Creates user object with hashed password
       c. Saves user to localStorage "database"
       d. Creates fake JWT token
       e. Saves token to localStorage
    5. On success: useNavigate() redirects to home page
    6. AuthContext updates: user state + isAuthenticated = true
    7. Navbar re-renders showing user avatar instead of "Sign In" button
```

### Step 8: User Signs In (`/signin`)

```
Same flow as signup, but calls login(email, password) instead.
Verifies password against stored hash.
```

### Step 9: User Searches for a Movie

```
User clicks search icon in Navbar
    → App.jsx sets searchOpen=true
    → <SearchOverlay isOpen={true} /> renders
    → User types in input (controlled component)
    → useEffect([query]) with debounce (400ms timeout):
        - Waits 400ms after user stops typing
        - Calls searchMovies(query) from tmdb.js
        - Sets results in state
    → Results render as clickable links
    → Clicking a result navigates to /movie/:id and closes overlay
```

---

## 📄 File-by-File Explanation

### Entry Points

| File | What | Why | Which Concepts |
|------|------|-----|----------------|
| `index.html` | HTML shell with `<div id="root">` | React needs a DOM element to mount into | HTML basics |
| `main.jsx` | Renders `<App />` with all Providers | Sets up Context providers and Router for the entire app | Context Provider (IX/X), BrowserRouter (VI) |
| `App.jsx` | Root layout (Navbar + Routes + Footer) | Defines the page structure that's always visible | Functional Components (I), useState (II) |
| `index.css` | Global styles, CSS variables, resets | Design system tokens (colors, fonts, spacing) used everywhere | CSS, Design Tokens |
| `App.css` | Layout styles for the app wrapper | Flexbox layout for sticky footer | CSS Flexbox |

### API Layer (`src/api/`)

| File | What | Why | Which Concepts |
|------|------|-----|----------------|
| `tmdb.js` | All TMDB API functions | Centralises API calls — components just call `getTrending()` etc. | fetch() (VI), async/await, Error Handling |

**How tmdb.js works:**
```javascript
// 1. Build URL with API key and parameters
const url = new URL(`${BASE_URL}/trending/movie/week`);
url.searchParams.set('api_key', API_KEY);

// 2. Make the fetch request
const response = await fetch(url.toString());

// 3. Parse the JSON response
const data = await response.json();

// 4. Return data to the component that called this function
return data;
```

### Context Layer (`src/context/`)

| File | What | Why | Which Concepts |
|------|------|-----|----------------|
| `AuthContext.jsx` | Global auth state (user, login, logout) | Any component can check if user is logged in without prop drilling | Context API (IX/X), useState (II), useEffect (V) |
| `WatchlistContext.jsx` | Global watchlist state (add, remove, toggle) | Watchlist data needed in Navbar, HomePage, MovieDetailPage, WatchlistPage | Context API (IX/X), useState (II), useEffect (V), UUID (IV), Immutability (IV) |

**How Context API works (3 steps):**
```javascript
// Step 1: CREATE the context
const AuthContext = createContext(null);

// Step 2: PROVIDE the value (in AuthProvider component)
<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
  {children}
</AuthContext.Provider>

// Step 3: CONSUME in any component
const { user, isAuthenticated } = useContext(AuthContext);
```

### Components (`src/components/`)

| Component | What It Does | Where It's Used | Key Concepts |
|-----------|-------------|-----------------|--------------|
| **Navbar** | Top navigation bar with logo, links, search, user menu | `App.jsx` (every page) | useState, useEffect, useContext, Conditional Rendering, Lists/Keys |
| **Footer** | Bottom footer with links and copyright | `App.jsx` (every page) | Functional Component, JSX |
| **HeroSection** | Large movie banner with backdrop image | `HomePage` | Props, Conditional Rendering (&&, ternary) |
| **MovieCard** | Single movie poster card with rating | `HomePage`, `MovieDetailPage` | Reusable Component, Props, Event Handling |
| **MovieRow** | Horizontal row of MovieCards with title | `HomePage` (inline) | Reusable Component, useContext, Lists/Keys |
| **MobileSidebar** | Slide-out navigation for mobile screens | `Navbar` | Props, useContext, Conditional Rendering |
| **SearchOverlay** | Full-screen search with live results | `App.jsx` | useState, useEffect (multiple), Controlled Components, fetch |
| **SkeletonLoader** | Gray placeholder shapes during loading | `HomePage` | Functional Component, Props, Lists |
| **SpinnerLoader** | Animated loading spinner | `ProtectedRoute`, `MovieDetailPage` | react-spinners package, Props |
| **ProtectedRoute** | Wrapper that checks auth before rendering | `AppRoutes.jsx` | Wrapper Component, useContext, Navigate |

### Pages (`src/pages/`)

| Page | URL | What It Shows | Key Concepts |
|------|-----|---------------|--------------|
| **HomePage** | `/` | Hero banner + 4 movie category rows | useState (multiple), useEffect, useContext, fetch, Loading/Error/Success views |
| **MovieDetailPage** | `/movie/:id` | Full movie info, cast, crew, similar movies | useParams, useState, useEffect([id]), useContext, Conditional Rendering |
| **SignInPage** | `/signin` | Login form | Controlled Components, Form Handling, useContext, useNavigate |
| **SignUpPage** | `/signup` | Registration form | Controlled Components, Form Validation, useContext, useNavigate |
| **WatchlistPage** | `/watchlist` | List of saved movies | useContext (WatchlistContext), Lists/Keys, Conditional Rendering |
| **NotFoundPage** | `/*` (any unknown URL) | 404 error message | Functional Component, Link |

### Routes (`src/routes/`)

| File | What | Why |
|------|------|-----|
| `AppRoutes.jsx` | Maps URL paths to page components | Centralised routing — easy to see all routes in one place |

**How routing works:**
```jsx
<Routes>
  <Route path="/"          element={<HomePage />} />
  <Route path="/movie/:id" element={<MovieDetailPage />} />      // :id = path parameter
  <Route path="/watchlist"  element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
  <Route path="*"          element={<NotFoundPage />} />          // catch-all 404
</Routes>
```

### Utilities (`src/utils/`)

| File | What | Why | Which Concepts |
|------|------|-----|----------------|
| `constants.js` | API keys, nav links, genre list | Single source of truth — change once, updates everywhere | JavaScript Modules, export/import |
| `helpers.js` | `truncateText()`, `extractYear()`, `formatRuntime()`, `formatRating()`, `formatCurrency()` | Pure utility functions reused across multiple components | JavaScript Functions |
| `localStorage.js` | JWT token creation/verification, user registration/login, localStorage read/write | Simulates backend authentication entirely on the frontend | localStorage (V), JSON methods (V), JWT simulation (VII) |


## 📚 Syllabus Concepts Used

### Module I — JSX, Components, Props, Lists, Keys, Vite
- **WHERE**: Every `.jsx` file uses JSX
- **WHERE**: All components are functional components
- **WHERE**: `MovieCard`, `HeroSection`, `MobileSidebar` receive props
- **WHERE**: `HomePage`, `MovieDetailPage` use `.map()` with keys to render lists
- **WHERE**: Project bootstrapped with Vite (`vite.config.js`)

### Module II — useState, Conditional Rendering, Styles Based on State
- **WHERE**: `HomePage` — `useState` for trending, nowPlaying, topRated, upcoming, loading, error
- **WHERE**: `Navbar` — `useState` for scrolled, sidebarOpen, userMenuOpen
- **WHERE**: `MovieCard` — ternary for poster vs placeholder
- **WHERE**: `HomePage` — `&&` operator for showing movie rows only if data exists
- **WHERE**: `Navbar` — `className` changes based on `scrolled` state

### Module III — Debugging & Best Practices
- **WHERE**: `console.error()` in catch blocks for debugging API failures
- **WHERE**: Error boundaries in all page-level components

### Module IV — UUID, Immutability, Updating Lists/Objects
- **WHERE**: `WatchlistContext` — `uuidv4()` for unique watchlist entry IDs
- **WHERE**: `WatchlistContext` — `[...prev, newItem]` for adding (immutable)
- **WHERE**: `WatchlistContext` — `.filter()` for removing (immutable)

### Module V — useEffect, Dependency Array, localStorage, JSON, Cleanup
- **WHERE**: `HomePage` — `useEffect([], ...)` fetches data on mount
- **WHERE**: `MovieDetailPage` — `useEffect([id], ...)` refetches on ID change
- **WHERE**: `Navbar` — `useEffect` with cleanup for scroll listener
- **WHERE**: `WatchlistContext` — `useEffect([watchlist])` syncs to localStorage
- **WHERE**: `AuthContext` — `useEffect` with cleanup (clearInterval) for token expiry
- **WHERE**: `localStorage.js` — `JSON.parse()` and `JSON.stringify()`

### Module VI — fetch, React Router, useParams, Controlled Components, React Spinner
- **WHERE**: `tmdb.js` — all API calls use `fetch()`
- **WHERE**: `AppRoutes.jsx` — `Routes`, `Route`, `BrowserRouter`
- **WHERE**: `MovieDetailPage` — `useParams()` gets movie ID from URL
- **WHERE**: `SignInPage`, `SignUpPage` — controlled inputs with `value` + `onChange`
- **WHERE**: `SearchOverlay` — controlled search input
- **WHERE**: `SpinnerLoader` — uses `react-spinners` (ClipLoader)

### Module VII — Frontend Auth, JWT, useNavigate, Navigate
- **WHERE**: `localStorage.js` — `createToken()`, `verifyToken()` (simulated JWT)
- **WHERE**: `SignInPage` — `useNavigate()` to redirect after login
- **WHERE**: `ProtectedRoute` — `<Navigate to="/signin" />` for unauthorized users

### Module VIII — Protected Routes, Wrapper Components, API Views
- **WHERE**: `ProtectedRoute` — wrapper component checking auth
- **WHERE**: `HomePage` — loading view (SkeletonLoader), error view, success view
- **WHERE**: `MovieDetailPage` — loading (SpinnerLoader), error, success views

### Module IX/X — Context API, Provider, useContext
- **WHERE**: `AuthContext.jsx` — `createContext()`, `AuthProvider`, `useContext(AuthContext)`
- **WHERE**: `WatchlistContext.jsx` — `createContext()`, `WatchlistProvider`, `useContext(WatchlistContext)`
- **WHERE**: `Navbar`, `MobileSidebar`, `ProtectedRoute` — consume AuthContext
- **WHERE**: `HomePage`, `MovieDetailPage`, `WatchlistPage` — consume WatchlistContext
- **WHERE**: `main.jsx` — Providers wrap the entire app

---

## 🚀 How To Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# http://localhost:5173

# 4. Build for production (optional)
npm run build
```

---

## 🛠️ Tech Stack

| Technology | Purpose | Syllabus Module |
|------------|---------|-----------------|
| **React 19** | UI library | All modules |
| **Vite** | Build tool & dev server | Module I |
| **React Router DOM** | Client-side routing | Module VI |
| **react-spinners** | Loading spinner components | Module VI |
| **uuid** | Unique ID generation | Module IV |
| **TMDB API** | Real movie data | Module VI |
| **localStorage** | Data persistence (auth + watchlist) | Module V |
| **Vanilla CSS** | Styling with CSS variables | — |

---

## 👤 Authentication Flow

```
┌──────────┐     ┌───────────┐     ┌──────────────┐
│  SignUp   │────▶│ Register  │────▶│ Save to      │
│  Page     │     │ Function  │     │ localStorage │
└──────────┘     └───────────┘     └──────┬───────┘
                                          │
                                          ▼
┌──────────┐     ┌───────────┐     ┌──────────────┐
│  SignIn   │────▶│  Login    │────▶│ Verify &     │
│  Page     │     │ Function  │     │ Create Token │
└──────────┘     └───────────┘     └──────┬───────┘
                                          │
                                          ▼
                                   ┌──────────────┐
                                   │ AuthContext   │
                                   │ updates state │
                                   │ isAuthenticated│
                                   │ = true        │
                                   └──────┬───────┘
                                          │
                              ┌───────────┴───────────┐
                              ▼                       ▼
                       ┌──────────┐            ┌──────────┐
                       │ Navbar   │            │Protected │
                       │ shows    │            │Route     │
                       │ avatar   │            │allows    │
                       └──────────┘            │access    │
                                               └──────────┘
```

---

## 📝 Key Concepts for Viva

1. **What is Context API?** — A way to share state across components without passing props through every level (prop drilling).

2. **What is a Protected Route?** — A wrapper component that checks if the user is authenticated before rendering the page. If not, it redirects to the login page using `<Navigate />`.

3. **What is Immutability?** — Never modifying state directly. Instead, create new arrays/objects: `[...prev, newItem]` or `prev.filter(...)`.

4. **What is a Controlled Component?** — A form input whose value is controlled by React state via `value` and `onChange`.

5. **What is useEffect's Dependency Array?** — `[]` = run once on mount. `[id]` = run when `id` changes. No array = run every render.

6. **What is JWT?** — JSON Web Token — a token format for authentication. Our project simulates it on the frontend using base64 encoding + localStorage.

7. **Why use `fetch()` over `axios`?** — `fetch()` is built into the browser (no extra library needed) and is part of the syllabus.

8. **Why separate API, Context, Components, Pages?** — Separation of concerns makes code organized, reusable, and easier to debug.

---

*Built with ❤️ using React.js + Vite for college submission.*
