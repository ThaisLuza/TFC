import { Request, Response, NextFunction } from 'express';

interface ErrorStatus extends Error {
  status?: number,
}

const errorHandler = (err:ErrorStatus, _req: Request, res:Response, _next:NextFunction) => {
  console.log(err);

  if (err.status) return res.status(err.status).json({ message: err.message });

  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
