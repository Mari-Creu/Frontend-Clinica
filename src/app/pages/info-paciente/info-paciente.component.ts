import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/paciente.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-paciente',
  templateUrl: './info-paciente.component.html',
  styleUrls: ['./info-paciente.component.css']
})
export class InfoPacienteComponent implements OnInit {
  idPaciente;
  paciente: Paciente;
  constructor(public usuarioService: UsuarioService, private route: ActivatedRoute, public http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var id = +params['id'];
      if (id) {
        this.idPaciente = id;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', this.usuarioService.token);
        const url = URL_SERVICIOS + '/findPaciente/' + id;
        this.http.get(url, { headers: headers }).subscribe((resp: any) => {
          if (resp.code === 200) {
            this.paciente = resp.paciente[0];
          }
        });
      }
    });
  }

}
