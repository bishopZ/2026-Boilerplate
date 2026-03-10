# Technology Choices

The reasoning for each technology in the 2026 stack.

## Vite

We're thrilled to have finally moved on from the complexities of Webpack. With Vite, we can focus on building modern web applications without worrying about tedious configuration and optimization. As Webpack's popularity waned, Rollup paved the way for Vite's arrival, making it easier than ever to switch to a more streamlined build tool.

## TypeScript, React

TypeScript (TSX) offers numerous benefits over JavaScript (JSX), including better code completion, reduced runtime errors, and improved maintainability. In our experience, writing TSX files is *better* and *faster* than writing JSX file.

## vite-express, Node, express

Vite's ability to run client and server-side components simultaneously is a game-changer for web development. With vite-express, we can enjoy the flexibility of choosing between Server-Side Rendering (SSR) or Client-Side Rendering (CSR), giving us more freedom in designing our API.

## Redux Toolkit

After years of Reddit posts proclaiming the death of Redux, we remain strong advocates for its benefits. By providing a cleaner syntax for state management, Redux simplifies code complexity and makes it easier to manage global state in complex applications.

## Crypto JS

To ensure data persistence across browser refreshes and sessions, we've integrated CryptoJS for local storage encryption. This approach allows our application to securely store user data while maintaining seamless usability.

## Passport.js

Passport.js provides a clear, strategy-based example login flow that works well for a boilerplate while staying extensible. The current stack already includes CSRF protection middleware, `httpOnly` JWT cookies, and startup-time validation for `SESSION_SECRET`. For production evolution, teams can add rate limiting, audit logging, and stronger identity providers on top of this baseline.

## React Router

React Router enables seamless client-side navigation in single-page applications without full page reloads. By handling routing on the client side, the application feels faster and more responsive while maintaining clean, bookmarkable URLs. The boilerplate includes lazy loading of routes to optimize initial bundle size and improve performance.

## Chakra UI

Chakra UI provides a comprehensive design system with accessible, composable components that follow WAI-ARIA standards out of the box. Unlike heavier frameworks, Chakra offers excellent TypeScript support, a thoughtful API design, and powerful theming capabilities that make it easy to create consistent, professional interfaces without sacrificing flexibility. The component library strikes an ideal balance between providing enough structure to be productive while remaining customizable for unique design requirements.

## Cypress

Cypress provides reliable end-to-end testing with an excellent developer experience through its interactive test runner and automatic waiting. By including a basic Cypress setup with example tests, the boilerplate ensures developers can immediately verify critical user flows work as expected. E2E tests give confidence that authentication, navigation, and key features function correctly across the entire stack.

## ESLint

We added a very through custom config file for ESLint. It's battle-tested and aims to speed development, ignore problems that aren't real, and maximize the rules that can be automatically fixed by ESLint.
