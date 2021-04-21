export class BadRequestException {
  message: string;
  statusCode: number;
  stack: string;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 400;
    this.stack = new Error().stack;
  }
}

export class InternalErrorException {
  message: string;
  statusCode: number;
  stack: string;
  constructor(message?: string) {
    this.message = message || 'Internal Error';
    this.statusCode = 500;
    this.stack = new Error().stack;
  }
}
