A local-first web app boilerplate for 2026

## Transition to 2026

Welcome to the 2026 Boilerplate! This repository represents a fresh start for the new year, building upon the solid foundation established in the 2025 version. As we move forward into 2026, we're excited to welcome collaborators and discussions that will help shape the future direction of this boilerplate. We look forward to new additions, improvements, and community contributions that will make this an even better starting point for modern web applications.

## Motivation

We release a boilerplate every few years. Boilerplates go a little bit further than the starter projects that each library gives you, yet they land short of being an actual project. They give you a good starting point, if you want this exact mix of technologies. It also suggests good organizational patterns for a scalable code base.

When you create a starter application with create-next-app, vite, or the majority of similar command-line tools, the app you're given is wonderful in many ways, but fails to follow standard practices outside of the narrow scope of its base framework. It may come with many standard patterns for React, but not for CSS, accessibility, SEO, API, file organization and a host of other concerns that any person wanting to publish a well-made website needs.

If those repos are trying to be the simplest form of a specific technology, this repository aims to be the simplest form of a family of technologies. This repository aims to be an enhanced starter library, providing concise examples of all the features.

This boilerplate is right for you if:

- You need a flexible Node backend.
- You need user authentication.
- You will have a lot of state data that should persist across the application.


## 2026 stack

### Frontend

- Build Tool: Vite
- Static Typing: TypeScript
- UI Framework: React
- State Management: Redux Toolkit
- Routing: React Router
- Design System: Chakra UI
- React Error Boundary

### Backend

- Server Runtime: Node.js
- Web Framework: Express
- Template Engine: EJS
- Authentication Library: Passport.js

### Security and Storage

- Local Storage
- Crypto Library: Crypto JS

### Developer Experience

- E2E Testing: Cypress
- Linter: ESLint

The reasoning for each item is included below.


## Getting Started

### Development Setup

1. Clone the repo, `git clone git@github.com:bishopZ/2026-Boilerplate.git`. `cd 2026-Boilerplate` into the repo directory.
1. Create a file called `.env` in the root project folder by copying the template: `cp .envTemplate .env`
1. Edit `.env` and update the values:
   - `LOCAL_STORAGE_KEY="your-secret-key"` - Used to encrypt client-side data
   - `SESSION_SECRET="your-session-secret"` - Used to sign session cookies
2. Run `npm install` in the project root folder.
3. Run `npm run dev` to start the development server.
4. On the Login screen, use `test` for both the email and password.

### Running Tests

- `npm run test:e2e` - Run Cypress tests in headless mode
- `npm run test:e2e:open` - Open Cypress interactive test runner

### Project Structure

```
src/
├── client/                 # Frontend React application
│   ├── components/
│   │   ├── data/          # Redux store, reducers, and actions
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components (Home, About, etc.)
│   ├── shared/            # Client-side utilities and constants
│   ├── styles/            # CSS files
│   │   ├── reset.css      # CSS reset (Coyier CSS Starter)
│   │   └── index.css      # Global styles
│   ├── App.tsx            # Main app component with routing
│   └── main.tsx           # App entry point with providers
│
├── server/                # Backend Node.js application
│   ├── config/            # Configuration files (session, constants)
│   ├── controllers/       # Route handlers (auth, api)
│   ├── middleware/        # Custom middleware (authentication, etc.)
│   ├── routes/            # Route definitions (auth, api, pages)
│   ├── services/          # Business logic (auth, SEO)
│   ├── shared/            # Server-side utilities and constants
│   ├── templates/         # EJS templates for server-rendered pages
│   └── main.ts            # Server entry point
│
cypress/                   # E2E tests
├── e2e/                   # Test files
```

**Note on shared code:** The `client/shared` and `server/shared` folders are separate to avoid Vite bundling issues. Code that needs to be shared between client and server should be duplicated or refactored to work within the constraints of each environment.

### Server Setup with Heroku

1. Add the items from your `.env` file to the Config Vars section of your server's Settings page.
2. `heroku login` to login.
2. `heroku init` to create the project.
3. `git push heroku main` to build.

## Reasoning

### Vite

We're thrilled to have finally moved on from the complexities of Webpack. With Vite, we can focus on building modern web applications without worrying about tedious configuration and optimization. As Webpack's popularity waned, Rollup paved the way for Vite's arrival, making it easier than ever to switch to a more streamlined build tool.

### Typescript, React

TypeScript (TSX) offers numerous benefits over JavaScript (JSX), including better code completion, reduced runtime errors, and improved maintainability. In our experience, writing TSX files is *better* and *faster* than writing JSX file.

### React Error Boundary

Error boundaries are essential in creating robust and fault-tolerant web applications. By including an example of a React error boundary in the boilerplate, developers can use it as a reference to add error boundries to other places as the application grows.

### vite-express, Node, express

Vite's ability to run client and server-side components simultaneously is a game-changer for web development. With vite-express, we can enjoy the flexibility of choosing between Server-Side Rendering (SSR) or Client-Side Rendering (CSR), giving us more freedom in designing our API.

### EJS & SEO

For easy setting of SEO meta tag values, we chose to use EJS templates on Node.js. While this approach might be replaced with SSR implementation if needed, it provides a lightweight solution for basic SEO needs. The server is organized into a clear MVC pattern with separate folders for config, controllers, middleware, routes, services, and templates. This structure makes it easy to add server-rendered pages (like admin panels, login screens, or landing pages) alongside your React SPA. Use EJS templates when you need server-side rendering for SEO, authentication flows, or pages that don't require client-side interactivity.

### Redux Toolkit

After years of Reddit posts proclaiming the death of Redux, we remain strong advocates for its benefits. By providing a cleaner syntax for state management, Redux simplifies code complexity and makes it easier to manage global state in complex applications.

### Crypto JS

To ensure data persistence across browser refreshes and sessions, we've integrated CryptoJS for local storage encryption. This approach allows our application to securely store user data while maintaining seamless usability.

### Passport.js

By integrating Passport.js as an example login process, we can demonstrate authentication without compromising security or scalability. Future improvements will focus on implementing additional features like CSRF protection and login attempts limits, which may require a database solution.

### React Router

React Router enables seamless client-side navigation in single-page applications without full page reloads. By handling routing on the client side, the application feels faster and more responsive while maintaining clean, bookmarkable URLs. The boilerplate includes lazy loading of routes to optimize initial bundle size and improve performance.

### Chakra UI

Chakra UI provides a comprehensive design system with accessible, composable components that follow WAI-ARIA standards out of the box. Unlike heavier frameworks, Chakra offers excellent TypeScript support, a thoughtful API design, and powerful theming capabilities that make it easy to create consistent, professional interfaces without sacrificing flexibility. The component library strikes an ideal balance between providing enough structure to be productive while remaining customizable for unique design requirements.

### Cypress

Cypress provides reliable end-to-end testing with an excellent developer experience through its interactive test runner and automatic waiting. By including a basic Cypress setup with example tests, the boilerplate ensures developers can immediately verify critical user flows work as expected. E2E tests give confidence that authentication, navigation, and key features function correctly across the entire stack.

### ESlint

We added a very through custom config file for ESLint. It's battle-tested and aims to speed development, ignore problems that aren't real, and maximize the rules that can be automatically fixed by ESLint.


# Available Scripts

Quick reference guide for all available npm scripts in this boilerplate.

## Development

### `npm run dev`
Starts the development server with hot module reloading.
- Watches server files for changes
- Automatically restarts server on changes
- Runs on port 3000 by default (configurable via .env)
- Uses nodemon for server watching
- Uses Vite for client hot reloading

**When to use:** Day-to-day development

### `npm run type-check`
Runs TypeScript compiler in check mode without emitting files.
- Validates all TypeScript types
- Checks for type errors across the entire codebase
- Does not generate any output files

**When to use:** Before committing, in CI/CD pipelines

## Building

### `npm run build`
Creates a production-ready build.
- Compiles TypeScript
- Bundles client code with Vite
- Optimizes and minifies assets
- Outputs to `dist/` directory

**When to use:** Before deploying to production

### `npm run preview`
Previews the production build locally.
- Serves the built files from `dist/`
- Useful for testing production builds before deploying

**When to use:** After building, to verify production build works correctly

## Running

### `npm start`
Starts the server in production mode.
- Sets NODE_ENV=production
- Serves built assets
- No hot reloading or dev features

**When to use:** In production environments (Heroku, AWS, etc.)

## Code Quality

### `npm run lint`
Runs ESLint on the entire codebase.
- Checks all TypeScript files
- Reports style and code quality issues
- Does not fix issues automatically

**When to use:** To check for linting errors before committing

### `npm run lint:fix`
Runs ESLint and automatically fixes issues where possible.
- Auto-fixes formatting issues
- Auto-fixes some code quality issues
- Reports unfixable issues

**When to use:** Before committing, to clean up code automatically

## Testing

### `npm run test:e2e`
Runs Cypress end-to-end tests in headless mode.
- Runs all tests in `cypress/e2e/`
- Generates screenshots on failure
- Exits when complete

**When to use:** In CI/CD pipelines, before deploying

### `npm run test:e2e:open`
Opens the Cypress interactive test runner.
- Visual test runner with browser preview
- Hot reloading of tests
- Time travel debugging
- Great for writing and debugging tests

**When to use:** When writing or debugging E2E tests

## Common Workflows

### Starting a new feature
```bash
npm run dev
# Edit code with hot reloading
npm run lint:fix
npm run type-check
```

### Before committing
```bash
npm run lint:fix
npm run type-check
npm run test:e2e  # Optional but recommended
```

### Preparing for deployment
```bash
npm run type-check
npm run lint
npm run test:e2e
npm run build
npm run preview  # Verify build works
```

### Deploying to production
```bash
# On your server or in CI/CD
npm install
npm run build
npm start
```

## Development Server Requirements

The dev server requires:
- Node.js 22.20.0 or higher
- npm 11.6.2 or higher
- `.env` file with required environment variables

## Testing Requirements

E2E tests require:
- Development server running (`npm run dev`)
- Chrome, Firefox, or Edge browser installed
- Tests expect server on http://localhost:3000


## Environment Variables

Scripts use environment variables from `.env`:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `LOCAL_STORAGE_KEY`: Encryption key for local storage
- `SESSION_SECRET`: Session signing secret

## Troubleshooting

### `npm run dev` fails
- Check that `.env` file exists
- Verify environment variables are set
- Ensure port 3000 is not already in use

### `npm run build` fails
- Run `npm run type-check` to find TypeScript errors
- Run `npm run lint` to find linting issues
- Check console for specific error messages

### `npm run test:e2e` fails
- Ensure dev server is running
- Check that tests expect correct base URL
- Verify Cypress is installed correctly

### Type check passes but lint fails
- ESLint checks more than just types
- Run `npm run lint:fix` to auto-fix many issues
- Review ESLint config in `eslint.config.js`

## Sponsors

[Time 2 Magic](https://time2magic.com)

## License

MIT

