import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            //data es el titulo que le pongo al breadcrumbs
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio'} },
            { path: 'estadisticas', component: EstadisticasComponent , data: { titulo: 'Estadistica'}},
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
