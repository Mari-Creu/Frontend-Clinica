import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/home' },
        { titulo: 'Estadisticas', url: '/estadisticas' }
      ]
    }
  ];

  constructor() { }
}
