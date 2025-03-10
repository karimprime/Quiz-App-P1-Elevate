import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth-layout',
    component: AuthLayoutComponent,
    title: 'Dashboard Auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', title: 'Login', loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', title: 'Register', loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forget-password', title: 'Forget Password', loadComponent: () => import('./core/pages/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent) },
    ]
  },
  { path: '', redirectTo: 'auth-layout', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth-layout' } // Handle 404 or unknown routes
];
