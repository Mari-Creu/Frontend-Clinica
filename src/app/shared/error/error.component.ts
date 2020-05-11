import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   init_plugins();
  }

}
