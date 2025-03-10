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
      { path: 'verify-code', title: 'Verify Code', loadComponent: () => import('./core/pages/verify-code/verify-code.component').then(c => c.VerifyCodeComponent) },
      { path: 'set-password', title: 'Set New Password', loadComponent: () => import('./core/pages/set-password/set-password.component').then(c => c.SetPasswordComponent) },
    ]
  },
  { path: '', redirectTo: 'auth-layout', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth-layout' }
];
