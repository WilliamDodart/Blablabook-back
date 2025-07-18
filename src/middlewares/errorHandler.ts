import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/customErrors';

export const errorHandler = (err, req: Request, res: Response) => {
  //Erreurs Zod
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((e) => ({
      //parse le chemin sous forme de string
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({ errors: zodErrors });
  }

  //Erreurs Personnalisées
  if (err instanceof AppError) {
    const customErrors = [{ field: err.field, message: err.message }];
    return res.status(err.statusCode).json({ errors: customErrors });
  }

  //Erreurs inattendues
  console.error('Erreur inconnue :', err);
  return res.status(500).json({ error: 'Erreur interne du serveur' });
};
