import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class CardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
