import { version } from '../../package.json';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { createAPIRequest } from '../utils/axios';
import { get } from 'lodash';
import { Keys } from '../keys';
import { Workspaces } from '../workspaces';
import { Webhooks } from '../webhooks';
import { Templates } from '../templates';

const USER_AGENT =
  process.env.DIGISIGN_USER_AGENT || `digisign-node:${version}`;

export class DSFactory {
  readonly keys = new Keys(this);
  readonly workspaces = new Workspaces(this);
  readonly webhooks = new Webhooks(this);
  readonly templates = new Templates(this);
  readonly headers = initHeaders();
  constructor(
    readonly apiKey: string,
    readonly token: string,
    readonly organisationId: string,
  ) {
    this.headers.set('Authorization', `Bearer ${this.token}`);
    this.headers.set('X-O10N-Identifier', this.organisationId);
  }
}

export function initHeaders() {
  const value: Record<string, string> = {
    'User-Agent': USER_AGENT,
    'Content-Type': 'application/json',
  };

  return new AxiosHeaders(value);
}

export async function createRequest<T extends Record<string, any>>(
  config: AxiosRequestConfig,
) {
  return await createAPIRequest<T>(config);
}

export async function createSession(key?: string) {
  const headers = initHeaders();
  const xAPIKey = key ?? process.env.DIGISIGN_API_KEY;

  if (!xAPIKey) {
    throw new Error(
      'Missing API key. Pass it to the constructor `createSession("ds_123")`',
    );
  }

  headers.set('X-API-KEY', xAPIKey);

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Number.POSITIVE_INFINITY,
    url: '/v1/keys/session',
    headers,
  };

  try {
    const response = await this.createRequest(config);
    const token = get(response, ['data', 'meta', 'access_token']);
    const organisationId = get(response, ['data', 'data', 'organisation_id']);
    return new DSFactory(xAPIKey, token, organisationId);
  } catch (err) {
    console.log(err);
  }
}
