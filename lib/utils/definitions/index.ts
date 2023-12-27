import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { RequestOptions } from '../../types';

export abstract class APIDefinition {
  protected abstract extendConfig(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig;
  protected abstract baseConfig: AxiosRequestConfig;
  protected abstract headers: AxiosHeaders;
  abstract list(options?: RequestOptions): Promise<any>;
  abstract get(id: string, options?: RequestOptions): Promise<any>;
}
