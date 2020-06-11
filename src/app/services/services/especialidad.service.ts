import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(public http: HttpClient) {
  }

  getEspecialidades(){
    let url = URL_SERVICIOS + '/especialidades';

    return this.http.get<Array<Especialidad>>(url);
   
  }
}
