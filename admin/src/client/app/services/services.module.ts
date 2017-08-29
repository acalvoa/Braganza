import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './user/user.service';
import { GuardService } from './user/guard.service';
import { RestService } from './rest/rest.service';
import { LoadingService } from './loading/loading.service';
import { AlertService } from './alert/alert.service';
import { CategoriasService } from './rest/categorias.service';
import { TemplatesService } from './rest/templates.service';
import { ProductosService } from './rest/productos.service';
import { ShowcaseService } from './rest/showcase.service';
import { AdminsService } from './rest/admins.service';
import { UsersService } from './rest/users.service';
import { RolesService } from './rest/roles.service';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [],
  declarations: [],
  providers: [RestService, UserService, GuardService, LoadingService, AlertService, CategoriasService, TemplatesService,
  ProductosService, ShowcaseService, AdminsService, UsersService, RolesService],
  exports: []
})
export class ServicesModule {
}
