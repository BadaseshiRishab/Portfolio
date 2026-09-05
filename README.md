# Rishab Ajeyakumar Badaseshi — Portfolio

Personal portfolio landing page built for Week 1 – Assignment 1 of the Software
Development Internship ("Build Your Personal Portfolio Landing Page").

## Project structure

```
portfolio-website/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│
└── README.md
```

## Features

- **Hero section** — name, role tagline, short intro, and call-to-action buttons
- **About Me** — background, technologies, and interests
- **Skills** — Languages, ML & Data, Embedded & IoT, Security & Comms, and Tools,
  grouped as tag/skill cards
- **Projects** — 3 featured projects with tech stack and description
- **Certifications & Achievements** — certifications, patents, awards, publication
- **Contact** — email, phone, LinkedIn, GitHub, and a client-side validated
  contact form
- **Footer** — copyright and build credit

### Design

- Fully responsive (mobile, tablet, desktop) using CSS Grid/Flexbox
- Consistent color system driven by CSS variables, with a **dark mode toggle**
  (persists via `localStorage`, falls back gracefully without it)
- Smooth scrolling navigation with an active-link indicator
- Scroll-reveal animations (`IntersectionObserver`) and hover effects on cards
- Respects `prefers-reduced-motion`

### JavaScript interactivity

- Mobile menu toggle
- Smooth scroll navigation (with active section highlighting)
- Scroll-triggered reveal animations
- Dark/light theme toggle
- Contact form validation (required fields, email format, minimum message length)

## Running locally

No build step is required — it's plain HTML/CSS/JS.

1. Download or clone this folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best
   experience (some browsers restrict certain features on `file://`):

   ```bash
   # Python 3
   python -m http.server 8000

   # or Node (npx)
   npx serve .
   ```

3. Visit `http://localhost:8000` (or the port shown).

## Customizing

- Replace the placeholder `#` links (LinkedIn, GitHub, project repos) in
  `index.html` with your real URLs.
- Add a profile photo to `images/` and reference it in the hero section if
  desired (currently text-only per the assignment's "optional" note).
- The contact form currently only validates input client-side and shows a
  confirmation message — wire it up to a real backend or a service like
  Formspree/EmailJS to actually send messages.

## Deployment

Deploy to any static host. Recommended free options:

- **GitHub Pages** — https://pages.github.com/
- **Netlify** — https://www.netlify.com/
- **Vercel** — https://vercel.com/

### Quick GitHub Pages steps

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then enable GitHub Pages in the repo's **Settings → Pages** (source: `main`
branch, root folder).

## Submission checklist

- [ ] GitHub repository link
- [ ] Live deployed website link
