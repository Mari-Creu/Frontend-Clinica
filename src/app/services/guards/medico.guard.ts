import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoGuard implements CanActivate {
  usuario:Usuario;
  constructor(private usuarioService:UsuarioService){
    this.usuario=usuarioService.usuario;
  }
  canActivate(){
    if (this.usuario.rol === 3) {
      return true;
    } else {
      console.log('bloqueado por el medico guard');
    }
  }
  
}
