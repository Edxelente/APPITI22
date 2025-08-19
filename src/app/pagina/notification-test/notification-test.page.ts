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
    
    // Verificar también el estado de OneSignal
    const oneSignalStatus = await this.notificationService.checkOneSignalStatus();
    console.log('Estado de OneSignal:', oneSignalStatus);
    
    if (!oneSignalStatus.initialized) {
      console.warn('⚠️ OneSignal no está inicializado:', oneSignalStatus.error);
    }

    // Probar la conexión con la API de OneSignal
    const apiTest = await this.notificationService.testOneSignalAPI();
    console.log('Prueba de API OneSignal:', apiTest);
    
    if (!apiTest.success) {
      console.error('❌ Error en API de OneSignal:', apiTest.error);
    }
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

  async testAPI() {
    this.testResult = 'Probando conexión con API de OneSignal...';
    
    try {
      const result = await this.notificationService.testOneSignalAPI();
      if (result.success) {
        this.testResult = '✅ Conexión con API exitosa. App: ' + (result.response?.name || 'N/A');
      } else {
        this.testResult = '❌ Error en API: ' + result.error;
      }
    } catch (error) {
      this.testResult = `❌ Error: ${error}`;
    }
  }
}

