import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            //data es el titulo que le pongo al breadcrumbs
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio'} },
            { path: 'estadisticas', component: EstadisticasComponent , data: { titulo: 'Estadistica'}},
            { path: 'perfil', component: PerfilComponent , data: { titulo: 'Mi Perfil'}},
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
