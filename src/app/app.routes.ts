import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./main/home/home.component'),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./main/login/login.component'),
  },
  {
    path: 'register',
    title: 'Registration page',
    loadComponent: () => import('./main/register/register.component'),
  },
];
