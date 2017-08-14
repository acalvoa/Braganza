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
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, SharedModule],
  declarations: [HomeComponent, AdminsComponent, LoginComponent, ProductosComponent, DashboardComponent],
  exports: [CommonModule, FormsModule, RouterModule, HomeComponent,
  AdminsComponent, LoginComponent, ProductosComponent, DashboardComponent]
})
export class FeaturesModule {
}
