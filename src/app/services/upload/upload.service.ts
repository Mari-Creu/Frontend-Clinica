import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  subirArchivo(archivo: File,  id: string) {

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(xhr.response);
          } else {
            console.log('falla la subida');
            reject(xhr.response);

          }
        }
      }
      let url = URL_SERVICIOS + '/upload/' + id;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
