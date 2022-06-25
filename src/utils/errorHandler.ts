import { Response } from 'express';
import { ZodError } from 'zod';

export const handleCommonControllerError = (error: any, res: Response) => {
  if (error instanceof ZodError) {
    res.status(400).json(error.flatten());
  } else {
    res.status(500).json(error);
  }
};
