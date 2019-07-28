import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';

export const checkRatesParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.source) {
    throw new HTTP400Error('Missing "source" parameter');
  } else if (!req.query.target) {
    throw new HTTP400Error('Missing "target" parameter');
  } else {
    next();
  }
};
