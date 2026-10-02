import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/viajes/viajes').then((m) => m.Viajes),
    },
    {
        path: 'nuevo-viaje',
        loadComponent: () => import('./pages/nuevo-viaje/nuevo-viaje').then((m) => m.NuevoViaje),
    }
];
