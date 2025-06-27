import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfinitescrollPageRoutingModule } from './infinitescroll-routing.module';

import { InfinitescrollPage } from './infinitescroll.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfinitescrollPageRoutingModule,
    InfinitescrollPage,
    ComponentesModule
  ],

})
export class InfinitescrollPageModule {}
