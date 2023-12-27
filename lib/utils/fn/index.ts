import { SessionEnvironment } from '../../types';
import { AxiosRequestConfig } from 'axios';
import { createAPIRequest } from '../axios';

export const getURI = (env: SessionEnvironment) => {
  if (env === SessionEnvironment.SANDBOX)
    return 'https://sandbox.usedigisign.dev';

  return 'https://api.usedigisign.com';
};

export async function createRequest<T extends Record<string, any>>(
  config: AxiosRequestConfig,
) {
  return await createAPIRequest<T>(config);
}
