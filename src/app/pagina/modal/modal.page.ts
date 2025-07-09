// modal.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonModal, 
  IonTitle, 
  IonToolbar 
} from '@ionic/angular/standalone';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  imports: [
    CommonModule, 
    RouterModule,
    ComponentesModule,
    FormsModule,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput
  ],
})
export class ModalPage {
  message = 'Practica de modal';
  name!: string;

  cancel() {
    const modal = document.querySelector('ion-modal');
    modal?.dismiss(null, 'cancel');
  }

  confirm() {
    const modal = document.querySelector('ion-modal');
    modal?.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const customEvent = event as CustomEvent<OverlayEventDetail>;
    if (customEvent.detail.role === 'confirm') {
      this.message = `Hola, ${customEvent.detail.data}!`;
    }
  }
}