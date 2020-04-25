import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService) {

  }

  canActivate() {
    if (this.usuarioService.usuario.rol === '2') {
      return true;
    }else{
      console.log('bloqueado por el admin guard');
    }
  }

}
