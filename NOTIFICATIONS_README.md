# Sistema de Notificaciones Push - APPITI22

## Descripción
Esta aplicación utiliza **OneSignal** para enviar notificaciones push a dispositivos móviles. El sistema está configurado para funcionar tanto en Android como en iOS.

## Configuración Actual

### OneSignal
- **App ID**: `3443b123-590f-4c94-974d-1f0c6b9838ec`
- **REST API Key**: `os_v2_app_pm5zb6ss75gmvfnnu7f3tm7qpblc6rmwicfutuumcaaz3da4vgij6rhunfkq3ylf35xd6xh22grhpkvu7lpilp6kxgahxfc22js3a6a`

### Permisos Android
La aplicación solicita los siguientes permisos:
- `INTERNET` - Para conectarse a OneSignal
- `WAKE_LOCK` - Para mantener el dispositivo despierto durante notificaciones
- `VIBRATE` - Para vibración en notificaciones
- `RECEIVE_BOOT_COMPLETED` - Para recibir notificaciones después del reinicio
- `POST_NOTIFICATIONS` - Para mostrar notificaciones (Android 13+)

## Cómo Usar

### 1. Inicialización Automática
Las notificaciones se inicializan automáticamente cuando la aplicación se inicia en `app.component.ts`.

### 2. Página de Prueba
Navega a la pestaña "Notificaciones" para:
- Verificar el estado de los permisos
- Inicializar manualmente las notificaciones
- Enviar notificaciones de prueba
- Enviar notificaciones personalizadas

### 3. Envío de Notificaciones desde el Código

```typescript
import { NotificationService } from './services/notification.service';
import { INotification } from './models/notification.model';

// Crear una notificación
const notification: INotification = {
  title: 'Título de la Notificación',
  body: 'Contenido de la notificación',
  date: new Date().toISOString(),
  url: 'https://ejemplo.com'
};

// Enviar la notificación
const success = await this.notificationService.sendNotification(notification);
```

### 4. Métodos Disponibles

#### `init()`
Inicializa el sistema de notificaciones y solicita permisos.

#### `sendNotification(notification: INotification)`
Envía una notificación a todos los dispositivos suscritos.

#### `testNotification()`
Envía una notificación de prueba predefinida.

#### `getPermissionStatus()`
Obtiene el estado actual de los permisos de notificaciones.

#### `requestPermissions()`
Solicita permisos de notificaciones manualmente.

## Estructura de Archivos

```
src/app/
├── services/
│   └── notification.service.ts      # Servicio principal de notificaciones
├── models/
│   └── notification.model.ts        # Interfaz de notificación
├── config/
│   └── onesignal.config.ts         # Configuración de OneSignal
└── pagina/
    └── notification-test/           # Página de prueba de notificaciones
        ├── notification-test.page.ts
        ├── notification-test.page.html
        ├── notification-test.page.scss
        ├── notification-test.module.ts
        └── notification-test-routing.module.ts
```

## Configuración de OneSignal

### Variables de Entorno
Las credenciales están configuradas en `src/app/config/onesignal.config.ts`:

```typescript
export const ONESIGNAL_CONFIG: OneSignalConfig = {
  appId: 'tu-app-id',
  restApiKey: 'tu-rest-api-key',
  defaultChannelId: 'default',
  defaultChannelName: 'Notificaciones Generales',
  defaultChannelDescription: 'Canal para notificaciones generales'
};
```

### Segmentos Disponibles
- `Total Subscriptions` - Todos los dispositivos suscritos
- `Active Users` - Usuarios activos
- `Inactive Users` - Usuarios inactivos

### Prioridades
- `LOW` (5) - Baja prioridad
- `NORMAL` (10) - Prioridad normal
- `HIGH` (15) - Alta prioridad

### TTL (Time To Live)
- `ONE_HOUR` (3600s) - 1 hora
- `ONE_DAY` (86400s) - 1 día
- `THREE_DAYS` (259200s) - 3 días
- `ONE_WEEK` (604800s) - 1 semana

## Solución de Problemas

### Las notificaciones no llegan
1. Verifica que los permisos estén concedidos
2. Asegúrate de que la app esté en segundo plano
3. Verifica la conexión a internet
4. Revisa los logs de la consola para errores

### Error de permisos
1. Ve a Configuración > Apps > APPITI22 > Notificaciones
2. Asegúrate de que las notificaciones estén habilitadas
3. Verifica que no estén bloqueadas por el sistema

### Error de inicialización
1. Revisa que OneSignal esté configurado correctamente
2. Verifica que las credenciales sean válidas
3. Asegúrate de que la app tenga conexión a internet

## Testing

### 1. Notificación de Prueba
Usa el botón "Enviar Notificación de Prueba" en la página de notificaciones.

### 2. Notificación Personalizada
Usa el botón "Enviar Notificación Personalizada" para enviar una notificación con contenido personalizado.

### 3. Verificación
- Las notificaciones aparecerán en la barra de notificaciones del dispositivo
- Al tocar una notificación, se abrirá la URL especificada en el navegador
- Los logs aparecerán en la consola del navegador

## Notas Importantes

- **Android 13+**: Requiere el permiso `POST_NOTIFICATIONS` explícito
- **OneSignal**: Las notificaciones se envían a todos los dispositivos suscritos
- **URLs**: Asegúrate de que las URLs sean válidas y accesibles
- **Fechas**: Las fechas se procesan en la zona horaria del usuario

## Soporte

Para problemas técnicos o configuraciones adicionales, consulta:
- [Documentación de OneSignal](https://documentation.onesignal.com/)
- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Documentación de Ionic](https://ionicframework.com/docs)




