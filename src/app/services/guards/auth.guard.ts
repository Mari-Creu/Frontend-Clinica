import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(public usuarioService: UsuarioService, public router: Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usuarioService.token) {
      return this.usuarioService.logueado();

    } else {
      this.router.navigate(['/login']);
    }
  }
}
