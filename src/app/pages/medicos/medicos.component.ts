import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})
export class MedicosComponent implements OnInit {
  public medicos: Usuario[] = [];
  public page = 0;
  public nextPage: number;
  public prevPage: number;
  public numberPages: any[];
  public totalMedicos = 0;
  public cargando = true;
  public termino: string = null;
  constructor(public usuarioService: UsuarioService,
              private route: ActivatedRoute, private router: Router,
              public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.actualPageUsuarios();
  }



  cargarUsuarios(page: number) {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(page, 3, this.termino)
      .subscribe((resp: any) => {
        // tslint:disable-next-line: forin
        this.medicos = resp.usuarios;
        // tslint:disable-next-line: one-variable-per-declaration
        let numberPages = [];
        for (var i = 1; i <= resp.total_pages; i++) {
          numberPages.push(i);
        }
        this.numberPages = numberPages;
        if (page >= 2) {
          this.prevPage = page - 1;
        } else {
          this.prevPage = 1;
        }
        if (page < resp.total_pages) {
          this.nextPage = page + 1;
        } else {
          this.nextPage = resp.total_pages;
        }
        this.cargando = false;
        this.totalMedicos = resp.total_items_count;

      });
  }
  buscarUsuario(termino: string) {
    this.termino = termino;
    this.cargarUsuarios(3);

  }
  actualPageUsuarios() {
    this.route.params.subscribe(params => {
      var page = +params['page'];
      if (!page) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.cargarUsuarios(page);

    });
  }
  borrarUsuario(medico: Usuario) {
    if (this.usuarioService.usuario.id === medico.id) {
      Swal.fire('No puede borrar este médico', 'Está logueado con este mismo usuario', 'error');
      return;
    }
    Swal.fire({
      title: '¿Está seguro?',
      text: "Está a punto de borrar a " + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, ¡Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Borrar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(medico.id).subscribe((resp: any) => {
          if (resp.code === 200) {
            Swal.fire(
              'Borrado!',
              'El usuario ya no existe',
              'success'
            );
            this.actualPageUsuarios();
          } else {
            Swal.fire(
              'Error!',
              'El usuario no ha podido ser borrado',
              'error'
            );
          }
        });

      }
    });

  }
  editarMedico(medico: Usuario) {
    this.modalUploadService.mostrarModal(medico);
  }
  abrirModal() {
    this.modalUploadService.mostrarModalMedico();
    console.log('estoy en medicos.component abriendo el modal');
    
  }
}
