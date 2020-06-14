import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgForm } from '@angular/forms';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { MedicoService } from 'src/app/services/services/medico.service';
import { UsuarioService, CitaService } from 'src/app/services/service.index';
import { HORAS } from 'src/app/config/config';
import { Cita } from 'src/app/models/cita.model';

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
  // calendarPlugins = [dayGridPlugin];

  constructor(public localeService: BsLocaleService, public medicoService: MedicoService, public usuarioService: UsuarioService, public citaService: CitaService) {

    this.localeService.use(this.locale);
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit(): void {
    this.horas = HORAS;
  }

  pedirCita(form: NgForm) {
    console.log(form);

    let horaIni: any = HORAS.filter((num: any) => num.hora === form.value.horaCita);

    let cita = new Cita(13, this.usuarioService.usuario.id, form.value.fechaConsulta, null, horaIni[0].key);
    this.citaService.crearCita(cita);

  }

  onValueChange(event) {
    console.log(event);
    if (event !== null) {
      this.medicoService.consultarCitasDisponibles(event, this.usuarioService.usuario.id).subscribe(
        (resp: any) => {
          let horasLibres = HORAS;
          let horasOcupadas = [];
          resp.citas.forEach(element => {
            horasOcupadas.push(element.horaCita);

          });
          console.log(horasOcupadas);

          horasLibres.forEach(num => {
            if (horasOcupadas.indexOf(num)) {
              horasLibres = horasLibres.filter(n => {
                return num.key !== n.key;
              });
            }
            console.log(horasLibres);

            this.horas = horasLibres;

          }
          );
        }
      );
    // new Date(form.value.fechaContratacion)
  }
  }
}