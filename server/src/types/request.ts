import { Request } from 'express';

export interface AppRequest extends Request {
  abortController?: AbortController;
  abortSignal?: AbortSignal;
}
