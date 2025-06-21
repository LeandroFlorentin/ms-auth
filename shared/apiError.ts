export class APIError extends Error {
  protected code: number;
  constructor(code: number, message?: string) {
    super(message);
    this.name = 'APIError';
    this.code = code;
  }
}
