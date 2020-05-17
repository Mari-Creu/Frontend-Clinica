import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html'
})
export class ModalUsuarioComponent implements OnInit {

  imagenASubir: File;
  imagenTemporal: string | ArrayBuffer;
  constructor( public uploadService: UploadService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
  }
  cerrarModal(){
    this.imagenTemporal=null;
    this.imagenASubir=null;
    this.modalUploadService.ocultarModal();
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
}
