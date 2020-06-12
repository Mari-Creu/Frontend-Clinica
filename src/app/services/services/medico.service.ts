import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient) {
  }


  crearMedico(medico: Medico, idHorario:any,dias:number[]) {
      console.log(medico);
      console.log(idHorario);
      console.log(dias);
      
      
      
  }
}
