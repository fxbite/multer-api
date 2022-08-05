import { Request, Response, NextFunction } from 'express';

export const authAPI = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authSecret = {
      key: process.env.SECRET_KEY,
      host: process.env.SECRET_HOST
    };

    const authKey = req.header('X-HelloGIT-Key');
    const authHost = req.header('X-HelloGIT-Host');

    if (authKey === authSecret.key && authHost === authSecret.host) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
