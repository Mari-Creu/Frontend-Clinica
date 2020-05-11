import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login.component.css']
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit(): void {
    init_plugins();
    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      terminos: new FormControl(false)
    }, { validators: this.comprobarContrasenyas('password', 'password2') }
    );

    this.formulario.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123',
      password2: '1234',
      terminos: true
    });

  }

  comprobarContrasenyas(pwd1: string, pwd2: string) {
    return (group: FormGroup) => {
      let password = group.controls[pwd1].value;
      let password2 = group.controls[pwd2].value;

      if (password === password2) {
        return null;
      }
      return {
        comprobarContrasenyas: true
      };
    };
  }
  registrar() {
    if (!this.formulario.value.terminos) {
      swal.fire('IMPORTANTE', 'Debe aceptar los términos y condiciones', 'warning');
      return;
    }
    if (this.formulario.invalid) {
      return;
    }
    let usuario = new Usuario(this.formulario.value.email, this.formulario.value.password, this.formulario.value.nombre);
    this.usuarioService.crearUsuario(usuario).subscribe(((resp: any) => {
      if (resp.code === 201) {
        swal.fire('¡BIENVENIDO ' + resp.usuario.nombre + '!', ' ¡Ya eres un nuevo miembro de nuestra clínica!', 'success');
        //FALTA CAMBIAR Y HACER EL LOGIN AUTOMÁTICAMENTE PARA QUE ENTRE A HOME CON EL TOKEN
        this.usuarioService.guardarStorage(resp.usuario.id, resp.token.token, resp.usuario);
        this.router.navigate(['/home']);
      } else {
        swal.fire('ERROR', '¡Ha ocurrido un error durante su RegistroComponent, vuelva a intentarlo!', 'error');
      }

    }));
  }
}
