import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

interface Students {
  id: string;
  name: string;
};

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule]
})
export class ListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  students: Students[] = [
    {
      'id': '202200011',
      'name': 'Claudia Edith Alvarez Olivo'
    },
    {
      'id': '202200017',
      'name': 'Josue Jahaziel Carballo García'
    },
    {
      'id': '202200019',
      'name': 'Yarely Castañeda García'
    },
    {
      'id': '202200021',
      'name': 'Héctor Manuel Castro Zapata'
    },
     {
      'id': '202200033',
      'name': 'Selene Berenice Gámez León'
    },
    {
      'id': '202200081',
      'name': 'Valentín Rivera de los Santos'
    },
    {
      'id': '202200095',
      'name': 'Edxel Yahir Villareal López'
    },
    {
      'id': '202200097',
      'name': 'Juan Fernando Zapata Cordova'
    }
  ]

}