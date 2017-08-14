import { Route } from '@angular/router';
import { HomeComponent } from './index';
import { GuardService } from '../services/user/guard.service';
// import { MetaGuard } from '@nglibs/meta';

export const FeaturesRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [MetaGuard],
    // data: {
    //   meta: {
    //     title: 'Importaciones Fáciles desde China y USA | ImportClub ★',
    //     description: 'Ahorra hasta un 70% sumándote a nuestras importaciones colaborativas. Compra online y recibe los productos directo a tu casa. ✓ Fácil y seguro. ✓'
    //   }
    // }
  }
];
