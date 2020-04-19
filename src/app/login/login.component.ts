import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';


declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  email: string;
  recordar: boolean = false;

  constructor(public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recordar = true;
    }
  }

  acceder(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const usuario = new Usuario(form.value.email, form.value.password, 'usuario');
    this.usuarioService.login(usuario, form.value.recordar).subscribe(resp => {
      if (resp) {
        this.router.navigate(['/home']);
      } else {
        swal.fire('Error', 'Credenciales Incorrectas', 'error');
      }
    });
  }
}
