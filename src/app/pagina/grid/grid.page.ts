import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonCol, IonGrid, IonicModule, IonRow } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule,ComponentesModule],
})
export class GridPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
