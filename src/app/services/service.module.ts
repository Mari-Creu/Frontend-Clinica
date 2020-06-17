import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';


import { UsuarioService, SharedService, SidebarService, InformeService } from './service.index';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ModalUploadService } from './upload/modal-upload.service';
import { UploadService } from './upload/upload.service';
import { EspecialidadService } from './services/especialidad.service';
import { CitaService } from './services/cita.service';
import { IngresoService } from './services/ingreso.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    SharedService,
    SidebarService,
    AdminGuard,
    AuthGuard,
    ModalUploadService,
    UploadService,
    EspecialidadService,
    CitaService,
    InformeService,
    IngresoService
  ]
})
export class ServiceModule { }
