import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {environment} from "../../environments/environment";
import {AuthService} from './auth.service';


export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const user = authService.user;
  const isLoggedIn = authService.isLoggedIn;
  const isApiUrl = request.url.startsWith(environment.apiURL);
  if (isLoggedIn() && isApiUrl) {
    request = request.clone({
      setHeaders: {Authorization: `Bearer ${user().token}`}
    });
  }
  return next(request);
}
