import { Component, OnInit } from '@angular/core';
import { ModalUploadService, UsuarioService, EspecialidadService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Observable } from 'rxjs';
import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/services/services/horario.service';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/services/medico.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-medico-nuevo',
  templateUrl: './modal-medico-nuevo.component.html'
})
export class ModalMedicoNuevoComponent implements OnInit {


  contrasenyaGenerada = '';
  // formulario: NgForm ;
  aceptar: boolean = true;
  recordar: boolean = false;
  especialidades: Array<Especialidad> = [];
  dias = [];
  horas = [{ key: 1, hora: '10:00' },
  { key: 2, hora: '10:30' },
  { key: 3, hora: '11:00' },
  { key: 4, hora: '11:30' },
  { key: 5, hora: '12:00' },
  { key: 6, hora: '12:30' },
  { key: 7, hora: '13:00' },
  { key: 8, hora: '13:30' },
  { key: 9, hora: '14:00' },
  { key: 10, hora: '14:30' },
  { key: 11, hora: '15:00' },
  { key: 12, hora: '15:30' },
  { key: 13, hora: '16:00' },
  { key: 14, hora: '16:30' },
  { key: 15, hora: '17:00' },
  { key: 16, hora: '17:30' },
  { key: 17, hora: '18:00' },
  { key: 18, hora: '18:30' },
  { key: 19, hora: '19:00' },
  { key: 20, hora: '19:30' },
  { key: 21, hora: '20:00' }
  ];
  horasFin = [{ key: 2, hora: '10:30' },
  { key: 3, hora: '11:00' },
  { key: 4, hora: '11:30' },
  { key: 5, hora: '12:00' },
  { key: 6, hora: '12:30' },
  { key: 7, hora: '13:00' },
  { key: 8, hora: '13:30' },
  { key: 9, hora: '14:00' },
  { key: 10, hora: '14:30' },
  { key: 11, hora: '15:00' },
  { key: 12, hora: '15:30' },
  { key: 13, hora: '16:00' },
  { key: 14, hora: '16:30' },
  { key: 15, hora: '17:00' },
  { key: 16, hora: '17:30' },
  { key: 17, hora: '18:00' },
  { key: 18, hora: '18:30' },
  { key: 19, hora: '19:00' },
  { key: 20, hora: '19:30' },
  { key: 21, hora: '20:00' }
  ];

  ngOnInit(): void {

    this.especialidadService.getEspecialidades().subscribe((resp: any) => {
      resp.forEach(res => {
        this.especialidades.push(new Especialidad(res.id, res.nombre));
      });
    });
    console.log(this.especialidades);

  }

  constructor(public usuarioService: UsuarioService,
    public especialidadService: EspecialidadService,
    public horarioService: HorarioService,
    public medicoService: MedicoService,
    public modalUploadService: ModalUploadService) {

  }


  cerrarModal() {
    //  this.formulario = null;
    this.modalUploadService.ocultarModalMedico();
  }
  crearMedico(form: NgForm) {
    console.log(form);
    
    let idHorario = this.crearHorario(form.form.value.horaInicio, form.form.value.horaFin);
   


    // this.formulario = form;
    if (form.invalid) {
      Swal.fire('ERROR', '¡Compruebe que el email es válido y que ha generado una contraseña!', 'error');
      form.resetForm();
      this.cerrarModal();
      return;
    }
    if (this.contrasenyaGenerada !== '') {
      // CAMBIAR TEST POR THIS.CONTRASENYAGENERADA
      const usuario = new Usuario(form.value.email, 'test', '', '', 3);
      let especialidad= form.value.especialidad;
      this.usuarioService.crearUsuario(usuario).subscribe(((resp: any) => {
        if (resp.code === 201) {
          Swal.fire('¡Registrado ' + form.value.email + '!', ' Recomendamos cambiar la contraseña en el primer acceso a su área personal ', 'success');
          console.log(resp);
          this.contrasenyaGenerada = '';
          
          form.resetForm();
          this.cerrarModal();
          let medico = new Medico(resp.usuario, especialidad);
          this.medicoService.crearMedico(medico, idHorario, this.dias);
         
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
  cambiarHoras(e) {
    let horaInicio = e.target.selectedIndex + 1;
    console.log(horaInicio);
    this.horasFin = [];
    this.horas.forEach(hora => {
      if (hora.key > horaInicio) {
        this.horasFin.push(hora);
      }
    });
    this.horasFin.push({ key: 22, hora: '20:30' });

  }

  seleccionarDia(numdia) {
    if (this.dias.includes(numdia)) {
      this.dias = this.dias.filter(num => num != numdia);
    } else {
      this.dias.push(numdia);
    }
    console.log(numdia);
    console.log(this.dias);


  }
  getColor(numdia) {
    if (this.dias.includes(numdia)) {
      return ' btn-primary';
    }
  }
  crearHorario(horaInicio, horaFinal) {
    let horaIni: any = this.horas.filter((num: any) => num.hora === horaInicio);
    let horaFin = this.horasFin.filter((num: any) => num.hora === horaFinal);



    let horario = new Horario(horaIni[0].key, horaFin[0].key);

    let idHorario = this.horarioService.crearHorario(horario);
    return idHorario;


  }
}
