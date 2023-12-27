// Default config options
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultOptions = {
  baseURL: process.env.DIGISIGN_BASE_URL || 'https://api.usedigisign.com',
};

// Update instance
export const instance = axios.create(defaultOptions);

export const createAPIRequest = <Data = any, Config = any>(
  config: AxiosRequestConfig<Config>,
) => <Promise<AxiosResponse<Data, Config>>>instance(config);
