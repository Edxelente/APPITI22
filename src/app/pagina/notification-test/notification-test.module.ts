import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationTestPageRoutingModule } from './notification-test-routing.module';
import { NotificationTestPage } from './notification-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationTestPageRoutingModule,
  ],
  declarations: [NotificationTestPage],
})
export class NotificationTestPageModule {}

