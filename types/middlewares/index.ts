import { APIError } from '&/shared';
import { AxiosError } from 'axios';

export type ErrorType = APIError | AxiosError;
