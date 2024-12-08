import { HttpStatusCode } from '../config/index.js';

export class BaseError extends Error {
  statusCode;
  errorCode;
  isToBeReported
  constructor({ statusCode, message, isToBeReported, errorCode }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isToBeReported = isToBeReported;
  }
}

export class BadRequestError extends BaseError {
  constructor(message, errorCode) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.BAD_REQUEST,
    });
  }
}

export class AuthorizationError extends BaseError {
  constructor(message, errorCode) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}

export class ConflictError extends BaseError {
  constructor(message, errorCode) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.CONFLICT,
    });
  }
}

export class ForbiddenError extends BaseError {
  constructor(message, errorCode) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.FORBIDDEN,
    });
  }
}

export class NotFoundError extends BaseError {
  constructor(message, errorCode) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.NOT_FOUND,
    });
  }
}
