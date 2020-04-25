import { Injectable, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';
import { UploadService } from '../upload/upload.service';
import { Router } from '@angular/router';
import { ObservableLike, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string;
  usuario: Usuario;
  // usuarioCambiar: any;



  constructor(public http: HttpClient, public uploadService: UploadService, public router: Router) {
    this.cargarStorage();
    console.log(this.usuario);

  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario')).usuario;
      // this.usuario = this.usuarioCambiar.usuario;
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/registro';

    return this.http.post(url, usuario);
  }
  getUsuarioById(idUsuario: string) {
    let id: number;
    id = +idUsuario;
    let url = URL_SERVICIOS + '/findById';
    return this.http.post(url, id);
  }
  guardarStorage(id: string, token: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    const url2 = URL_SERVICIOS + '/findById';
    this.getUsuarioById(id).subscribe((res: Usuario) => {
      this.usuario = res;
      localStorage.setItem('usuario', JSON.stringify(res));
      return true;
    });
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
              this.guardarStorage(res.id, res.token);
              return true;
            } else {
              return false;
            }
          }
        ));

  }
  cambiarImagen(file: File, id: string) {
    this.uploadService.subirArchivo(file, id)
      .then((resp: any) => {
        this.usuario = resp.usuario;
        //localStorage.removeItem('usuario');
      //  localStorage.setItem('usuario', JSON.stringify(this.usuario));
      //  this.cargarStorage();

      }).catch(resp => {
        console.log(resp);
      });
  }
  logueado() {
    if (this.token.length > 1) {
      return true;
    }
    return false;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
