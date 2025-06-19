import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.page.html',
  styleUrls: ['./fab.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class FabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
