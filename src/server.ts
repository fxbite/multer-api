import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import route from './api/routes';

const app = express();
const port = process.env.PORT || 4000;

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Gzip
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      } else {
        return compression.filter(req, res);
      }
    }
  })
);

// Cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  const whitelist = [process.env.USER_ORIGIN, process.env.ADMIN_ORIGIN];
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
  app.use(cors(corsOptions));
}

// Public
app.use('/storage', express.static(path.join(__dirname, '../upload')));

// Route Init
route(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
