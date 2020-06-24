import { Component, OnInit } from '@angular/core';
import { EspecialidadService, UsuarioService, CitaService } from 'src/app/services/service.index';
import { Especialidad } from 'src/app/models/especialidad.model';
import { MedicoService } from 'src/app/services/services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { HORAS } from 'src/app/config/config';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgForm } from '@angular/forms';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { Cita } from 'src/app/models/cita.model';

defineLocale('es', esLocale);
@Component({
  selector: 'app-citas-paciente',
  templateUrl: './citas-paciente.component.html',
  styleUrls: ['./citas-paciente.component.css']
})
export class CitasPacienteComponent implements OnInit {
  especialidades: Array<Especialidad> = [];
  medicos: Array<Medico> = [];
  locale = 'es';
  bsConfig: Partial<BsDatepickerConfig>;
  horas = [];
  horasMedico = []
  bsValue = new Date();
  minDate;
  citas = [];
  diasTrabajo = [];
  horasTrabajo = [];
  diasDesactivados = [0, 1, 2, 3, 4, 5, 6];
  constructor(
    public citaService: CitaService,
    public usuarioService: UsuarioService,
    public localeService: BsLocaleService,
    public especialidadService: EspecialidadService,
    public medicoService: MedicoService) {

    this.localeService.use(this.locale);
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit(): void {

    this.especialidadService.getEspecialidades().subscribe((resp: any) => {
      resp.forEach(res => {
        this.especialidades.push(new Especialidad(res.id, res.nombre));
      });
    });
    console.log(this.especialidades);

    this.citaService.buscarCitas().subscribe((resp: any) => {
      this.citas = resp.cita;
      console.log(this.citas);

    });
  }
  buscarMedicosEspecialidad(especialidad) {

    this.medicoService.buscarMedicosPorEspecialidad(especialidad).subscribe((resp: any) => {
      this.medicos = [];
      this.medicos = resp.medicos;
      console.log(this.medicos);

    });

  }
  convertirFecha2String(fecha: any) {
    let anyo = fecha.getFullYear();
    let mes = fecha.getUTCMonth() + 1;
    let dia = fecha.getDate();
    return dia + '-' + mes + '-' + anyo;
  }

  onValueChange(event, form: NgForm) {
    if (event !== null) {
      let dia = this.convertirFecha2String(event);
      console.log(dia);

      this.medicoService.consultarCitasDisponibles(dia, form.value.medico).subscribe(
        (resp: any) => {
          let horasLibres = this.horasMedico;
          let horasOcupadas = [];
          resp.citas.forEach(element => {
            horasOcupadas.push(element.horaCita);

          });
          console.log(horasOcupadas);
          horasOcupadas.forEach(horaOcupada => {
            horasLibres = horasLibres.filter(n => {
              return n.key !== horaOcupada;
            });
          });
          console.log(horasLibres);

          this.horas = horasLibres;
        }
      );
    }
  }
  pedirCitaPaciente(form: NgForm) {
    let horaIni: any = this.horas.filter((num: any) => num.hora === form.value.horaCita);
    console.log(horaIni);


    let fechaConsulta = this.convertirFecha2String(form.value.fechaConsulta);
    let idPaciente: number = +this.usuarioService.usuario.id;

    let cita = new Cita(idPaciente, form.value.medico, fechaConsulta, null, horaIni[0].key, 'motivoComsulta');
    this.citaService.crearCita(cita).subscribe((resp: any) => {
      let nombre = resp.cita.paciente.id.nombre;
      let apellidos = resp.cita.paciente.id.apellidos;
      if (nombre === null) {
        nombre = '';
      }
      if (apellidos === null) {
        apellidos = '';
      }
      if (resp.code === '201') {
        Swal.fire(resp.cita.fechaProgramada + ' a las ' + HORAS[resp.cita.horaCita - 1].hora, nombre + ' ' + apellidos, 'success');
        form.resetForm();
        this.bsValue = new Date();
        this.citaService.buscarCitas().subscribe((resp: any) => {
          this.citas = resp.cita;
        });

      } else {
        Swal.fire('No se ha guardado la cita', 'Vuelva a intentarlo', 'error');
      }
    });
  }

  cambiarHoras(event) {
    this.medicoService.getHorario(event.form.value.medico).subscribe((resp: any) => {
      resp.forEach(element => {
        this.diasTrabajo.push(+element.dia);
        if (this.diasDesactivados.includes(+element.dia)) {
          this.diasDesactivados = this.diasDesactivados.filter(e => e !== +element.dia);
        }
      });

      resp.forEach(element => {
        this.horasTrabajo.push(element.horario.horarioInicio);
        this.horasTrabajo.push(element.horario.horaFin);

      });
      let horaInicio = this.horasTrabajo[0];
      let i = horaInicio;
      let horaFin = this.horasTrabajo[1];

      while (i < horaFin) {
        console.log(i);

        this.horas.push(HORAS[i]);
        i++;
      }
      this.horasMedico = this.horas;
      console.log(this.horas);

      console.log(this.diasDesactivados);

      console.log(this.horasTrabajo);



    });

  }
}
