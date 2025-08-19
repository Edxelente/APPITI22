import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { INotification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-test',
  templateUrl: './notification-test.page.html',
  styleUrls: ['./notification-test.page.scss'],
  standalone: false,
})
export class NotificationTestPage implements OnInit {
  permissionStatus: string = 'unknown';
  isInitialized: boolean = false;
  testResult: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.checkPermissionStatus();
  }

  async checkPermissionStatus() {
    this.permissionStatus = await this.notificationService.getPermissionStatus();
  }

  async initializeNotifications() {
    try {
      await this.notificationService.init();
      this.isInitialized = true;
      this.checkPermissionStatus();
    } catch (error) {
      console.error('Error al inicializar notificaciones:', error);
    }
  }

  async requestPermissions() {
    const granted = await this.notificationService.requestPermissions();
    if (granted) {
      this.permissionStatus = 'granted';
      await this.initializeNotifications();
    }
  }

  async sendTestNotification() {
    this.testResult = 'Enviando notificación de prueba...';

    try {
      const success = await this.notificationService.testNotification();
      if (success) {
        this.testResult = '✅ Notificación de prueba enviada exitosamente';
      } else {
        this.testResult = '❌ Error al enviar notificación de prueba';
      }
    } catch (error) {
      this.testResult = `❌ Error: ${error}`;
    }
  }

  async sendCustomNotification() {
    const customNotification: INotification = {
      title: 'Notificación Personalizada',
      body: 'Esta es una notificación personalizada enviada desde la app.',
      date: new Date().toISOString(),
      url: 'https://ionicframework.com'
    };

    this.testResult = 'Enviando notificación personalizada...';

    try {
      const success = await this.notificationService.sendNotification(customNotification);
      if (success) {
        this.testResult = '✅ Notificación personalizada enviada exitosamente';
      } else {
        this.testResult = '❌ Error al enviar notificación personalizada';
      }
    } catch (error) {
      this.testResult = `❌ Error: ${error}`;
    }
  }
}

