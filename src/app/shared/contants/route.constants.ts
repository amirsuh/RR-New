// src/app/shared/constants.ts

export const API_BASE_URL = 'https://api.example.com';
export const DEFAULT_PAGE_SIZE = 20;
export const APP_TITLE = 'My Angular App';

// Grouped constants
export const ROUTESCONSTANT = {
  HOME: '/home',
  LOGIN: 'login',
  LOGINPATH: './pages/auth/login/login.component',
  LAYOUT : 'layout',
  LAYOUTPATH : '../app/pages/layout/layout/layout.component',
  DASHBOARD:'/dashboard',
  STOCKREPORTID : 'stock-report/:id',
  ANALYTICS: 'analytics',
  USERLISTS: 'user-lists',
  MESSAGES: 'messages',
  SETTINGS: 'settings',
  INWARDOUTWARD: 'invard-outward',
  INWARDENTRY: 'invard-entry',
  INWARDENTRYPATH: './pages/main/invard-entry/invard-entry.component',
  PRODUCTS: 'products',
  PRODUCTSPATH: './pages/main/demo/product/products/products.component',
  UNAUTHORIZED: 'unauthorized'
}
export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER'
}
