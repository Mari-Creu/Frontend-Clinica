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
    switch (rol){
      case 1:{
        this.menu = [
          {
            titulo: 'Principal',
            icono: 'fa fa-star',
            submenu: [
              { titulo: 'Estadisticas', url: '/estadisticas' },
              { titulo: 'Mis Informes', url: '/informes' },
              { titulo: 'Mis Citas', url: '/citasPaciente' }
            ]
          }
        ];
        break;
      }
      case 3:{
        this.menu = [
          {
            titulo: 'Principal',
            icono: 'fa fa-star',
            submenu: [
              { titulo: 'Estadisticas', url: '/estadisticas' },
              { titulo: 'Informes', url: '/informes' }
            ]
          },
          {
            titulo: 'Clínica Hache',
            icono: 'fa fa-address-card',
            submenu: [
              { titulo: 'Pacientes', url: '/pacientes' },
              { titulo: 'Próximas Citas', url: '/citasMedico' }
              // { titulo: 'Administradores', url: '/administradores' }
            ]
          }
        ];
        break;
      }
      case 2:{
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
}
