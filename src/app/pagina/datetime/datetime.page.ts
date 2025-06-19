import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
   imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
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
