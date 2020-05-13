import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Token} from '../models/Signup.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private host = environment.host;
  private token: string;
  private userId: string;

  constructor(private client: HttpClient) {}

  public post = (route: string, payload: any|null = null, config?): Observable<object> => {
    return this
      .client
      .post(`${this.host}/${route}`, payload, {
        responseType: 'json',
        headers: {
          ...config && config.headers,
          ...this.token && {
            authorization: `Bearer ${this.token}`
          }
        },
        ...config,
      });
  };

  public get = (route: string, config?): Observable<object> => {
    return this
      .client
      .get(`${this.host}/${route}`, {
        responseType: 'json',
        headers: {
          ...config && config.headers,
          ...this.token && {
            authorization: `Bearer ${this.token}`
          }
        },
        ...config,
      });
  };

  public getUserProfile(): Observable<object> {
    return this
      .client
      .get(`${this.host}/users/${this.userId}`, {
        responseType: 'json',
        headers: {
          authorization: `Bearer ${this.token}`
        },
      });
  }

  public saveSession(session: Token): void {
    this.userId = session.id;
    this.token = session.token;
  }

  public reset(): void {
    this.token = undefined;
    this.userId = undefined;
  }

  public get inSession(): boolean {
    return !!this.token;
  }
}
