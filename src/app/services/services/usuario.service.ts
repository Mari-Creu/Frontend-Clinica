import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) {

  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/registro';

    return this.http.post(url, usuario);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).
      pipe(
        map(
          (res: any) => {
            if (res.code === 200) {
              localStorage.setItem('id', res.id);
              localStorage.setItem('token', res.token);
              localStorage.setItem('rol', res.rol);
              return true;
            } else {
              return false;
            }
          }
        ));

  }
}
