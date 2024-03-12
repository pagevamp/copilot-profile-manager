export enum PortalRoutes {
  Messages = 'messages',
  Files = 'files',
  Contracts = 'contracts',
  Forms = 'forms',
  Billing = 'settings.billing',
  Helpdesk = 'helpdesk',
  Profile = 'settings.profile',
  Settings = 'settings',
  Notifications = 'notifications',
}

export type AvailablePortalRoutes = `${PortalRoutes}`; // NOTE: this creates string union of enum values
