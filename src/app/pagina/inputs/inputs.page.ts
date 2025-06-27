import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule,ComponentesModule],
})
export class InputsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
