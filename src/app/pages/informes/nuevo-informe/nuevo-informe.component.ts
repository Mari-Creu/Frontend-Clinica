import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService, InformeService } from 'src/app/services/service.index';
import { ActivatedRoute } from '@angular/router';
import { Informe } from 'src/app/models/informe.model';
import Swal from 'sweetalert2';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/services/paciente.service';
import { Ingreso } from 'src/app/models/ingreso.model';
import { IngresoService } from 'src/app/services/services/ingreso.service';
import { Habitacion } from 'src/app/models/habitacion.model';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-informe',
  templateUrl: './nuevo-informe.component.html',
  styleUrls: ['./nuevo-informe.component.css']
})
export class NuevoInformeComponent implements OnInit {


  idMedico;
  habitacion: Habitacion = null;
  registro;
  habitacionesOcupadas;
  operacionEnTramite = false;
  hacerInforme = false;
  @Input() paciente: Paciente;
  @Input() ingreso: Ingreso;
  @Output() ingresoHijo = new EventEmitter<any>();


  constructor(public usuarioService: UsuarioService, public pacienteService: PacienteService, public informeService: InformeService, public ingresoService: IngresoService) {

  }

  ngOnInit(): void {
    this.idMedico = this.usuarioService.usuario.id;
    this.registro = false;
    this.habitacion = null;


  }

  darBajaAlPaciente() {
    this.operacionEnTramite = true;
    if (this.paciente.baja) {
      this.paciente.baja = false;
      if (this.ingreso) {
        this.ingresoService.darAltaIngreso(this.ingreso).subscribe((resp: any) => {
          if (resp.code === 200) {
            this.ingreso = null;
            this.ingresoHijo.emit('null');
          }
          console.log(resp);

        }
        );
        this.ingresoService.liberarHabitacion(this.ingreso).subscribe((resp: any) => {
          console.log(resp);
        })
      }

    } else {
      this.paciente.baja = true;
    }
    this.pacienteService.actualizarPaciente(this.paciente).subscribe((resp: any) => {
      console.log(resp);
      if (resp.code = 200) {
        let estado = (this.paciente.baja) ? 'BAJA' : 'ALTA';
        Swal.fire({
          title: 'Paciente nº ' + this.paciente.id.id + ', Estado: ' + estado,
          text: "Rellene el informe correspondiente",
          icon: 'info',
          // showCancelButton: true,
          // cancelButtonText: 'No, ¡Cancelar!',
          confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Rellenar Informe'
        }).then((result) => {
          this.hacerInforme = true;
        });

      }
    });
  }

  ingresarPaciente() {
    let ingreso = new Ingreso(this.habitacion.id, +this.paciente.id.id);
    this.ingresoService.ingresar(ingreso).subscribe((resp: any) => {
      console.log(resp);
      this.ingreso = resp.ingreso;
      this.ingresoHijo.emit(this.ingreso);
      Swal.fire({
        title: 'Asignada la habitació nº '+resp.ingreso.habitacion.numero+' de la '+resp.ingreso.planta.nombre,
        text: "Rellene el informe correspondiente",
        icon: 'info',
        // showCancelButton: true,
        // cancelButtonText: 'No, ¡Cancelar!',
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Rellenar Informe'
      }).then((result) => {
        this.hacerInforme = true;
      });
    });
    this.paciente.baja = true;
    this.pacienteService.actualizarPaciente(this.paciente).subscribe(resp => console.log(resp));
  }
  buscarHabitacion() {
    this.operacionEnTramite = true;
    this.ingresoService.buscarHabitacion().subscribe((resp: any) => {
      if (resp.code === 200) {
        this.habitacion = new Habitacion(resp.habitacion.id, resp.habitacion.numero, resp.habitacion.planta.nombre);
      } else if (resp.code === 404) {
        this.habitacionesOcupadas = true;
      }
    }
    );
  }
  programarIntervencion() {

  }
  estadoOperacion(event) {
    this.operacionEnTramite = false;
  }
  finalizarOperacionHabitacion() {
    this.operacionEnTramite = false;
    this.habitacionesOcupadas = false;
  }
}
