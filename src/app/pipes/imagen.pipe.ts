import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(public usuarioService: UsuarioService) {
  
  }
  transform(imagen: string): any {

    let url = URL_SERVICIOS + '/img/';
    if (this.usuarioService.usuario.imagen === null) {
      return url + 'null';
    }
    else {
      url += this.usuarioService.usuario.imagen;
    }


    return url;
  }

}
