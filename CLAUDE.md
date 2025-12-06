# BG Wealth Sharing - Lee Meadows Team

A professional financial services web application featuring a public marketing landing page and a protected member dashboard with step-by-step onboarding.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 with custom Navy/Gold/White theme
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Auth:** localStorage session (demo mode)

## Project Structure

```
app/
├── page.tsx                    # Public landing page
├── login/page.tsx              # Login page
├── dashboard/
│   ├── layout.tsx              # Protected dashboard layout
│   ├── page.tsx                # Dashboard home
│   ├── onboarding/page.tsx     # Step-by-step onboarding
│   ├── signals/page.tsx        # Trading signals info
│   └── resources/page.tsx      # Resources and FAQs

components/
├── landing/
│   ├── Navigation.tsx          # Public nav
│   ├── HeroSection.tsx         # Hero with video
│   ├── ProjectOverview.tsx     # Win-Win-Win model
│   ├── AboutLeeMeadows.tsx     # Team leader profile
│   ├── TestimonialsGrid.tsx    # Video testimonials grid
│   └── Footer.tsx              # Site footer
├── dashboard/
│   └── Sidebar.tsx             # Dashboard navigation

data/
├── testimonials.ts             # 90+ testimonial video URLs
└── onboarding-steps.ts         # 7 onboarding steps with videos
```

## Color Scheme

- **Navy:** #000080 (primary)
- **Navy Dark:** #00004d
- **Gold:** #D4AF37 (accent)
- **Gold Light:** #e5c76b
- **Background:** #0a0a14

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
```

## Key Features

1. **Landing Page:**
   - Hero with auto-playing intro video
   - Tripartite model explanation
   - About Lee Meadows section
   - 90+ testimonial videos with lazy loading and pagination

2. **Member Dashboard:**
   - Protected route with localStorage session
   - Interactive onboarding checklist (7 steps)
   - YouTube video embeds for each step
   - Progress tracking saved to localStorage
   - Trading signals schedule
   - Resources and FAQs

## Deployment

Deploy to Vercel for production. No database required (uses localStorage for demo).

```bash
vercel --prod
```
