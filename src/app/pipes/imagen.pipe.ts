import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string): any {

    let url = URL_SERVICIOS + '/img/';
    if (!imagen) {
      return url + 'null';
    } else {
      url += imagen;
    }


    return url;
  }

}
