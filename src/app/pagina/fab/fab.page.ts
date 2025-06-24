import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.page.html',
  styleUrls: ['./fab.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class FabPage implements OnInit {
  items=Array(140);
  constructor() { }

  ngOnInit() {
  }

}
