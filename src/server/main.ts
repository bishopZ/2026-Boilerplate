import { DEFAULT_PORT, BASE } from './config/constants';
import express from 'express';
import ViteExpress from 'vite-express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import { csrfProtection } from './middleware/csrf';
import { globalErrorHandler } from './middleware/error-handler';
import { attachRequestId } from './observability/middleware/request-id';
import { requestLogger } from './observability/middleware/request-logger';
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';
import pageRoutes from './routes/pages';
import { log } from './observability/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupMiddleware = (app: express.Application) => {
  app.set('trust proxy', 1);
  app.use(express.static(`${__dirname}/public`));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(attachRequestId);
  app.use(requestLogger);
};

const setupRoutes = (app: express.Application) => {
  app.use(csrfProtection);
  app.use(authRoutes);
  app.use(apiRoutes);
  app.use(pageRoutes);
  app.use(globalErrorHandler);
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
    log.info('server.started', {
      environment: process.env.NODE_ENV ?? 'development',
      port: displayPort,
    });
  });
};

startServer();
