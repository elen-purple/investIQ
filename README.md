# InvestIQ

InvestIQ is a personal finance tracker built with React, TypeScript, Redux Toolkit, Firebase, and Vite. The app lets users sign up or log in, manage their current balance, add income and expense records, review monthly summaries, and inspect spending/income statistics by category.

## Features

- Email/password registration and login through Firebase Authentication.
- User-specific Firestore data under `users/{userId}`.
- Balance editing with automatic balance-change records.
- Income and expense entry flows with categories.
- Transaction table with delete confirmation.
- Monthly summary for recent periods.
- Category statistics and chart view.
- Responsive desktop, tablet, and mobile layouts.
- Redux Persist for the user session state.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Redux Persist
- Firebase Authentication
- Cloud Firestore
- Formik
- Styled Components
- Chart.js / react-chartjs-2
- Swiper

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `npm run dev` - starts the Vite development server.
- `npm run build` - runs TypeScript build checks and creates a production build.
- `npm run lint` - runs ESLint.
- `npm run preview` - serves the built app locally.
- `npm run deploy` - deploys `dist` to GitHub Pages with `gh-pages`.

## Project Structure

```text
src/
  components/        Shared UI and feature components
  hooks/             Reusable React hooks
  imgs/              Responsive image assets
  pages/             Route-level pages
  redux/             Redux slices, selectors, async operations, and store setup
  services/          Firebase and theme configuration
```

## Firebase Data Model

The app stores each user's data in Firestore:

```text
users/{userId}
  balance: number

users/{userId}/money/{entryId}
  desc: string
  amount: number
  date: string
  category: string
  type: "+" | "-"
```

## Routing

The app is configured with `BrowserRouter` and the `/investIQ` basename for GitHub Pages deployment.

Main routes:

- `/signup` - registration page.
- `/login` - login page.
- `/spendMoney` - expense dashboard.
- `/getMoney` - income dashboard.
- `/categories/spendMoney` - expense category statistics.
- `/categories/getMoney` - income category statistics.

## Notes

- Firebase environment variables are required before the app can authenticate users or read/write Firestore data.
- This project is configured for deployment to `https://elen-purple.github.io/investIQ/`.
- If PowerShell blocks `npm` on Windows because of execution policy, use `npm.cmd` instead.
