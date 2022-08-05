import { Request, Response, NextFunction, Application } from 'express';
import { authAPI } from '../middleware/auth';
import apiRouter from './api';
import siteRouter from './site';

const route = (app: Application) => {
  app.use('/api', authAPI, apiRouter);

  app.use('/', siteRouter);

  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Not found services');
  });
};

export default route;
