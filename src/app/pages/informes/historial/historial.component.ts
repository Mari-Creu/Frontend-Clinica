import { Component, OnInit, Input } from '@angular/core';
import { InformeService } from 'src/app/services/service.index';
import { Paciente } from 'src/app/models/paciente.model';
import { Informe } from 'src/app/models/informe.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historialInformes = [];
  informe:Informe;
  @Input() paciente: Paciente;

  constructor(public informeService: InformeService) { }

  ngOnInit(): void {
    this.findInformes();

  }
  findInformes() {
    this.informeService.getInformes(this.paciente).subscribe((resp: any) => {
      console.log(resp);
      
      if (resp.code === 200) {
        this.historialInformes = resp.informes;
      }

    });
  }
 abrirModal(informe:any){
  this.informe=informe;
  console.log(informe);
  
 }
 cerrarModal(event){
   this.informe=null;
 }

}
