import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-test',
  templateUrl: './notification-test.page.html',
  styleUrls: ['./notification-test.page.scss'],
  standalone: false,
})
export class NotificationTestPage {
  testResult: string = '';

  constructor(private notificationService: NotificationService) {}

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
