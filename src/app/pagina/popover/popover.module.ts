import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopoverPageRoutingModule } from './popover-routing.module';
import { PopoverPage } from './popover.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverPageRoutingModule,
    PopoverPage,
    ComponentesModule
  ],
  declarations: []
})
export class PopoverPageModule {}
