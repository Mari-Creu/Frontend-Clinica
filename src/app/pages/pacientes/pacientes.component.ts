import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {

  pacientes: Usuario[] = [];

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  cargarUsuarios() {

  }
}
