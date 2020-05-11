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
  canActivate() {

    this.usuarioService.cargarStorage();
    if (this.usuarioService.logueado()) {
      return true;
    } else {
      console.log('Bloqueado por el guard del login');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
