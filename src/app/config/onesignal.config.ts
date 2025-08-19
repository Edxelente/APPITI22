export interface OneSignalConfig {
  appId: string;
  restApiKey: string;
  defaultChannelId: string;
  defaultChannelName: string;
  defaultChannelDescription: string;
}

export const ONESIGNAL_CONFIG: OneSignalConfig = {
  appId: '3443b123-590f-4c94-974d-1f0c6b9838ec',
  restApiKey: 'os_v2_app_pm5zb6ss75gmvfnnu7f3tm7qpblc6rmwicfutuumcaaz3da4vgij6rhunfkq3ylf35xd6xh22grhpkvu7lpilp6kxgahxfc22js3a6a',
  defaultChannelId: 'default',
  defaultChannelName: 'Notificaciones Generales',
  defaultChannelDescription: 'Canal para notificaciones generales de la aplicación'
};

export const NOTIFICATION_SEGMENTS = {
  ALL_SUBSCRIBERS: 'Total Subscriptions',
  ACTIVE_USERS: 'Active Users',
  INACTIVE_USERS: 'Inactive Users'
};

export const NOTIFICATION_PRIORITIES = {
  LOW: 5,
  NORMAL: 10,
  HIGH: 15
};

export const NOTIFICATION_TTL = {
  ONE_HOUR: 3600,
  ONE_DAY: 86400,
  THREE_DAYS: 259200,
  ONE_WEEK: 604800
};




