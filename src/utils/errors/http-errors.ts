export class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Para mantener el stack trace cuando heredamos de Error
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedException extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenException extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundException extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class ConflictException extends HttpError {
  constructor(message = "Conflict") {
    super(message, 403);
  }
}
