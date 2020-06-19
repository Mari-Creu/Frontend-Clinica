import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../models/especialidad.model';
import { EspecialidadService } from '../services/service.index';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
declare function init_plugins();
@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {
  especialidades = [];
  modalAbierto=false;
  public imagesUrl;

  constructor(private especialidadService: EspecialidadService,  private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    init_plugins();
    this.imagesUrl = [
      './../assets/images/img/ananlisis.PNG',
      './../assets/images/img/guante.PNG',
      './../assets/images/img/pastillas.PNG',
    ];
    this.especialidadService.getEspecialidades().subscribe((resp: any) => {
      
      this.especialidades=resp;
    });
  }
  abrirCondiciones(){
    this.modalAbierto=true;
  }
  cerrarModal(event){
    this.modalAbierto=false;
  }

}
