import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth-layout',
    component: AuthLayoutComponent,
    title: 'Dashboard Auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', title: 'Login', loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', title: 'Register', loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
      { path: 'reset-password-layout', title: 'Forget Password', loadComponent: () => import('./core/layouts/reset-password-layout/reset-password-layout.component').then(c => c.ResetPasswordLayoutComponent) },
    ]
  },
  { path: '', redirectTo: 'auth-layout', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth-layout' }
];
