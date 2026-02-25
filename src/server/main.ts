import { BASE } from './shared/constants';
import { DEFAULT_PORT } from './config/constants';
import express from 'express';
import ViteExpress from 'vite-express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';
import pageRoutes from './routes/pages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupMiddleware = (app: express.Application) => {
  app.set('trust proxy', 1);
  app.use(express.static(`${__dirname}/public`));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
};

const setupRoutes = (app: express.Application) => {
  app.use(authRoutes);
  app.use(apiRoutes);
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

startServer();
