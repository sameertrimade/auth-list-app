import { Routes } from '@angular/router';
import { LogInComponent } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { NotFoundComponent } from './not-found/not-found';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'list',
    canActivate: [AuthGuard],
    loadComponent: () => import('./list/list').then((m) => m.ListComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
