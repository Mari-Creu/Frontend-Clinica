import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    EstadisticasComponent
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    ChartsModule,
    PAGES_ROUTES
  ]
})

export class PagesModule { }
