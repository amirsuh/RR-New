import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { StockandreportComponent } from './pages/main/stockandreport/stockandreport.component';
import { AnalyticsComponent } from './pages/main/analytics/analytics.component';
import { UserListComponent } from './pages/main/user-list/user-list.component';
import { MessagesComponent } from './pages/main/messages/messages.component';
import { SettingsComponent } from './pages/main/settings/settings.component';
import { InwardOutwardComponent } from './pages/main/inward-outward/inward-outward.component';
import { roleGuard } from './core/guards/role.guard';
import { UnauthorisedComponent } from './pages/unauthorised/unauthorised.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login page
  {
    path: 'login',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'layout',
    canActivate: [authGuard,roleGuard],
    data: { roles: ['ADMIN', 'MANAGER'] },
    loadComponent: () =>
      import('../app/pages/layout/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        title:'Dashboard',
        component: DashboardComponent,
        data: { roles: ['ADMIN', 'MANAGER'] },
      },
      {
        path: 'stock-report/:id',
        canActivate: [roleGuard],
        component: StockandreportComponent,
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: { roles: ['MANAGER'] },
      },
      {
        path: 'user-lists',
        canActivate: [roleGuard],
        component: UserListComponent,
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'messages',
        component: MessagesComponent,
        data: { roles: ['ADMIN', 'MANAGER'] },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'invard-outward',
        component: InwardOutwardComponent,
        data: { roles: ['MANAGER'] },
      },
      {
        path: 'invard-entry',
        loadComponent: () =>
          import('./pages/main/invard-entry/invard-entry.component'),
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/main/demo/product/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        data: { roles: ['ADMIN', 'MANAGER'] },
      },

      {
        path: 'unauthorized',
        component: UnauthorisedComponent,
      },
    ],
  },
   { path: '**', redirectTo: '/login' },
];
