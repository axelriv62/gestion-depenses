import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {
  ANONYMOUS_USER,
  getResponseLogin,
  GetResponseRegister,
  Identite,
  RegisterRequest,
  User
} from '../auth-interfaces';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  readonly url = `${environment.apiURL}`;
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'}),
  };
  readonly #userSignal = signal(ANONYMOUS_USER);
  user = this.#userSignal.asReadonly();
  isLoggedIn = computed(() => this.user().id !== 0);

  constructor() {
  }

  async login(credential: Identite) {
    const response$ = this.http.post<getResponseLogin>(`${this.url}/login`, credential, this.httpOptions);
    const response = await firstValueFrom(response$);
    const user = <User>{...response.data.user, token: response.data.token};
    this.#userSignal.set(user);
    console.log(user);
    return user;
  }

  async register(request: RegisterRequest): Promise<User> {
    const response$ = this.http.post<GetResponseRegister>(`${this.url}/register`, request, this.httpOptions);
    const response = await firstValueFrom(response$);
    console.log(response);
    const user = <User>{...response.data.personne.user, token: response.data.token};
    this.#userSignal.set(user);
    console.log(user);
    return user;
  }

  async logout() {
    const response$ = this.http.post<any>(`${this.url}/logout`, {}, this.httpOptions);
    await firstValueFrom(response$);
    this.#userSignal.set(ANONYMOUS_USER);
    (await this.router.navigateByUrl('/'));
  }
}
