import { version } from '../../package.json';
import { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { createAPIRequest } from '../utils/axios';
import { get } from 'lodash';
import { Keys } from '../keys';
import { Workspaces } from '../workspaces';
import { Webhooks } from '../webhooks';
import { Templates } from '../templates';
import { DigiError } from '../error';
import { SessionEnvironment, SessionOptions } from '../types';
import { createRequest, getURI } from '../utils/fn';

const USER_AGENT =
  process.env.DIGISIGN_USER_AGENT || `digisign-node:${version}`;

export class DSFactory {
  readonly headers = initHeaders();
  readonly keys: Keys;
  readonly workspaces: Workspaces;
  readonly webhooks: Webhooks;
  readonly templates: Templates;
  constructor(
    private readonly apiKey: string,
    private readonly token: string,
    private readonly organisationId: string,
    readonly env: SessionEnvironment,
  ) {
    this.headers.set('Authorization', `Bearer ${this.token}`);
    this.headers.set('X-O10N-Identifier', this.organisationId);
    this.keys = new Keys(this);

    this.workspaces = new Workspaces(this);
    this.webhooks = new Webhooks(this);
    this.templates = new Templates(this);
  }
}

export function initHeaders() {
  const value: Record<string, string> = {
    'User-Agent': USER_AGENT,
    'Content-Type': 'application/json',
  };

  return new AxiosHeaders(value);
}

export async function createSession(options?: SessionOptions) {
  const headers = initHeaders();
  const xAPIKey = options?.key ?? process.env.DIGISIGN_API_KEY;

  if (!xAPIKey) {
    throw new Error(
      'Missing API key. Pass it to the constructor `createSession("ds_123")`',
    );
  }

  headers.set('X-API-KEY', xAPIKey);

  const env = options?.environment ?? SessionEnvironment.PRODUCTION;

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Number.POSITIVE_INFINITY,
    url: '/v1/keys/session',
    headers,
    baseURL: getURI(env),
  };

  try {
    const response = await createRequest(config);
    const token = get(response, ['data', 'meta', 'access_token']);
    const organisationId = get(response, ['data', 'data', 'organisation_id']);
    return new DSFactory(xAPIKey, token, organisationId, env);
  } catch (err) {
    throw new DigiError(
      get(err, ['response', 'data', 'statusCode']),
      get(err, ['response', 'data', 'message']),
    );
  }
}
