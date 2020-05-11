import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
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

  constructor() { }
}
