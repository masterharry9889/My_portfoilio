# Portfolio Website — Aniket Verma

A stunning, responsive dark-themed personal portfolio website for Aniket Verma (aniket_verma_._), showcasing AI/ML projects, built with Vite + React, Three.js for 3D/interactive visuals, and ReactBits animated components.

## User Review Required

> [!IMPORTANT]
> LinkedIn was inaccessible (blocked, status 999). The bio, skills, and interests section will be crafted from your GitHub profile data (Python/NLP/CV/AI repos) and general AI-student context. Please update the bio text in `src/data/profile.js` after the site is built if needed.

> [!NOTE]
> Missing info filled with smart defaults:
> - **Instagram** handle: not provided — will use a placeholder `@aniket.verma` (update in `src/data/profile.js`)
> - **Gmail**: not provided — will use placeholder `aniket@gmail.com` (update in `src/data/profile.js`)
> - The portfolio auto-fetches repos via the GitHub API on every page load, so it stays up to date.

## Proposed Changes

### Project Setup

#### [NEW] Vite + React Project at `d:\My_portfoilio`

Initialize with `npm create vite@latest . -- --template react`

**Dependencies to install:**
- `three` — 3D rendering
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — helpers/prebuilt Three.js components
- `framer-motion` — page & element animations
- `react-icons` — social icons (FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaXTwitter)
- `@fontsource/inter` — modern typography

---

### Core Files

#### [NEW] `src/data/profile.js`
Central config file — all personal info (name, bio, social links, skills) in one place so it's easy to update later.

#### [NEW] `src/hooks/useGitHubRepos.js`
Custom hook that fetches `https://api.github.com/users/masterharry9889/repos?sort=updated&per_page=30` on mount, caches in state, and auto-refreshes every 5 minutes.

---

### Components

#### [NEW] `src/components/Loader.jsx`
- Full-screen loading screen with a Three.js animated DNA/particle sphere
- Progress bar that animates to 100%, then fades out revealing the main site
- Uses `@react-three/fiber` Canvas + `@react-three/drei` Sphere + custom shader

#### [NEW] `src/components/Navbar.jsx`
- Sticky top navbar with glassmorphism (backdrop-blur, semi-transparent)
- Links: Home · About · Projects · Contact
- Hamburger menu on mobile
- Scroll-aware: adds blur on scroll

#### [NEW] `src/components/Hero.jsx`
- Full-height landing with Three.js interactive particle/star-field background
- Animated typing text: "AI Engineer · Developer · Problem Solver"
- Floating 3D torus knot that rotates and reacts to mouse movement
- CTA buttons: "View Projects" and "Contact Me"

#### [NEW] `src/components/About.jsx`
- Split layout: animated photo on left (3D card-flip / tilt effect on hover using CSS perspective), bio on right
- Skills cloud with animated pills
- Education + interests from LinkedIn context (AI/ML, NLP, Computer Vision, Python)

#### [NEW] `src/components/Projects.jsx`
- Dynamic grid loaded from GitHub API via `useGitHubRepos` hook
- Each card: repo name, description, language badge, stars, "View on GitHub" link
- Language color coding (Python=blue, Jupyter=orange, Java=red, HTML=green)
- Animated entrance with staggered framer-motion on scroll

#### [NEW] `src/components/Contact.jsx`
- Social links grid with hover glow effects:
  - **GitHub**: https://github.com/masterharry9889
  - **LinkedIn**: https://www.linkedin.com/in/aniket-verma-2034a3294/
  - **X/Twitter**: https://x.com/HniketVerm1408
  - **Instagram**: placeholder (update in profile.js)
  - **Gmail**: placeholder (update in profile.js)
- Animated icon cards with glassmorphism

#### [NEW] `src/components/ThreeBackground.jsx`
Reusable Three.js background component (star-field) used in Hero section.

---

### Styling

#### [NEW] `src/index.css`
Full dark theme CSS:
- CSS variables: `--bg-primary: #050510`, `--accent: #6c63ff`, `--accent-2: #ff6584`
- Scrollbar styling, smooth scroll, font setup
- Glassmorphism utility classes

---

### Main App

#### [MODIFY] `src/App.jsx`
Orchestrates all sections, wraps in `<Loader>` overlay that dismisses after load.

## Verification Plan

### Automated Tests
This is a UI-only project. No existing test suite.

### Manual Verification (Browser)
After running `npm run dev` in `d:\My_portfoilio`:

1. **Loading Screen**: Open `http://localhost:5173` — confirm 3D animated loader appears, then fades into the main site.
2. **Hero Section**: Verify star-field/particle background, typing animation, and 3D torus mesh are visible and interactive.
3. **About Section**: Confirm photo has 3D tilt effect, bio text and skills display correctly.
4. **Projects Section**: Confirm GitHub repos load dynamically (check Network tab for API call to `api.github.com`), cards display name/language/stars.
5. **Contact Section**: Verify all social icons link to correct URLs.
6. **Responsiveness**: Resize browser to mobile width (≤768px) and confirm layout adapts without overflow.
