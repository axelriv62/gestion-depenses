import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {PersonnesListeComponent} from './components/personnes-liste/personnes-liste.component';
import {PersonnesDetailsComponent} from './components/personnes-details/personnes-details.component';
import {ExoAsynchroComponent} from './components/exo-asynchro/exo-asynchro.component';
import {IntroFormulaireComponent} from './intro-formulaire/intro-formulaire.component';
import {PersonneFormComponent} from './personne-form/personne-form.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';


export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'personnes', component: PersonnesListeComponent},
  {path: 'personnes/:id', component: PersonnesDetailsComponent},
  {path: 'hello', component: ExoAsynchroComponent},
  {path: 'formulaire', component: IntroFormulaireComponent},
  {path: 'personne-form', component: PersonneFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: PageNotFoundComponent}
];
