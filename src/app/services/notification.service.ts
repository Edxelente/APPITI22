import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core'
import {PushNotifications} from '@capacitor/push-notifications'
import OneSignal from 'onesignal-cordova-plugin'
import { ONESIGNAL_CONFIG, NOTIFICATION_SEGMENTS, NOTIFICATION_PRIORITIES, NOTIFICATION_TTL } from '../config/onesignal.config';
import { Browser } from '@capacitor/browser'
import { INotification } from '../models/notification.model';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  async init() {
    try {
      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

      if (isPushNotificationsAvailable) {
        // Solicitar permisos de notificaciones
        const result = await PushNotifications.requestPermissions();
        
        if (result.receive) {
          console.log('Permisos de notificaciones concedidos');
          
          // Inicializar OneSignal
          OneSignal.initialize(ONESIGNAL_CONFIG.appId);
          
          // Configurar listeners de OneSignal
          OneSignal.Notifications.addEventListener('click', async (e) => {
            const notification: any = e.notification;
            console.log('Notificación clickeada:', notification);
            
            if (notification.additionalData && notification.additionalData['url']) {
              await Browser.open({ url: notification.additionalData['url'] });
            }
          });

          // Listener para cuando se recibe una notificación
          OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
            console.log('Notificación recibida en primer plano:', event);
            // Aquí puedes mostrar una notificación local si quieres
          });

          // Listener para cuando se abre la app desde una notificación
          OneSignal.Notifications.addEventListener('permissionChange', (permission) => {
            console.log('Permisos cambiaron:', permission);
          });

          console.log('OneSignal inicializado correctamente');
        } else {
          console.log('Permisos de notificaciones denegados');
        }
      } else {
        console.log('Plugin de notificaciones push no disponible');
      }
    } catch (error) {
      console.error('Error al inicializar notificaciones:', error);
    }
  }

  async sendNotification(notification: INotification): Promise<boolean> {
    try {
      const userTimezone = moment.tz.guess();
      
      const notificationData = {
        app_id: ONESIGNAL_CONFIG.appId,
        included_segments: [NOTIFICATION_SEGMENTS.ALL_SUBSCRIBERS],
        headings: { "en": notification.title },
        contents: { "en": notification.body },
        data: { url: notification.url },
        send_after: moment(notification.date).tz(userTimezone).format('YYYY-MM-DD HH:mm:ss [GMT]Z'),
        // Agregar opciones adicionales para mejor compatibilidad
        android_channel_id: ONESIGNAL_CONFIG.defaultChannelId,
        priority: NOTIFICATION_PRIORITIES.NORMAL,
        ttl: NOTIFICATION_TTL.THREE_DAYS
      };

      console.log('Enviando notificación:', notificationData);

      const response = await CapacitorHttp.post({
        url: 'https://onesignal.com/api/v1/notifications',
        params: {},
        data: notificationData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONESIGNAL_CONFIG.restApiKey}`
        }
      });

      console.log('Respuesta de OneSignal:', response);
      
      if (response.status === 200) {
        console.log('Notificación enviada exitosamente');
        return true;
      } else {
        console.error('Error al enviar notificación:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      return false;
    }
  }

  // Método para obtener el estado de los permisos
  async getPermissionStatus(): Promise<string> {
    try {
      const result = await PushNotifications.checkPermissions();
      return result.receive;
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      return 'denied';
    }
  }

  // Método para solicitar permisos manualmente
  async requestPermissions(): Promise<boolean> {
    try {
      const result = await PushNotifications.requestPermissions();
      return result.receive === 'granted';
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  }

  // Método para obtener el ID del dispositivo de OneSignal
  async getDeviceId(): Promise<string | null> {
    try {
      // OneSignal no tiene un método directo para obtener el device ID
      // pero puedes usar el plugin de Capacitor para obtener información del dispositivo
      return null;
    } catch (error) {
      console.error('Error al obtener device ID:', error);
      return null;
    }
  }

  // Método para probar el envío de notificaciones
  async testNotification(): Promise<boolean> {
    const testNotification: INotification = {
      title: 'Notificación de Prueba',
      body: 'Esta es una notificación de prueba para verificar que todo funciona correctamente.',
      date: new Date().toISOString(),
      url: 'https://example.com'
    };

    return await this.sendNotification(testNotification);
  }
}
