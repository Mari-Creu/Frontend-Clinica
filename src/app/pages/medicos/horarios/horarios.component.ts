import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/services/horario.service';
import { NgForm } from '@angular/forms';
import { Horario } from 'src/app/models/horario.model';
import { MedicoService } from 'src/app/services/services/medico.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html'

})
export class HorariosComponent implements OnInit {

  horaIni;
  horaFin;
  dias = [];
  idHorario;
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



  constructor(public horarioService: HorarioService, public medicoService: MedicoService) { }

  ngOnInit(): void {
  }
  registrarHorario(form: NgForm) {
    let horaIni = form.value.horaInicio;
    let horaFin = form.value.horaFin;
    this.crearHorario(horaIni, horaFin);
  }
  cambiarHoras(e) {
    let horaInicio = e.target.selectedIndex + 1;
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

    this.horarioService.crearHorario(horario).subscribe((resp: any) => {
      console.log(resp);
      if (resp.code === 200) {
        this.idHorario = resp.horario[0].id;
        this.asignarHorario(resp.horario[0].id);
      } else if (resp.code === 201) {
        this.idHorario = resp.horario.id;
        this.asignarHorario(resp.horario.id);
      } else {
        this.idHorario = resp.horario.id;
      }
      return this.idHorario;
    });

  }
  asignarHorario(id) {

    this.medicoService.relacionarMedicoHorario(this.medicoService.medico.id.id, id, this.dias);


  }



 
}
