import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.css']
})
export class CondicionesComponent implements OnInit {

  oculto: string = '';
  @Output() modal = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  cerrarModal() {
    // this.oculto = 'oculto';
    this.modal.emit(false);
  }
  
}
