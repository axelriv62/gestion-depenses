import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {PersonnesListeComponent} from './components/personnes-liste/personnes-liste.component';
import {PersonnesDetailsComponent} from './components/personnes-details/personnes-details.component';
import {ExoAsynchroComponent} from './components/exo-asynchro/exo-asynchro.component';


export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'personnes', component: PersonnesListeComponent},
  {path: 'personnes/:id', component: PersonnesDetailsComponent},
  {path: 'hello', component: ExoAsynchroComponent},
  {path: '**', component: PageNotFoundComponent}
];
