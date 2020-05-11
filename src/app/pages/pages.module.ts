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

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    EstadisticasComponent,
    PerfilComponent,
    PagesComponent,
    PacientesComponent
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
    CommonModule
  ]
})

export class PagesModule { }
