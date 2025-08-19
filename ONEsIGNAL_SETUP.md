# Configuración de OneSignal para Notificaciones Push

## Pasos para Configurar OneSignal

### 1. Configuración en OneSignal Dashboard

1. Ve a [OneSignal.com](https://onesignal.com) y crea una cuenta
2. Crea una nueva aplicación
3. Selecciona "Android" como plataforma
4. Sube tu archivo `google-services.json` (Firebase)
5. Copia el **App ID** y **REST API Key**

### 2. Configuración de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto o usa uno existente
3. Agrega tu aplicación Android
4. Descarga el archivo `google-services.json`
5. Colócalo en `android/app/`

### 3. Configuración de Variables de Entorno

Actualiza los archivos `environment.ts` y `environment.prod.ts` con tus credenciales:

```typescript
export const environment = {
  production: false, // o true para prod
  oneSignalID: 'TU_ONESIGNAL_APP_ID',
  oneSignalRestApi: 'TU_ONESIGNAL_REST_API_KEY'
};
```

### 4. Permisos de Android

Los permisos ya están configurados en `AndroidManifest.xml`:
- `INTERNET`
- `WAKE_LOCK`
- `VIBRATE`
- `RECEIVE_BOOT_COMPLETED`
- `POST_NOTIFICATIONS`

### 5. Configuración de Capacitor

El archivo `capacitor.config.ts` ya está configurado con:
- Plugin de PushNotifications habilitado
- Configuración de OneSignal

### 6. Prueba de Notificaciones

1. Ejecuta la aplicación en tu dispositivo Android
2. Ve a la pestaña "Notificaciones"
3. Solicita permisos
4. Inicializa las notificaciones
5. Envía una notificación de prueba

### 7. Verificación

- Las notificaciones deben aparecer en tu dispositivo
- Los logs en la consola deben mostrar "OneSignal inicializado correctamente"
- El estado de permisos debe cambiar a "granted"

## Solución de Problemas Comunes

### Error: "Plugin de notificaciones push no disponible"
- Asegúrate de que `@capacitor/push-notifications` esté instalado
- Ejecuta `npm install` y `npx cap sync`

### Error: "Permisos denegados"
- Ve a Configuración > Apps > Tu App > Notificaciones
- Habilita las notificaciones manualmente

### Error: "OneSignal no inicializado"
- Verifica que las credenciales en `environment.ts` sean correctas
- Asegúrate de tener conexión a internet

### Las notificaciones no llegan
- Verifica que el dispositivo esté suscrito en OneSignal Dashboard
- Revisa los logs de OneSignal para errores
- Asegúrate de que la app esté en segundo plano o cerrada

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Sincronizar con Capacitor
npx cap sync

# Construir para Android
npx cap build android

# Abrir en Android Studio
npx cap open android
```

## Recursos Adicionales

- [Documentación de OneSignal](https://documentation.onesignal.com/)
- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Guía de Push Notifications](https://capacitorjs.com/docs/apis/push-notifications)
