import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-informe',
  templateUrl: './modal-informe.component.html',
  styleUrls: ['./modal-informe.component.css']
})
export class ModalInformeComponent implements OnInit {

  @Input() informe:any;
  
  oculto:string='';
 @Output() notificacion = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    console.log('abrirmodal');
    
  }
  cerrarModal(){
    this.oculto='oculto';
    this.notificacion.emit(true);
  }

}
