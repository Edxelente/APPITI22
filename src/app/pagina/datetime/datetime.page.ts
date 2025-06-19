import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements OnInit {

  fechaActual: Date = new Date();

  fechaCambio($event: any){
  console.log($event);
}

  constructor() { }

  ngOnInit() {
  }

}
