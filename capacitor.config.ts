import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'APPITI22Tab',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    OneSignal: {
      mode: "development",
      devTeam: "YOUR_DEVELOPER_TEAM_ID" // Reemplaza con tu Developer Team ID de Apple
    }
  },
};

export default config;
