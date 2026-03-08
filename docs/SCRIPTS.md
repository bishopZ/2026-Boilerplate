# Available Scripts

Full reference for all npm scripts in this boilerplate.

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

**When to use:** In production environments (Railway, AWS, etc.)

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

### `npm run test`
Runs the full validation suite: lint, type-check, and E2E tests.
- Equivalent to: `npm run lint && npm run type-check && npm run test:e2e`

**When to use:** Before committing, in CI/CD, when preparing for deployment

### `npm run test:e2e`
Runs Cypress end-to-end tests in headless mode.
- Runs all tests in `cypress/e2e/`
- Generates screenshots on failure
- Exits when complete
- Requires dev server running (`npm run dev`)

**When to use:** In CI/CD pipelines, before deploying. See [cypress/README.md](../cypress/README.md) for details.

### `npm run test:e2e:open`
Opens the Cypress interactive test runner.
- Visual test runner with browser preview
- Hot reloading of tests
- Time travel debugging
- Great for writing and debugging tests

**When to use:** When writing or debugging E2E tests

### `npm run check:i18n`
Validates i18n locale files (optional; only when fully translating all locales).
- Ensures en.json, ar.json, fr.json have the same keys
- Verifies all used message ids exist in all locale files
- Exits with code 1 on mismatch

**When to use:** Before committing when changing UI strings, if using option 3. See [scripts/README.md](../scripts/README.md) and [docs/I18N.md](I18N.md) for details.

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
npm run test
```

### Preparing for deployment
```bash
npm run test
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

## Requirements

### Development Server
- Node.js 24.13.1 or higher
- npm 11.10.1 or higher
- `.env` file with required environment variables

### E2E Tests
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
- Ensure dev server is running (`npm run dev`)
- Check that tests expect correct base URL
- Verify Cypress is installed correctly

### Type check passes but lint fails
- ESLint checks more than just types
- Run `npm run lint:fix` to auto-fix many issues
- Review ESLint config in `eslint.config.js`
