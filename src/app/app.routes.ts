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
  {
    path: 'profile',
    title: 'My Profile Page',
    loadComponent: () => import('./main/profile/profile.component'),
  },
  {
    path: 'item',
    title: 'Item',
    loadComponent: () => import('./main/item/item.component'),
  },
];
