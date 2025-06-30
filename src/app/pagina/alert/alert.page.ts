import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { AlertController } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
  
})

export class AlertPage implements OnInit {
  constructor(private alertController: AlertController) {}
       
  ngOnInit() {
  }

    async funcionAlerta1() {
    const alert = await this.alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
    });
    await alert.present();
  };

  async alertaPersonalizada() {
    const personalizada = await this.alertController.create({
      backdropDismiss: false,
      header: '¿Que quieres hacer con tu producto?',
      buttons: ['Guardar', 'Borrar', 'Cancelar'],
    });
    await personalizada.present();
  };
  
  async FormularioConsole() {
  const alert = await this.alertController.create({
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
      },
      {
        name: 'apellidoP',
        placeholder: 'Apellido Paterno',
        attributes: {
        maxlength: 20,
      },
      },
      {
        name: 'apellidoM',
        placeholder: 'Apellido Materno',
        attributes: {
        maxlength: 20,
      },
      },
      {
        name: 'edad',
        placeholder: 'Edad',
        min: 1,
        max: 100,
      },
    ],
    buttons: [
      {
        text: 'OK',
        handler: (data) => {
          console.log( data)           
        },
      },
    ],
  });
  await alert.present();
};

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Nombre',
    },
    {
      placeholder: 'Apellido Paterno',
      attributes: {
        maxlength: 20,
      },
    },
    {
      placeholder: 'Apellido Materno',
      attributes: {
        maxlength: 20,
      },
    },
    {
      type: 'number',
      placeholder: 'Edad',
      min: 1,
      max: 100,
    },
  ];

  public consoleButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
  
}