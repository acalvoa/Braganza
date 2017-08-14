import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardService } from '../services/user/guard.service';
import { ClusterComponent } from './cluster/cluster.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { ControladoresComponent } from './controladores/controladores.component';
import { CronjobsComponent } from './cronjobs/cronjobs.component';
import { EntornosComponent } from './entornos/entornos.component';
import { ModelosComponent } from './modelos/modelos.component';
import { PropertiesComponent } from './properties/properties.component';
import { RutasComponent } from './rutas/rutas.component';
import { ServiciosComponent } from './servicios/servicios.component';

export const FeaturesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
    // canActivate: [GuardService],
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'cluster',
    component: ClusterComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'configuraciones',
    component: ConfiguracionesComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'controladores',
    component: ControladoresComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'cronjobs',
    component: CronjobsComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'entornos',
    component: EntornosComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'modelos',
    component: ModelosComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'properties',
    component: PropertiesComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'rutas',
    component: RutasComponent,
    // canActivate: [GuardService],
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
    // canActivate: [GuardService],
  }
];
