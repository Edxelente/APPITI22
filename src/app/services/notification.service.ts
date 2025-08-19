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
      console.log('Iniciando servicio de notificaciones...');

      // Verificar si estamos en un dispositivo móvil
      if (!Capacitor.isNativePlatform()) {
        console.log('No estamos en un dispositivo nativo, usando modo web');
        return;
      }

      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
      console.log('Plugin PushNotifications disponible:', isPushNotificationsAvailable);

      if (isPushNotificationsAvailable) {
        // Solicitar permisos de notificaciones
        const result = await PushNotifications.requestPermissions();
        console.log('Resultado de permisos:', result);

        if (result.receive === 'granted') {
          console.log('✅ Permisos de notificaciones concedidos');

          try {
            // Inicializar OneSignal
            console.log('Inicializando OneSignal con App ID:', ONESIGNAL_CONFIG.appId);
            OneSignal.initialize(ONESIGNAL_CONFIG.appId);

            // Configurar listeners de OneSignal
            OneSignal.Notifications.addEventListener('click', async (e) => {
              const notification: any = e.notification;
              console.log('🔔 Notificación clickeada:', notification);

              if (notification.additionalData && notification.additionalData['url']) {
                await Browser.open({ url: notification.additionalData['url'] });
              }
            });

            // Listener para cuando se recibe una notificación
            OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
              console.log('📱 Notificación recibida en primer plano:', event);
            });

            // Listener para cuando se abre la app desde una notificación
            OneSignal.Notifications.addEventListener('permissionChange', (permission) => {
              console.log('🔐 Permisos cambiaron:', permission);
            });

            console.log('✅ OneSignal inicializado correctamente');
          } catch (onesignalError) {
            console.error('❌ Error al inicializar OneSignal:', onesignalError);
          }
        } else {
          console.log('❌ Permisos de notificaciones denegados:', result.receive);
        }
      } else {
        console.log('❌ Plugin de notificaciones push no disponible');
      }
    } catch (error) {
      console.error('❌ Error al inicializar notificaciones:', error);
    }
  }

  async sendNotification(notification: INotification): Promise<boolean> {
    try {
      console.log('🚀 Iniciando envío de notificación...');

      // Verificar que estemos en un dispositivo nativo
      if (!Capacitor.isNativePlatform()) {
        console.log('⚠️ No estamos en un dispositivo nativo, simulando envío...');
        // Simular envío exitoso para desarrollo web
        return true;
      }

      const userTimezone = moment.tz.guess();
      console.log('🌍 Zona horaria del usuario:', userTimezone);

      // Validar datos de entrada
      if (!notification.title || !notification.body) {
        console.error('❌ Título y cuerpo son requeridos');
        return false;
      }

      const notificationData = {
        app_id: ONESIGNAL_CONFIG.appId,
        included_segments: [NOTIFICATION_SEGMENTS.ALL_SUBSCRIBERS],
        headings: { "en": notification.title },
        contents: { "en": notification.body },
        data: { url: notification.url || 'https://example.com' },
        // Remover send_after si la fecha es muy cercana
        ...(notification.date && new Date(notification.date) > new Date(Date.now() + 60000) && {
          send_after: moment(notification.date).tz(userTimezone).format('YYYY-MM-DD HH:mm:ss [GMT]Z')
        }),
        // Configuraciones para Android
        android_channel_id: ONESIGNAL_CONFIG.defaultChannelId,
        priority: NOTIFICATION_PRIORITIES.NORMAL,
        ttl: NOTIFICATION_TTL.THREE_DAYS,
        // Configuraciones adicionales para mejor compatibilidad
        isAnyWeb: false,
        isChrome: false,
        isChromeWeb: false,
        isFirefox: false,
        isSafari: false,
        isEdge: false,
        isIOS: false,
        isAndroid: true
      };

      console.log('📤 Datos de notificación a enviar:', JSON.stringify(notificationData, null, 2));

      const response = await CapacitorHttp.post({
        url: 'https://onesignal.com/api/v1/notifications',
        params: {},
        data: notificationData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONESIGNAL_CONFIG.restApiKey}`
        }
      });

      console.log('📥 Respuesta de OneSignal:', response);

      if (response.status === 200) {
        console.log('✅ Notificación enviada exitosamente');
        return true;
      } else {
        console.error('❌ Error al enviar notificación. Status:', response.status);
        console.error('❌ Respuesta completa:', response);
        return false;
      }
    } catch (error) {
      console.error('❌ Error al enviar notificación:', error);
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

  // Método para verificar el estado de OneSignal
  async checkOneSignalStatus(): Promise<{ initialized: boolean; error?: string }> {
    try {
      if (!Capacitor.isNativePlatform()) {
        return { initialized: false, error: 'No es un dispositivo nativo' };
      }

      // Verificar si OneSignal está disponible
      if (typeof OneSignal === 'undefined') {
        return { initialized: false, error: 'OneSignal no está disponible' };
      }

      // Verificar si está inicializado
      try {
        // Intentar acceder a una propiedad de OneSignal para ver si está inicializado
        const isInitialized = OneSignal.Notifications !== undefined;
        return { initialized: isInitialized };
      } catch (error) {
        return { initialized: false, error: 'OneSignal no está inicializado' };
      }
    } catch (error) {
      return { initialized: false, error: `Error al verificar estado: ${error}` };
    }
  }

  // Método para probar la conexión con la API de OneSignal
  async testOneSignalAPI(): Promise<{ success: boolean; error?: string; response?: any }> {
    try {
      console.log('🧪 Probando conexión con API de OneSignal...');
      
      // Intentar obtener información de la app
      const response = await CapacitorHttp.get({
        url: `https://onesignal.com/api/v1/apps/${ONESIGNAL_CONFIG.appId}`,
        headers: {
          'Authorization': `Basic ${ONESIGNAL_CONFIG.restApiKey}`
        }
      });

      console.log('📥 Respuesta de prueba de API:', response);

      if (response.status === 200) {
        console.log('✅ Conexión con API de OneSignal exitosa');
        return { success: true, response: response.data };
      } else {
        console.error('❌ Error en API de OneSignal. Status:', response.status);
        return { success: false, error: `Status: ${response.status}`, response: response };
      }
    } catch (error) {
      console.error('❌ Error al probar API de OneSignal:', error);
      return { success: false, error: `Error: ${error}` };
    }
  }

    // Método para probar el envío de notificaciones
  async testNotification(): Promise<boolean> {
    console.log('🧪 Iniciando notificación de prueba...');
    
    const testNotification: INotification = {
      title: '🔔 Notificación de Prueba',
      body: 'Esta es una notificación de prueba para verificar que todo funciona correctamente. Fecha: ' + new Date().toLocaleString(),
      date: new Date().toISOString(),
      url: 'https://ionicframework.com'
    };

    console.log('📝 Notificación de prueba creada:', testNotification);
    
    // Usar el método simple primero
    const result = await this.sendSimpleNotification(testNotification);
    
    if (result) {
      console.log('✅ Notificación de prueba enviada exitosamente');
    } else {
      console.log('❌ Falló el envío de la notificación de prueba');
    }
    
    return result;
  }

  // Método simple para enviar notificaciones (sin fecha programada)
  async sendSimpleNotification(notification: INotification): Promise<boolean> {
    try {
      console.log('🚀 Enviando notificación simple...');
      
      const notificationData = {
        app_id: ONESIGNAL_CONFIG.appId,
        included_segments: [NOTIFICATION_SEGMENTS.ALL_SUBSCRIBERS],
        headings: { "en": notification.title },
        contents: { "en": notification.body },
        data: { url: notification.url || 'https://example.com' },
        // Configuraciones básicas para Android
        android_channel_id: ONESIGNAL_CONFIG.defaultChannelId,
        priority: NOTIFICATION_PRIORITIES.NORMAL,
        ttl: NOTIFICATION_TTL.ONE_DAY
      };

      console.log('📤 Datos de notificación simple:', JSON.stringify(notificationData, null, 2));

      const response = await CapacitorHttp.post({
        url: 'https://onesignal.com/api/v1/notifications',
        params: {},
        data: notificationData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONESIGNAL_CONFIG.restApiKey}`
        }
      });

      console.log('📥 Respuesta completa de OneSignal:', response);

      if (response.status === 200) {
        console.log('✅ Notificación simple enviada exitosamente');
        return true;
      } else {
        console.error('❌ Error al enviar notificación simple. Status:', response.status);
        console.error('❌ Respuesta completa:', response);
        return false;
      }
    } catch (error) {
      console.error('❌ Error al enviar notificación simple:', error);
      return false;
    }
  }
}
