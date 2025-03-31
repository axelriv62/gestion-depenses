import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {PersonnesListeComponent} from './components/personnes-liste/personnes-liste.component';
import {PersonnesDetailsComponent} from './components/personnes-details/personnes-details.component';
import {ExoAsynchroComponent} from './components/exo-asynchro/exo-asynchro.component';
import {IntroFormulaireComponent} from './components/intro-formulaire/intro-formulaire.component';
import {PersonneFormComponent} from './components/personne-form/personne-form.component';
import {FormValEmailComponent} from './components/form-val-email/form-val-email.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ProfilComponent} from './components/profil/profil.component';
import {accessControlGuard} from './services/access-control-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'personnes', component: PersonnesListeComponent, canActivate: [accessControlGuard]},
  {path: 'personnes/:id', component: PersonnesDetailsComponent, canActivate: [accessControlGuard]},
  {path: 'hello', component: ExoAsynchroComponent},
  {path: 'formulaire', component: IntroFormulaireComponent, canActivate: [accessControlGuard]},
  {path: 'personne-form', component: PersonneFormComponent, canActivate: [accessControlGuard]},
  {path: 'form-val-email', component: FormValEmailComponent, canActivate: [accessControlGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'me', component: ProfilComponent, canActivate: [accessControlGuard]},
  {path: '**', component: PageNotFoundComponent}
];
