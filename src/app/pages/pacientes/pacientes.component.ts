import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {

  public pacientes: Usuario[] = [];
  public page = 0;
  public next_page;
  public prev_page;
  public number_pages;
  public totalPacientes = 0;
  public cargando: boolean = true;
  public termino: string = null;
  constructor(public usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.actualPageUsuarios();
  }



  cargarUsuarios(page) {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(page, 1, this.termino)
      .subscribe((resp: any) => {
        // tslint:disable-next-line: forin
        this.pacientes = resp.usuarios;
        // tslint:disable-next-line: one-variable-per-declaration
        let numberPages = [];
        for (var i = 1; i <= resp.total_pages; i++) {
          numberPages.push(i);
        }
        this.number_pages = numberPages;
        if (page >= 2) {
          this.prev_page = page - 1;
        } else {
          this.prev_page = 1;
        }
        if (page < resp.total_pages) {
          this.next_page = page + 1;
        } else {
          this.next_page = resp.total_pages;
        }
        this.cargando = false;
        this.totalPacientes = resp.total_items_count;

      });
  }
  buscarUsuario(termino: string) {
    this.termino = termino;
    this.cargarUsuarios(1);

  }
  actualPageUsuarios() {
    this.route.params.subscribe(params => {
      var page = +params['page'];
      if (!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.cargarUsuarios(page);

    });
  }
  borrarUsuario(paciente: Usuario) {
    if (this.usuarioService.usuario.id === paciente.id) {
      Swal.fire('No puede borrar este usuario', 'Está logueado con este mismo usuario', 'error');
      return;
    }
    Swal.fire({
      title: '¿Está seguro?',
      text: "Está a punto de borrar a " + paciente.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, ¡Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Borrar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(paciente.id).subscribe((resp: any) => {
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
  editarPaciente(paciente: Usuario) {
    this.modalUploadService.mostrarModal(paciente);
  }
  abrirModal(){
    this.modalUploadService.mostrarModal(null);
  }
}
