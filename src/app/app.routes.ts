import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {PageNotFoundComponent} from './page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: PageNotFoundComponent}
];
