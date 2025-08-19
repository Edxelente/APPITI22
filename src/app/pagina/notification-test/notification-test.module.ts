import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationTestPageRoutingModule } from './notification-test-routing.module';
import { NotificationTestPage } from './notification-test.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationTestPageRoutingModule,
    ComponentesModule
  ],
  declarations: [NotificationTestPage],
})
export class NotificationTestPageModule {}

