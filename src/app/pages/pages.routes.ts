import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard, AdminGuard } from '../services/service.index';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoGuard } from '../services/guards/medico.guard';
import { CitasComponent } from './citas/citas.component';
import { CitasPacienteComponent } from './citas/citas-paciente/citas-paciente.component';
import { InfoPacienteComponent } from './info-paciente/info-paciente.component';
import { MisInformesComponent } from './informes/mis-informes/mis-informes.component';
import { HistorialComponent } from './informes/historial/historial.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            //data es el titulo que le pongo al breadcrumbs
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio', pages: 'Área Personal'} },
            { path: 'estadisticas', component: EstadisticasComponent , data: { titulo: 'Estadistica', pages: 'Datos'}},
            { path: 'perfil', component: PerfilComponent , data: { titulo: 'Mi Perfil', pages:'Área Personal'}},
            

            //MANTENIMIENTOS
            { path: 'pacientes', component: PacientesComponent , data: { titulo: 'Pacientes', pages: 'Clínica'}},
            // tslint:disable-next-line: max-line-length
            { path: 'pacientes/:page', component: PacientesComponent , data: { titulo: 'Pacientes', pages: 'Clínica'}},
            { path: 'informes', component: MisInformesComponent , data: { titulo: 'Informes', pages: 'Clínica'}, canActivate: [ MedicoGuard]},
            { path: 'misInformes', component: HistorialComponent , data: { titulo: 'Informes', pages: 'Clínica'}},
            { path: 'citasMedico', component: CitasComponent , data: { titulo: 'Citas', pages: 'Clínica'}, canActivate: [ MedicoGuard]},
            { path: 'citasMedico/:id', component: CitasComponent , data: { titulo: 'Citas', pages: 'Clínica'}, canActivate: [ MedicoGuard]},
            // tslint:disable-next-line: max-line-length
            { path: 'info/:id', component: InfoPacienteComponent , data: { titulo: 'Información personal del paciente', pages: 'Clínica'}, canActivate: [ MedicoGuard]},
            
            { path: 'medicos', component: MedicosComponent , data: { titulo: 'Médicos', pages: 'Clínica'}, canActivate: [AdminGuard]},
            { path: 'medicos/:page', component: MedicosComponent , data: { titulo: 'Médicos', pages: 'Clínica'}, canActivate: [AdminGuard]},
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
            
            { path: 'citasPaciente', component: CitasPacienteComponent , data: { titulo: 'Mis Citas', pages: 'Clínica'}}

        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
