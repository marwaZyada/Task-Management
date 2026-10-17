# Task Management

A modern Angular-based task and project management application for organizing work, tracking progress, and collaborating across projects.

## Overview

This project provides a user-friendly workspace for:

- Authentication and account flows
- Project creation and management
- Team member management
- Epic and task tracking
- Dashboard-based progress overview
- Secure API configuration for backend services

The app uses Angular 21, TypeScript, Tailwind CSS, and environment-based configuration with a Supabase-compatible API endpoint.

## Features

- Sign up, login, forgot password, and reset password flows
- Dashboard landing page for project insights
- Project list with create, edit, and details views
- Epics, tasks, and team member management per project
- Responsive UI for desktop and mobile screens
- Environment-configured API access via generated asset config

## Tech Stack

- Angular 21
- TypeScript
- RxJS
- Tailwind CSS
- Angular CDK
- Angular Router
- Vitest for tests

## Project Structure

```text
src/
├── app/
│   ├── core/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── projects/
│   ├── layout/
│   └── shared/
├── assets/
├── styles/
├── index.html
├── main.ts
├── styles.css
├── app.config.ts
└── app.routes.ts
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 20+
- pnpm 10+
- A configured API endpoint and API key

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables.

The project reads `API_URL` and `API_KEY` from the environment and generates a config file at `src/assets/config.json` during startup/build.

Example values are provided in `.env.example`:

```bash
API_URL=https://your-api-url
API_KEY=your-api-key
```

If needed, copy it to a local `.env` file or update `.env.example` before running the app.

## Running the App

Start the development server:

```bash
pnpm start
```

Then open:

```text
http://localhost:4200/
```

The Angular app will automatically reload when files change.

## Production Build

Build the application for production:

```bash
pnpm build
```

The output will be generated in the `dist/` directory.

## Linting and Testing

Run linting:

```bash
pnpm lint
```

Run tests:

```bash
pnpm test
```

Format the project:

```bash
pnpm format
```

## Notes

- The `scripts/set-env.mjs` script generates `src/assets/config.json` from the environment variables before the app starts or builds.
- This project is configured to work with a backend/API service and is intended to be connected to your project data source.

## License

This project is currently unlicensed unless otherwise specified by the repository owner.
