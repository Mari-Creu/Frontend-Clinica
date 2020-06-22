import { Component, OnInit, ViewChild } from '@angular/core';
import { InformeService, UsuarioService } from 'src/app/services/service.index';


@Component({
  selector: 'app-mis-informes',
  templateUrl: './mis-informes.component.html',
  styleUrls: ['./mis-informes.component.css']
})
export class MisInformesComponent implements OnInit {
  misInformes = [];
  cargando = true;
  informe: any;
  informesTotales = [];

  constructor(public informeService: InformeService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getInformes();
    this.informeService.getInformesPorMedico(this.usuarioService.usuario.id).subscribe((resp: any) => {
      if (resp.code === 200) {
        this.informesTotales = resp.informes;
      }
      console.log(resp);
      this.cargando = false;
    });
  }
  getInformes() {
    this.informeService.getInformesPorMedico(this.usuarioService.usuario.id).subscribe((resp: any) => {
      if (resp.code === 200) {
        this.misInformes = resp.informes;
      }
      console.log(resp);
      this.cargando = false;
    });
  }
  verInforme(informe) {
    this.informe = informe;
  }
  buscarInforme(term: any) {
    this.misInformes = this.informesTotales;
    this.misInformes = this.misInformes.filter(informe =>
      !informe.paciente.id.nombre.indexOf(term)
    );

  }
  cerrarInforme(event) {
    this.informe = null;

  }

}