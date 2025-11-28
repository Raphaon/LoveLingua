import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Validation failed', issues: err.errors });
    return;
  }

  const status = (err as ApiError).status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
};
