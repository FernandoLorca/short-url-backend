import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
};

export const urlsMiddlewares = {
  verifyToken,
};
