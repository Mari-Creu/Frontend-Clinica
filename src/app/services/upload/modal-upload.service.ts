import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
   public usuario: Usuario=null;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('modal upload service');
  }
  ocultarModal() {
    // this.usuario = null;
    this.oculto = 'oculto';
  }
  mostrarModal(paciente: Usuario) {
    // this.usuario = paciente;
    this.oculto = '';
  }
}
