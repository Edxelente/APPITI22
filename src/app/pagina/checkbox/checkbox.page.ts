import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class CheckboxPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
