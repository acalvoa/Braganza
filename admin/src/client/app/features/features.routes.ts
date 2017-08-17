import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardService } from '../services/user/guard.service';
import { AdminsComponent } from './admins/admins.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ConfiguracionesComponent } from './productos/productos.component';
import { VitrinaComponent } from './vitrina/vitrina.component';

export const FeaturesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: ProductosComponent
      },
      {
        path: 'productos',
        component: ProductosComponent
      },
      {
        path: 'vitrina',
        component: VitrinaComponent
      }
    ],
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
