import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardService } from '../services/user/guard.service';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ConfiguracionesComponent } from './productos/productos.component';
import { VitrinaComponent } from './vitrina/vitrina.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { TemplatesComponent } from './templates/templates.component';

import { ClientesComponent } from './clientes/clientes.component';
import { AdminsComponent } from './admins/admins.component';
import { RolesComponent } from './roles/roles.component';


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
        component: DashboardComponent
      },
      {
        path: 'productos/catalogo',
        component: ProductosComponent
      },
      {
        path: 'productos/vitrina',
        component: VitrinaComponent
      },
      {
        path: 'productos/categorias',
        component: CategoriasComponent
      },
      {
        path: 'productos/templates',
        component: TemplatesComponent
      },
      {
        path: 'users/clientes',
        component: ClientesComponent
      },
      {
        path: 'users/admins',
        component: AdminsComponent
      },
      {
        path: 'users/roles',
        component: RolesComponent
      }
    ],
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
