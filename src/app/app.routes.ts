import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {PersonnesListeComponent} from './components/personnes-liste/personnes-liste.component';
import {PersonnesDetailsComponent} from './components/personnes-details/personnes-details.component';
import {ExoAsynchroComponent} from './components/exo-asynchro/exo-asynchro.component';
import {IntroFormulaireComponent} from './components/intro-formulaire/intro-formulaire.component';
import {PersonneFormComponent} from './components/personne-form/personne-form.component';
import {FormValEmailComponent} from './components/form-val-email/form-val-email.component';


export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'personnes', component: PersonnesListeComponent},
  {path: 'personnes/:id', component: PersonnesDetailsComponent},
  {path: 'hello', component: ExoAsynchroComponent},
  {path: 'formulaire', component: IntroFormulaireComponent},
  {path: 'personne-form', component: PersonneFormComponent},
  {path: 'form-val-email', component: FormValEmailComponent},
  {path: '**', component: PageNotFoundComponent}
];
