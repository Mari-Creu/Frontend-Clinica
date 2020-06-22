import { Component, OnInit, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/services/medico.service';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styles: [
  ]
})
export class CrearMedicoComponent implements OnInit {

  nuevoMedico= new EventEmitter<any>();
  contrasenyaGenerada = '';
  constructor(public usuarioService: UsuarioService,
              public medicoService: MedicoService) { }

  ngOnInit(): void {
  }


  crearMedico(form: NgForm) {

    if (form.invalid) {
      Swal.fire('ERROR', '¡Compruebe que el email es válido y que ha generado una contraseña!', 'error');
      return;
    }
    if (this.contrasenyaGenerada !== '') {
      const usuario = new Usuario(form.value.email, this.contrasenyaGenerada, '', '', 3);

      this.usuarioService.crearUsuario(usuario).subscribe((async (resp: any) => {
        if (resp.code === 201) {
          Swal.fire('¡Registrado ' + form.value.email + '!', ' Recomendamos cambiar la contraseña en el primer acceso a su área personal ', 'success');
          this.contrasenyaGenerada = '';
          this.medicoService.registrarMedico(resp.usuario);
          form.resetForm();
          this.nuevoMedico.emit(true);
        

        } else {
          Swal.fire('ERROR', '¡Ha ocurrido un error durante el registro! ' + resp.msg, 'error');
          this.contrasenyaGenerada = '';

          return;
        }
      }));
    } else {
      form.resetForm();
      Swal.fire('ERROR', '¡Compruebe que el email es válido y que ha generado una contraseña!', 'error');
    }

  }

 
  generarContrasenya() {
    const caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ12346789';
    let contrasenya = '';
    for (let i = 0; i < 9; i++) { contrasenya += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); }
    this.contrasenyaGenerada = contrasenya;
  }


}
