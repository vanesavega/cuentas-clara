import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { path: 'viajes', loadComponent: () => import('./pages/viajes/viajes').then(m => m.Viajes) },
  { path: 'viajes/nuevo', loadComponent: () => import('./pages/nuevo-viaje/nuevo-viaje').then(m => m.NuevoViaje) },
  { path: 'viajes/:id', loadComponent: () => import('./pages/viaje-detail/viaje-detail').then(m => m.ViajeDetail) },
  { path: '**', redirectTo: 'viajes' },
];