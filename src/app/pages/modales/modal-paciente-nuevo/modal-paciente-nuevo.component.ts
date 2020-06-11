import { Component, OnInit } from '@angular/core';
import { ModalUploadService, UsuarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { PacienteService } from 'src/app/services/services/paciente.service';

@Component({
  selector: 'app-modal-paciente-nuevo',
  templateUrl: './modal-paciente-nuevo.component.html'
})
export class ModalPacienteNuevoComponent implements OnInit {
  contrasenyaGenerada: string = '';
 // formulario: NgForm ;
  aceptar: boolean = true;
  recordar: boolean = false;
  constructor(public usuarioService: UsuarioService,
    public pacienteService: PacienteService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {

  }

  cerrarModal() {
  //  this.formulario = null;
    this.modalUploadService.ocultarModal();
  }
  crearPaciente(form: NgForm) {
  //  this.formulario = form;
    if (form.invalid) {
      Swal.fire('ERROR', '¡Compruebe que el email es válido y que ha generado una contraseña!', 'error');
      form.resetForm();
      this.cerrarModal();
      return;
    }
    if (this.contrasenyaGenerada != '') {

      //CAMBIAR TEST POR THIS.CONTRASENYAGENERADA
      const usuario = new Usuario(form.value.email, 'test', '', '', 1);

      this.usuarioService.crearUsuario(usuario).subscribe(((resp: any) => {

        if (resp.code === 201) {
          Swal.fire('¡Registrado ' + form.value.email + '!', ' Recomendamos cambiar la contraseña en el primer acceso a su área personal ', 'success');
          console.log(resp);
          this.contrasenyaGenerada = '';
          form.resetForm();
          this.cerrarModal();

        } else {
          Swal.fire('ERROR', '¡Ha ocurrido un error durante el registro! ' + resp.msg, 'error');
          this.contrasenyaGenerada = '';
          form.resetForm();
          this.cerrarModal();
        }

      }));
    } else {
      form.resetForm();
      this.cerrarModal();
      Swal.fire('ERROR', '¡Compruebe que el email es válido y que ha generado una contraseña!', 'error');
    }
  }
  generarContrasenya(f: NgForm) {


    const caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ12346789';
    let contrasenya = '';
    for (let i = 0; i < 9; i++) { contrasenya += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); }
    this.contrasenyaGenerada = contrasenya;
  }
}
