import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard, AdminGuard } from '../services/service.index';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoGuard } from '../services/guards/medico.guard';
import { InformesComponent } from './informes/informes.component';
import { CitasComponent } from './citas/citas.component';
import { CitasPacienteComponent } from './citas/citas-paciente/citas-paciente.component';
import { InfoPacienteComponent } from './info-paciente/info-paciente.component';

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
            

            //MANTENIMIENTOS
            { path: 'pacientes', component: PacientesComponent , data: { titulo: 'Pacientes'}, canActivate: [AdminGuard, MedicoGuard]},
            // tslint:disable-next-line: max-line-length
            { path: 'pacientes/:page', component: PacientesComponent , data: { titulo: 'Pacientes'}, canActivate: [AdminGuard, MedicoGuard]},
            { path: 'informes', component: InformesComponent , data: { titulo: 'Informes'}, canActivate: [ MedicoGuard]},
            { path: 'citasMedico', component: CitasComponent , data: { titulo: 'Citas'}, canActivate: [ MedicoGuard]},
            { path: 'citasMedico/:id', component: CitasComponent , data: { titulo: 'Citas'}, canActivate: [ MedicoGuard]},
            // tslint:disable-next-line: max-line-length
            { path: 'info/:id', component: InfoPacienteComponent , data: { titulo: 'Información personal del paciente'}, canActivate: [ MedicoGuard]},
            
            { path: 'medicos', component: MedicosComponent , data: { titulo: 'Médicos'}, canActivate: [AdminGuard]},
            { path: 'medicos/:page', component: MedicosComponent , data: { titulo: 'Médicos'}, canActivate: [AdminGuard]},
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            //paciente -->hacer guard
            { path: 'citasPaciente', component: CitasPacienteComponent , data: { titulo: 'Mis Citas'}}

        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
