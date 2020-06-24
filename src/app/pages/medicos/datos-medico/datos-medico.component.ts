import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MedicoService } from 'src/app/services/services/medico.service';
import { EspecialidadService } from 'src/app/services/service.index';
import { Especialidad } from 'src/app/models/especialidad.model';
import { NgForm } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
defineLocale('es', esLocale);

@Component({
  selector: 'app-datos-medico',
  templateUrl: './datos-medico.component.html',
  styles: [
  ]
})
export class DatosMedicoComponent implements OnInit {
  locale = 'es';
  colorTheme = 'theme-default';
  bsConfig: Partial<BsDatepickerConfig>;
  @Output() actualizado = new EventEmitter<any>();

  especialidades: Array<Especialidad> = [];

  constructor(public medicoService: MedicoService, public especialidadService: EspecialidadService,
    public localeService: BsLocaleService) {
    this.localeService.use(this.locale);
    // this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });

  }


  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe((resp: any) => {
      resp.forEach(res => {
        this.especialidades.push(new Especialidad(res.id, res.nombre));
      });
    });
  }

  completarMedico(form: NgForm) {
    console.log(form.value.fechaContratacion > form.value.fechaFinContrato);
    console.log(!form.value.fechaFinContrato);
    if (!form.value.fechaFinContrato || form.value.fechaContratacion < form.value.fechaFinContrato) {
      let medico = new Medico(this.medicoService.medico.id, form.value.especialidad,
        new Date(form.value.fechaContratacion), new Date(form.value.fechaFinContrato));
      this.medicoService.actualizarDatosMedico(medico).subscribe((resp: any) => {
        Swal.fire('Datos Guardados', '', 'success');
        this.actualizado.emit(true);
      });
    } else {
      Swal.fire('Datos Erróneos', 'Revise las fechas introducidas', 'error');
    }

  }

}
