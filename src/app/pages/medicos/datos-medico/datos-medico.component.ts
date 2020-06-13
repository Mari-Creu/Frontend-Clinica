import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/services/medico.service';
import { EspecialidadService } from 'src/app/services/service.index';
import { Especialidad } from 'src/app/models/especialidad.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-datos-medico',
  templateUrl: './datos-medico.component.html',
  styles: [
  ]
})
export class DatosMedicoComponent implements OnInit {
  especialidades: Array<Especialidad> = [];

  constructor(public medicoService: MedicoService, public especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe((resp: any) => {
      resp.forEach(res => {
        this.especialidades.push(new Especialidad(res.id, res.nombre));
      });
    });
  }

  completarMedico(form: NgForm){
    
  }

}
