import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  usuario: Usuario;
  constructor(private usuarioService: UsuarioService) {
    // usuarioService.usuario.subscribe(usuario => this.usuario = usuario);
    this.usuario= usuarioService.usuario;
  }

  canActivate() {
    if (this.usuario.rol === 2) {
      return true;
    } else {
      console.log('bloqueado por el admin guard');
    }
  }

}
