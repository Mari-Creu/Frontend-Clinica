import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(imagen: string): any {

    let url = URL_SERVICIOS + '/img/';
    if (imagen === null || imagen === '') {
      return url + 'null';
    }
    else {
      url += imagen;
    }


    return url;
  }

}
