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
    this.usuario = this.usuarioService.usuario;
    if (this.usuario.nombre === null) {
      this.usuario.nombre = '';
    }
    if (this.usuario.apellidos === null) {
      this.usuario.apellidos = '';
    }
    if (this.usuario.telefono === undefined) {
      this.usuario.telefono = '';
    }
  }
  guardar(usuario: Usuario) {
    //COMPLETAR CON TODOS LOS CAMPOS Y ACTUALIZAR
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this.usuario.telefono = usuario.telefono;
    this.usuario.apellidos = usuario.apellidos;
    this.usuarioService.putUsuario(this.usuario).subscribe((resp: any) => {
      console.log(resp);
      Swal.fire(resp.usuario.nombre + ' ' + resp.usuario.apellidos, 'Tus datos han sido actualizados', 'success');

    });

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
    Swal.fire('¡Estupendo!', 'Tu foto de perfil ha sido actualizada', 'success');
  }

}
