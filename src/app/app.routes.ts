import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {PersonnesListeComponent} from './components/personnes-liste/personnes-liste.component';
import {PersonnesDetailsComponent} from './components/personnes-details/personnes-details.component';


export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'personnes', component: PersonnesListeComponent},
  {path: 'personnes/:id', component: PersonnesDetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];
