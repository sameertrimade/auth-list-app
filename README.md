# AuthListApp

An Angular demo application that showcases a simple authentication flow and a protected list view backed by a mock API. Users can log in, and upon successful authentication, access a departments list fetched from an in-memory backend. An HTTP interceptor attaches a bearer token to secure requests, while route guards protect restricted pages.

## Overview

- **Auth flow**: Login sets a cookie-based token; logout clears it. A route `AuthGuard` restricts access to protected routes.
- **HTTP interceptor**: Automatically adds `Authorization: Bearer <token>` to API calls when authenticated.
- **Mock backend**: Uses `angular-in-memory-web-api` to simulate `/api/login` and `/api/departments` endpoints with a fake JWT.
- **Departments list**: A protected page that displays sample hospital departments.

### Tech stack

- **Framework**: Angular 20
- **UI**: Angular Material, Feather icons
- **State/Signals**: `@ngrx/signals` (local store patterns)
- **HTTP/Mocks**: `angular-in-memory-web-api`
- **Cookies**: `ngx-cookie-service`

## Getting started

### Prerequisites

- Node.js 20+ and npm 10+
- Angular CLI (optional but recommended):

```bash
npm i -g @angular/cli
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

Then open `http://localhost:4200/`.

### Test login (mock)

- You can use any email. Any **non-empty** password is accepted by the mock API.
- On success, a fake token `fake-jwt-token-12345` is stored in cookies and applied to subsequent requests.

## Available scripts

```bash
npm start   # ng serve
npm run build
npm run watch
npm test
```

## Project structure (high-level)

- `src/app/core` — auth guard, auth service, HTTP interceptor, mock API service
- `src/app/auth` — login feature
- `src/app/list` — protected departments list and local store
- `src/app/shared` — reusable components, directives, and models

## Development notes

- The auth cookie names are `auth_token` and `user_email`.
- Protected APIs require header `Authorization: Bearer fake-jwt-token-12345` (handled by the interceptor).

## Code scaffolding

Generate a new component with:

```bash
ng generate component component-name
```

See all schematics:

```bash
ng generate --help
```

## Building

```bash
npm run build
```

Build artifacts are output to `dist/`. Production builds are optimized by default.

## Running unit tests

```bash
npm test
```

## Additional resources

- Angular CLI docs: https://angular.dev/tools/cli
