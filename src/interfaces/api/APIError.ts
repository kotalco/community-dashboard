export interface APIError {
  message: string;
  status: number;
  error: string;
  validations?: Record<string, string>;
}
