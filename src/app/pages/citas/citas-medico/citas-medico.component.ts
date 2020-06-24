import { Component, OnInit, Input } from '@angular/core';
import { CitaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { HORAS } from 'src/app/config/config';

@Component({
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css']
})
export class CitasMedicoComponent implements OnInit {
  @Input() citas: any[];
  constructor(public citaService: CitaService) { }

  ngOnInit(): void {
  console.log(this.citas);
  
  }

  borrarCita(cita: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Está a punto de borrar su cita del dían  " + cita.fechaProgramada,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, ¡Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Borrar!'
    }).then((result) => {
      if (result.value) {
        this.citaService.borrarCita(cita).subscribe((resp: any) => {
          if (resp.code === 202) {
            Swal.fire(
              'Cita Eliminada!',
              '',
              'success'
            );

          } else {
            Swal.fire(
              'Error!',
              'La cita no ha podido ser cancelada. LLame a la clínica',
              'error'
            );
          }
          if (resp.status === 500) {
            Swal.fire(
              'Error!',
              'La cita no ha podido ser cancelada. LLame a la clínica',
              'error'
            );
          }
        });

        this.citas = this.citas.filter(citas => citas !== cita);
      }
    });
  }

  getHora(horaCita) {
    return HORAS[horaCita-1].hora;
  }

}
