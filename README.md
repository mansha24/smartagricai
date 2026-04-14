# SmartAgriAI

SmartAgriAI is a smart agriculture management system built with Next.js and Tailwind CSS. It provides a modern dashboard for monitoring farm sensors, irrigation status, crop health, and daily farming tasks.

## Features

- Farm overview with key performance metrics
- IoT sensor monitoring for soil moisture, temperature, humidity, and light
- Irrigation status and scheduling
- Crop planning and task management
- Responsive dashboard layout with Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Build

```bash
npm run build
```

## Project Structure

- `app/layout.tsx` — global layout, metadata, and font setup
- `app/page.tsx` — landing and dashboard home screen
- `app/globals.css` — global Tailwind styling and theme
- `app/api/auth` — auth endpoints for login, registration, and profile
- `app/api/users` — admin-only user list endpoint
- `app/api/public` — demo public endpoints with farm overview and telemetry
- `scripts/seed-demo.js` — seed script for demo accounts
- `.env.local.example` — environment variable template

## Demo credentials

Use `npm run seed-demo` after configuring `.env.local` to create demo accounts and output credentials/tokens.

- Admin: `admin@smartagri.local` / `Admin123!`
- Farmer: `farmer@smartagri.local` / `Farmer123!`
- UserFarmer: `userfarmer@smartagri.local` / `UserFarmer123!`

## Public APIs

- `GET /api/public/overview` — farm overview and alerts
- `GET /api/public/telemetry` — sample sensor telemetry data

## Notes

If you encounter build issues after switching branches or upgrading dependencies, remove `node_modules` and `package-lock.json`, then reinstall with `npm install`.
