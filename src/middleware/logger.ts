import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, Next: NextFunction) => {
  console.log(`${new Date().toISOString()}, ${req.method}, ${req.path}`);
  Next();
};
