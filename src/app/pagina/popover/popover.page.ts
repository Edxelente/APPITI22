import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule} from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
    imports: [IonicModule, CommonModule, RouterModule,ComponentesModule],
})
export class PopoverPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
