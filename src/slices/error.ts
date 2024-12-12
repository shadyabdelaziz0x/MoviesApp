import {AxiosError} from 'axios';

interface APIError {
  description?: string;
  error_code?: number;
  ok?: boolean;
}

export interface RequestError extends APIError {
  message?: string;
  code?: string;
}

export const handleError = (error: AxiosError): RequestError => {
  const apiError = error as AxiosError<APIError>;
  return {
    code: apiError.code,
    message: apiError.message,
    description: apiError.response?.data?.description,
    error_code: apiError.response?.data?.error_code,
    ok: apiError.response?.data?.ok,
  };
};
