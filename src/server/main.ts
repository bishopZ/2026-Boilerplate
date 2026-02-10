import { BASE } from './shared/constants';
import { DEFAULT_PORT } from './config/constants';
import express from 'express';
import ViteExpress from 'vite-express';
import session from 'express-session';
import passport from 'passport';
import { fileURLToPath } from 'url';
import path from 'path';
import { sessionConfig } from './config/session';
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';
import pageRoutes from './routes/pages';

declare module 'express-session' {
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  export interface SessionData {
    // Use this interface to add custom properties to the session
    // csrfToken: string;
    // loginAttempts: number;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupMiddleware = (app: express.Application) => {
  app.set('trust proxy', 1); // trust first proxy
  app.use(express.static(`${__dirname}/public`));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session(sessionConfig));
  app.use(passport.authenticate('session'));
};

const setupRoutes = (app: express.Application) => {
  // Auth routes (login, logout)
  app.use(authRoutes);

  // API routes
  app.use(apiRoutes);

  // Page routes (handled by Vite/React)
  app.use(pageRoutes);
};

const startServer = () => {
  const app = express();

  setupMiddleware(app);
  setupRoutes(app);

  const port = parseInt(process.env.PORT ?? DEFAULT_PORT, BASE);
  const displayPort = new Intl.NumberFormat('en-US', {
    useGrouping: false,
  }).format(port);

  ViteExpress.listen(app, port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `${process.env.NODE_ENV ?? ''} Server is listening on ${displayPort}.`
    );
  });
};

startServer(); // Start the server
