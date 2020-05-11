import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  imagenASubir: File;
  imagenTemporal: string | ArrayBuffer;



  constructor(public usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuario= this.usuarioService.usuario;
  }
  guardar(usuario: Usuario) {
    //COMPLETAR CON TODOS LOS CAMPOS Y ACTUALIZAR
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

  }

  seleccionaImagen(archivo: File) {
    if (!archivo) {
      this.imagenASubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('¡Cuidado!', 'El archivo seleccionado no es una imagen', 'warning');
      this.imagenASubir = null;
      return;
    }

    this.imagenASubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemporal = reader.result;

    };
  }
  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenASubir, this.usuario.id);

  }

}
