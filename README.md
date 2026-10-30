# Mejia Software

**Software built for real problems.**

Mejia Software is the independent software studio and central product platform of Jamie Mejia. It is designed to become the permanent discovery layer for products, free tools, open-source work, labs, automation, AI applications, case studies, and future commercial software.

This repository is the source of truth for the main Mejia Software website. It is not a replacement repository for individual products.

## Current MVP

The current foundation includes:

- Responsive studio homepage and software hub
- Product, Free Tools, Open Source, Labs, and About sections
- Honest product status labels with no fabricated customers or usage metrics
- Real weather integration with Open-Meteo
- Browser geolocation requested only after explicit user action
- Manual city search and local city preference storage
- GitHub repository metadata with graceful failure handling
- SEO metadata, robots and sitemap foundations
- Accessibility basics including semantic structure, keyboard focus, skip navigation, and reduced-motion support
- GitHub Actions checks for lint, TypeScript, and production builds

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Plain CSS design system
- Lucide React icons
- Open-Meteo Forecast + Geocoding APIs
- GitHub REST API
- OpenStreetMap Nominatim for low-volume reverse city lookup

## Architecture

The MVP is intentionally content-first and does not introduce a database or authentication before they are needed.

```text
app/
  api/             Server-side integrations
  products/        Product catalog
  tools/           Free tools catalog
  open-source/     Public repositories + live GitHub metadata
  labs/            Prototypes and experiments
  about/           Studio/developer information
components/        Reusable UI and interactive widgets
lib/               Typed project data and server integrations
```

Future admin/auth/database work can be added without rewriting the public information architecture.

## Local development

Requirements:

- Node.js 22.18+
- npm

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production only | Canonical site URL and sitemap base |
| `GITHUB_TOKEN` | No | Server-only GitHub API rate-limit headroom |

The weather integration does not require a client-exposed secret for the current provider. Never commit `.env`, tokens, passwords, database credentials, or API secrets.

## Verification

Run before pushing production changes:

```bash
npm run lint
npm run typecheck
npm run build
```

The same checks run in GitHub Actions.

## Weather/privacy behavior

- The browser does **not** request location automatically.
- Device location is requested only after the visitor chooses **Use my location**.
- Precise device coordinates are not saved to local storage.
- A manually selected city may be remembered locally so the widget can restore that city later.
- Provider failures display an error state; fake weather is never substituted.

Open-Meteo is appropriate for the early non-commercial MVP. Provider usage and commercial terms must be reviewed before the platform grows into significant paid traffic.

## Git workflow

Use meaningful branches and commits, for example:

- `feat/product-catalog`
- `feat/weather-integration`
- `fix/location-permission`
- `docs/setup`

Do not knowingly merge code that fails lint, type checking, or the production build.

## Deployment

Vercel is the recommended initial deployment target because the project uses Next.js server routes for weather and GitHub integrations. Configure `NEXT_PUBLIC_SITE_URL` to the final production URL after the first deployment.

## License

No license has been selected for this central repository yet. Do not assume reuse rights until a license is intentionally added.
