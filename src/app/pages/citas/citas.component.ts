import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgForm, FormControl } from '@angular/forms';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { MedicoService } from 'src/app/services/services/medico.service';
import { UsuarioService, CitaService } from 'src/app/services/service.index';
import { HORAS } from 'src/app/config/config';
import { Cita } from 'src/app/models/cita.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { stringify } from 'querystring';

defineLocale('es', esLocale);

// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  locale = 'es';
  bsConfig: Partial<BsDatepickerConfig>;
  horas = [];
  minDate;
  idPaciente;
  bsValue = new Date();
  public bankFilterCtrl: FormControl = new FormControl();
  // calendarPlugins = [dayGridPlugin];

  constructor(
    public localeService: BsLocaleService,
    public medicoService: MedicoService,
    public usuarioService: UsuarioService,
    public citaService: CitaService,
    private route: ActivatedRoute) {

    this.localeService.use(this.locale);
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() );
  }

  ngOnInit(): void {
    this.horas = HORAS;
    this.route.params.subscribe(params => {
      var id = +params['id'];
      if (id) {
        this.idPaciente = id;
      }
    });
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


    let cita = new Cita(this.idPaciente, this.usuarioService.usuario.id, fechaConsulta, null, horaIni[0].key, 'motivoComsulta');
    this.citaService.crearCita(cita).subscribe((resp: any) => {
      if (resp.code === '201') {
        Swal.fire(resp.cita.fechaProgramada + ' a las ' + HORAS[resp.cita.horaCita-1].hora, resp.cita.paciente.id.nombre + ' ' + resp.cita.paciente.id.apellidos, 'success');
        form.resetForm();
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
          let horasLibres = HORAS;
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