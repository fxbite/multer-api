import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/favicon.io', (req: Request, res: Response, next: NextFunction) => {
  res.status(204).end();
});

export default router;
