import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ModalUsuarioComponent } from './modales/modal-usuario/modal-usuario.component';
import { ModalPacienteNuevoComponent } from './modales/modal-paciente-nuevo/modal-paciente-nuevo.component';
import { MedicosComponent } from './medicos/medicos.component';
import { ModalMedicoNuevoComponent } from './modales/modal-medico-nuevo/modal-medico-nuevo.component';
import { CrearMedicoComponent } from './medicos/crear-medico/crear-medico.component';
import { DatosMedicoComponent } from './medicos/datos-medico/datos-medico.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HorariosComponent } from './medicos/horarios/horarios.component';
import { InformesComponent } from './informes/informes.component';
import { CitasComponent } from './citas/citas.component';
import { FullCalendarModule} from '@fullcalendar/angular';


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    EstadisticasComponent,
    PerfilComponent,
    PagesComponent,
    PacientesComponent,
    ModalUsuarioComponent,
    ModalPacienteNuevoComponent,
    MedicosComponent,
    ModalMedicoNuevoComponent,
    CrearMedicoComponent,
    DatosMedicoComponent,
    HorariosComponent,
    InformesComponent,
    CitasComponent,
  ],
  exports: [
    HomeComponent,
    PerfilComponent
  ],
  imports: [
    SharedModule,
    ChartsModule,
    PipesModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot()
  ]
})

export class PagesModule { }
