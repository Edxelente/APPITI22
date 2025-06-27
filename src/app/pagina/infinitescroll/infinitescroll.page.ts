import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-infinitescroll',
  templateUrl: './infinitescroll.page.html',
  styleUrls: ['./infinitescroll.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule,ComponentesModule],
})
export class InfinitescrollPage implements OnInit {
datos=Array(100);

  constructor() { }

  ngOnInit() {
  }

}
