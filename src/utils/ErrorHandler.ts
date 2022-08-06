export enum HttpCode {
  Bad_Request = 400,
  Unauthorized = 401,
  Server_Error = 500,
}

export interface ErrorHandlerProps {
  httpCode: HttpCode;
  message: string;
}

export class ErrorHandler extends Error implements ErrorHandlerProps {
  public readonly httpCode: number;

  constructor({ httpCode, message }: ErrorHandlerProps) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }

  // public readonly httpCode: HttpCode;

  // public readonly message: string;

  // constructor({ message, httpCode }: ErrorHandlerProps) {
  // super(message);
  // Object.assign(this, props);
  // Object.setPrototypeOf(this, new.target.prototype);

  // this.message = message;
  // this.httpCode = httpCode;
  // Error.captureStackTrace(this);
  // }
}
