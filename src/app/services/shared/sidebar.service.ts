import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = null;


  constructor() {
  }
  cargarMenu(rol: number) {
    if (rol === 1) {
      this.menu = [
        {
          titulo: 'Principal',
          icono: 'fa fa-star',
          submenu: [
            { titulo: 'Inicio', url: '/home' },
            { titulo: 'Estadisticas', url: '/estadisticas' },
            { titulo: 'Informes', url: '/informes' }
          ]
        }
      ];
    }else{
      this.menu = [
        {
          titulo: 'Principal',
          icono: 'fa fa-star',
          submenu: [
            { titulo: 'Inicio', url: '/home' },
            { titulo: 'Estadisticas', url: '/estadisticas' },
            { titulo: 'Informes', url: '/informes' }
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'fa fa-address-card',
          submenu: [
            { titulo: 'Médicos', url: '/medicos' },
            { titulo: 'Pacientes', url: '/pacientes' },
            { titulo: 'Administradores', url: '/administradores' }
          ]
        }
      ];
    }

  }
}
