import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardService } from '../services/user/guard.service';
import { AdminsComponent } from './admins/admins.component';
import { LoginComponent } from './login/login.component';

export const FeaturesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    children: [
        
    ],
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
