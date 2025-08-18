import { NotificationService } from './services/notification.service';
import { Component, inject, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{

private notificationService: NotificationService = inject
(NotificationService);
private platform: Platform = inject(Platform);

ngOnInit(): void {
  this.platform.ready().then(() => {
    this.notificationService.init();
  })
}
}
