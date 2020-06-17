import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { InformeService, UsuarioService } from 'src/app/services/service.index';
import { Informe } from 'src/app/models/informe.model';

@Component({
  selector: 'app-form-informe',
  templateUrl: './form-informe.component.html',
  styleUrls: ['./form-informe.component.css']
})
export class FormInformeComponent implements OnInit {

  @Input() paciente;
  @Output() operacion = new EventEmitter<any>();
  constructor(public informeService: InformeService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    console.log(this.paciente);
    
  }
  registrarInforme(form: NgForm) {
    console.log(form);
    // tslint:disable-next-line: max-line-length
    let informe = new Informe(+this.paciente.id.id, +this.usuarioService.usuario.id, form.value.evaluacion, form.value.observaciones, form.value.tratamiento);

    this.informeService.registrarInforme(informe, this.usuarioService.token).subscribe((resp: any) => {
      if (resp.code === 201) {
        Swal.fire('Informe registrado', ' Código Identificador: ' + resp.informe.id, 'success');
        form.resetForm();
        this.operacion.emit('finalizado');

      } else {
        Swal.fire('Error al registrar el informe', resp.msg, 'error');
      }
    });


  }
}
