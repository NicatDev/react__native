import { logger } from "@/utils";

import { AuthHttpSettings } from "./auth-http-settings";

type Body = Record<string, any>;

declare global {
  export var __AUTH_HTTP_INSTANCE__: AuthHttp;
  export var __AUTH_HTTP_BASE_URL__: string;
}

export class AuthHttp {
  private isRequestRetry = false;

  constructor() {}

  static settings() {
    return AuthHttpSettings.instance();
  }

  static instance(): AuthHttp {
    return globalThis.__AUTH_HTTP_INSTANCE__ || (globalThis.__AUTH_HTTP_INSTANCE__ = new AuthHttp());
  }

  get<TResponse, TGetParams extends Body = Body>(
    url: string,
    params?: TGetParams,
    headers?: Record<string, string> | Headers
  ): Promise<TResponse> {
    return this.request(url, "get", params, headers);
  }

  post<TResponse, TBody extends Body = Body>(
    url: string,
    body?: TBody,
    headers?: Record<string, string> | Headers
  ): Promise<TResponse> {
    return this.request(url, "post", body, headers);
  }

  put<TResponse, TBody extends Body = Body>(
    url: string,
    body?: TBody,
    headers?: Record<string, string> | Headers
  ): Promise<TResponse> {
    return this.request(url, "put", body, headers);
  }

  patch<TResponse, TBody extends Body = Body>(
    url: string,
    body?: TBody,
    headers?: Record<string, string> | Headers
  ): Promise<TResponse> {
    return this.request(url, "patch", body, headers);
  }

  delete<TResponse>(url: string, headers?: Record<string, string> | Headers): Promise<TResponse> {
    return this.request(url, "delete", {}, headers);
  }

  async refreshToken() {
    const settings = AuthHttp.settings();
    if (!settings.refreshUrl) return;

    const oldTokens = settings.getTokens();
    if (!oldTokens || !oldTokens.access || !oldTokens.refresh) {
      await settings.removeTokens();
      throw new Error("Tokens not found");
    }
    const newTokens = await this.request<Record<string, string>>(settings.refreshUrl, "post", {
      refresh: oldTokens.refresh
    });

    const token = [
      settings.tokenKeys.access,
      settings.tokenKeys.access?.replace(/_token$/, ""),
      settings.tokenKeys.access?.replace(/-token$/, ""),
      settings.tokenKeys.access?.replace(/Token$/, "")
    ]
      .filter(Boolean)
      .find(key => key && newTokens?.[key] && typeof newTokens?.[key] === "string");

    if (settings.storage && settings.tokenKeys?.access && token) {
      await settings.storage.setItem(settings.tokenKeys.access, newTokens[token]);
      await settings.retrieveTokens()();
      const tokens = settings.getTokens();
      return tokens;
    } else {
      await settings.removeTokens();
      throw new Error("Refresh token failed");
    }
  }

  private async request<TResponse, TBody extends Body = Body>(
    url: string,
    method: "get" | "post" | "put" | "patch" | "delete" = "get",
    body: TBody = {} as TBody,
    headers: Record<string, string> | Headers = {}
  ): Promise<TResponse> {
    const settings = AuthHttp.settings();
    await settings.awaitRetrievingToken();
    await settings.retrieveTokens()();
    const tokens = settings.getTokens();

    const objectHeaders = new Headers(
      headers instanceof Headers
        ? Array.from(headers.entries()).reduce(
            (acc, [k, v]) => ({
              ...acc,
              [k]: v
            }),
            {} as Record<string, string>
          )
        : headers
    );

    let urlString: string;
    try {
      const urlObject = new URL(url, settings.baseUrl);
      if (method === "get" && body && typeof body === "object" && !Array.isArray(body)) {
        for (const [key, value] of Object.entries(body)) {
          urlObject.searchParams.append(key, value);
        }
      }
      urlString = urlObject.toString();
    } catch (error) {
      throw new Error(`Invalid URL: ${url}`);
    }

    if (typeof body === "object" && method !== "get" && !(body instanceof FormData)) {
      this.addHeader(objectHeaders, "Content-Type", "application/json");
    }

    tokens.access && this.addHeader(objectHeaders, "Authorization", `Bearer ${tokens.access}`);

    const request: RequestInit = {
      method,
      body: method !== "get" && !(body instanceof FormData) ? JSON.stringify(body) : undefined,
      headers: objectHeaders
    };

    let response = await fetch(urlString, request);

    if (!response.ok) {
      response = await this.handleHttpError(urlString, request, response);
    }

    const data = await response.text();

    if (response.headers.get("Content-Type")?.includes("application/json")) {
      try {
        return JSON.parse(data) as TResponse;
      } catch (error) {
        logger.error("ui-kit:auth-http:response.json-parse-error", error);
      }
    }

    return data as unknown as TResponse;
  }

  private addHeader(headers: Headers | Record<string, string>, key: string, value: string) {
    if (!value || !headers) return;
    if (headers instanceof Headers) {
      headers.set(key, value);
      return;
    }

    headers[key] = value;
  }

  private async handleHttpError(url: string, request: RequestInit, response: Response): Promise<Response> {
    const settings = AuthHttp.settings();
    const httpCode = response.status;

    if (
      httpCode === 403 &&
      request.headers instanceof Headers &&
      request.headers.has("Authorization") &&
      settings.refreshUrl &&
      !this.isRequestRetry
    ) {
      const tokens = await this.refreshToken();
      if (!(tokens && settings.tokenKeys.access && tokens.access)) {
        throw new Error("Refresh token failed");
      }
      const token = tokens.access;
      this.addHeader(request.headers, "Authorization", `Bearer ${token}`);
      this.isRequestRetry = true;
      const resp = await fetch(url, request);
      this.isRequestRetry = false;
      return resp;
    } else {
      await settings.removeTokens();
      throw new Error(`HTTP ${httpCode}`, { cause: response });
    }
  }
}
