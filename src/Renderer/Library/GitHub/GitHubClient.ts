import nodePath from 'path';
import {Logger} from '../Infra/Logger';
import {RemoteGitHubHeaderEntity} from '../Type/RemoteGitHubV3/RemoteGitHubHeaderEntity';
import {TimerUtil} from '../Util/TimerUtil';

export class GitHubClient {
  private readonly host: string;
  private readonly options: RequestInit;
  private readonly pathPrefix: string;

  constructor(accessToken, host, pathPrefix, https = true) {
    if (!accessToken || !host) {
      console.error('invalid access token or host');
      throw new Error('invalid access token or host');
    }

    this.host = `http${https ? 's' : ''}://${host}`;
    this.pathPrefix = pathPrefix;
    this.options = {
      headers: {
        'Authorization': `token ${accessToken}`
      }
    }
  }

  protected async request<T>(path: string, query?: {[key: string]: any}): Promise<{error?: Error; body?: T; statusCode?: number; headers?: Headers; githubHeader?: RemoteGitHubHeaderEntity}> {
    let requestPath = nodePath.normalize(`/${this.pathPrefix}/${path}`);
    requestPath = requestPath.replace(/\\/g, '/'); // for windows

    if (query) {
      const queryString = Object.keys(query).map(k=> `${k}=${encodeURIComponent(query[k])}`);
      requestPath = `${requestPath}?${queryString.join('&')}`;
    }

    const url = `${this.host}${requestPath}`;

    try {
      const res = await fetch(url, this.options);

      let fulfillRateLimit = false;
      const headers = res.headers;
      if (headers.get('x-ratelimit-limit')) {
        const limit = parseInt(headers.get('x-ratelimit-limit'), 10);
        const remaining = parseInt(headers.get('x-ratelimit-remaining'), 10);
        const resetTime = parseInt(headers.get('x-ratelimit-reset'), 10) * 1000;
        const waitMilli = resetTime - Date.now();
        if (remaining === 0) {
          Logger.warning(GitHubClient.name, `rate limit`, {
            limit,
            remaining,
            resetSec: waitMilli / 1000,
            path
          });
          await TimerUtil.sleep(waitMilli);
        }
      }

      const githubHeader: RemoteGitHubHeaderEntity = {
        gheVersion: headers.get('x-github-enterprise-version')?.trim() || null,
        // https://docs.github.com/ja/developers/apps/scopes-for-oauth-apps#available-scopes
        scopes: headers.get('x-oauth-scopes')?.split(',').map(s => s.trim()) || [],
        fulfillRateLimit,
      };

      if (res.status !== 200) {
        const errorText = await res.text();
        Logger.error(GitHubClient.name, `request error`, {error: new Error(errorText), path, query, statusCode: res.status});
        return {error: new Error(errorText), statusCode: res.status, githubHeader};
      }

      const body = await res.json();
      return {body, statusCode: res.status, headers: res.headers, githubHeader};
    } catch(e) {
      Logger.error(GitHubClient.name, `request error`, {error: e, path, query});
      return {error: e};
    }
  }
}
