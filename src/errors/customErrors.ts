export class AppError extends Error {
  //déclaration des prorpiétés
  statusCode: number;
  field?: string;
  //mise en place du constructor
  constructor(message: string | undefined, field: string, statusCode = 500) {
    super(message);
    //définition du nom et affectation des valeurs
    this.name = this.constructor.name;
    this.field = field;
    this.statusCode = statusCode;
    //capture de l'historique de l'erreur
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ressource introuvable', field = 'field') {
    super(message, field, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Requête invalide', field = 'field') {
    super(message, field, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Non autorisé', field = 'field') {
    super(message, field, 401);
  }
}
