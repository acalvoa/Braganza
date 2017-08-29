import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminsComponent } from './admins/admins.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ProductosComponent } from './productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VitrinaComponent } from './vitrina/vitrina.component';
import { PipesModule } from '../pipes/pipes.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { TemplatesComponent } from './templates/templates.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RolesComponent } from './roles/roles.component';
import { RolesService } from '../services/rest/roles.service';
import { IRegComponent } from '../classes/iregcomponent';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, SharedModule, FormsModule],
  declarations: [HomeComponent, AdminsComponent, LoginComponent, ProductosComponent, DashboardComponent,
  VitrinaComponent, CategoriasComponent, TemplatesComponent, AdminsComponent, ClientesComponent, RolesComponent],
  exports: [CommonModule, FormsModule, RouterModule, HomeComponent,
  AdminsComponent, LoginComponent, ProductosComponent, DashboardComponent,VitrinaComponent, CategoriasComponent,
  TemplatesComponent, RolesComponent]
})
export class FeaturesModule {
	private comp:any[] = [HomeComponent, AdminsComponent, ProductosComponent, DashboardComponent,
  	VitrinaComponent, CategoriasComponent, TemplatesComponent, AdminsComponent, ClientesComponent, RolesComponent];
	constructor(private roles:RolesService){
		for(let i=0;i<this.comp.length;i++){
			this.roles.registerComponent(this.comp[i].NAME, this.comp[i].ID, this.comp[i].PUBLIC_NAME);
		}
	}
}
