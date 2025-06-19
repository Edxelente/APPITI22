import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatetimePageRoutingModule } from './datetime-routing.module';
import { DatetimePage } from './datetime.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatetimePageRoutingModule,
    DatetimePage,
    ComponentesModule
  ],
})
export class DatetimePageModule {}
