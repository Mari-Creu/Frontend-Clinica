import { Injectable, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';
import { UploadService } from '../upload/upload.service';
import { Router } from '@angular/router';
import { ObservableLike, Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string;
  usuario: Usuario;
  // usuario: Subject<Usuario> = new BehaviorSubject<Usuario>(new Usuario('', ''));
  // usuarioSelected: Observable<Usuario> = this.usuario.asObservable();
  // usuarioCambiar: any;



  constructor(public http: HttpClient, public uploadService: UploadService, public router: Router) {
    this.cargarStorage();
    // this.getUsuarioById(JSON.parse(localStorage.getItem('id')));

  }
  getUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario !== 'undefined') {
      this.usuario = usuario;
    } else {
      this.usuario = null;
    }
    return this.usuario;
  }
  getToken() {
    let token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
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
  // getUsuario(): Observable<Usuario> {
  // let id: number;
  // id = +idUsuario;
  // let url = URL_SERVICIOS + '/findById';
  // return this.http.post<Usuario>(url, )
  // .pipe(
  // map((res: Usuario) => {
  // console.log(res);
  // 
  // return res;
  // })
  // );
  // }
  getUsuarioById(idUsuario: string): Usuario {
    let id: number;
    id = +idUsuario;
    let usuario;
    let url = URL_SERVICIOS + '/findById';
    usuario = this.http.post<Usuario>(url, id)
      .pipe(
        map((res: Usuario) => {
          return res;
        })
      );
    return usuario;
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    // const url2 = URL_SERVICIOS + '/findById';
    // this.usuario.next(this.getUsuarioById(id));
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  signup(usuario: Usuario): Observable<any> {
    const url = URL_SERVICIOS + '/login';
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
              this.guardarStorage(res.id, res.token, res.usuario);
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
        let response = JSON.parse(resp);
        console.log(response);

        this.usuario = response.usuario;
        localStorage.removeItem('usuario');
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        console.log(response.usuario);


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
  cargarUsuarios(page: any, rol, termino?: string): Observable<any> {
    if (!page || page === null) {
      page = 1;
    }
    let params= { 'rol': rol.toString(), 'termino': termino};
    console.log(params);
    
    // let params = 'rol=' + rol.toString();
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    const url = URL_SERVICIOS + '/list?page=' + page;
    return this.http.post(url, params, { headers: headers });
  }
  buscarUsuario(termino: string, rol: string) {

  }

  borrarUsuario(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    const url = URL_SERVICIOS + '/deleteUser/' + id;
    return this.http.delete(url, { headers: headers });
  }
}
