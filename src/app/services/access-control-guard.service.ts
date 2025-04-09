import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';

export const accessControlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = authService.user;
  if (user().id !== 0) {
    return true;
  }

  // l'Utilisateur non connecté est redirigé vers la page de login
  // avec conservation de l'url qui a provoqué la redirection
  router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  return false;
};

export const accessDepensesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const snack = inject(MatSnackBar);
  const user = authService.user;
  const personne = authService.user;
  console.log(`id connecté: ${user().id} id demandé: ${route.paramMap.get('id')}`);
  if (user().admin || personne().id === +(route.paramMap.get('id') ?? 0)) {
    return true;
  }
  router.navigate(['/personnes']);
  snack.open('Vous n\'avez pas les droits pour accéder à cette page', 'OK', {duration: 3000});
  return false;
};
