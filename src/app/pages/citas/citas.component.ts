import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgForm, FormControl } from '@angular/forms';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { MedicoService } from 'src/app/services/services/medico.service';
import { UsuarioService, CitaService } from 'src/app/services/service.index';
import { HORAS, URL_SERVICIOS } from 'src/app/config/config';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { stringify } from 'querystring';
import { PacienteService } from 'src/app/services/services/paciente.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

defineLocale('es', esLocale);

// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  citas = [];
  locale = 'es';
  bsConfig: Partial<BsDatepickerConfig>;
  horas = [];
  minDate;
  idPaciente;
  pacientes = [];
  bsValue = new Date();
  paciente = null;
  nombrePaciente;
  diasTrabajo = [];
  horasTrabajo = [];
  diasDesactivados = [0, 1, 2, 3, 4, 5, 6];
  public bankFilterCtrl: FormControl = new FormControl();
  // calendarPlugins = [dayGridPlugin];

  constructor(
    public localeService: BsLocaleService,
    public medicoService: MedicoService,
    public usuarioService: UsuarioService,
    public citaService: CitaService,
    public pacienteService: PacienteService,
    private route: ActivatedRoute,
    private http: HttpClient) {

    this.localeService.use(this.locale);
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      var id = +params['id'];
      if (id) {
        this.idPaciente = id;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', this.usuarioService.token);
        const url = URL_SERVICIOS + '/findPaciente/' + id;
        this.http.get(url, { headers: headers }).subscribe((resp: any) => {
          if (resp.code === 200) {
            this.paciente = resp.paciente[0];
            this.nombrePaciente = resp.paciente[0].id.nombre + ' ' + resp.paciente[0].id.apellidos;

          }
          console.log(resp);

        });
      }
    });
    this.findCitas();
    this.findPacientes();
    this.medicoService.getHorario(this.usuarioService.usuario.id).subscribe((resp: any) => {
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
      console.log(this.horas);

      console.log(this.diasDesactivados);

      console.log(this.horasTrabajo);



    });
  }
  findPacientes() {
    this.pacienteService.findPacientes().subscribe((resp: any) => {
      this.pacientes = resp.paciente;
    });
  }
  findCitas() {
    this.citaService.buscarCitasMedico().subscribe((resp: any) => {
      console.log(resp);

      this.citas = resp.citas;

    });
    console.log(this.citas);

  }
  convertirFecha2String(fecha: any) {
    let anyo = fecha.getFullYear();
    let mes = fecha.getUTCMonth() + 1;
    let dia = fecha.getDate();
    return dia + '-' + mes + '-' + anyo;
  }


  pedirCita(form: NgForm) {
    console.log(form);


    let horaIni: any = HORAS.filter((num: any) => num.hora === form.value.horaCita);
    console.log(horaIni);


    let fechaConsulta = this.convertirFecha2String(form.value.fechaConsulta);
    if (this.idPaciente === undefined || this.idPaciente === '') {
      this.idPaciente = form.value.paciente;
    }
    console.log(this.idPaciente);

    let cita = new Cita(this.idPaciente, this.usuarioService.usuario.id, fechaConsulta, null, horaIni[0].key, 'motivoComsulta');
    this.citaService.crearCita(cita).subscribe((resp: any) => {
      if (resp.code === '201') {
        Swal.fire(resp.cita.fechaProgramada + ' a las ' + HORAS[resp.cita.horaCita - 1].hora, resp.cita.paciente.id.nombre + ' ' + resp.cita.paciente.id.apellidos, 'success');
        form.resetForm();
        this.findCitas();
        this.idPaciente = '';
      } else {
        Swal.fire('No se ha guardado la cita', 'Vuelva a intentarlo', 'error');
      }
    });

  }

  onValueChange(event) {
    if (event !== null) {

      let dia = this.convertirFecha2String(event);

      this.medicoService.consultarCitasDisponibles(dia, this.usuarioService.usuario.id).subscribe(
        (resp: any) => {
          let horasLibres = this.horas;
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
      // new Date(form.value.fechaContratacion)
    }
  }
}