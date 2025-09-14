import { Routes } from '@angular/router';
import { LogInComponent } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { ListComponent } from './list/list';
import { NotFoundComponent } from './not-found/not-found';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
