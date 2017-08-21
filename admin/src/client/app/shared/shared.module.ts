import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './alerts/alerts.component';
import { ImagesModule } from './images/images.module';
import { PipesModule } from '../pipes/pipes.module';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule,NgbModule,ImagesModule, PipesModule],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent,LoadingComponent,
  AlertsComponent],
  exports: [CommonModule, FormsModule, RouterModule,
  NavbarComponent, SidebarComponent, FooterComponent,LoadingComponent, AlertsComponent,PipesModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
