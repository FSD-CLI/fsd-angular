import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { publicConfig } from '@shared/config';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  readonly #http = inject(HttpClient);

  get<T>(path: string) {
    return this.#http.get<T>(`${publicConfig.apiBaseUrl}${path}`);
  }

  post<TResponse, TBody>(path: string, body: TBody) {
    return this.#http.post<TResponse>(`${publicConfig.apiBaseUrl}${path}`, body);
  }
}
