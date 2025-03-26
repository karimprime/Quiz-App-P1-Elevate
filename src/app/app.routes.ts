import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './features/layouts/dashboard/dashboard.component';
import { loggedGuard } from './core/guards/logged-user/logged.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth-layout', pathMatch: 'full' },
  {path: 'auth-layout', component: AuthLayoutComponent, title: 'Dashboard Auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', title: 'Login', loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', title: 'Register', loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
      { path: 'reset-password-layout', title: 'Forget Password', loadComponent: () => import('./core/layouts/reset-password-layout/reset-password-layout.component').then(c => c.ResetPasswordLayoutComponent) },
    ]
  },

  {path: 'dashboard', component: DashboardComponent, title: 'Dashboard Home',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', title: 'Home', loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent) },
    ]
  },

  { path: '**', title: 'Not Found', loadComponent: () => import('./features/pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];
