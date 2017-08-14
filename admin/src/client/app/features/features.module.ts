import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClusterComponent } from './cluster/cluster.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { ControladoresComponent } from './controladores/controladores.component';
import { CronjobsComponent } from './cronjobs/cronjobs.component';
import { EntornosComponent } from './entornos/entornos.component';
import { ModelosComponent } from './modelos/modelos.component';
import { PropertiesComponent } from './properties/properties.component';
import { RutasComponent } from './rutas/rutas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosComponent } from './servicios/servicios.component';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule,NgbModule],
  declarations: [HomeComponent,
  ClusterComponent,ConfiguracionesComponent,ControladoresComponent,CronjobsComponent,
  EntornosComponent, ModelosComponent, PropertiesComponent, RutasComponent, ServiciosComponent],
  exports: [CommonModule, FormsModule, RouterModule, HomeComponent,
  ClusterComponent,ConfiguracionesComponent,ControladoresComponent,CronjobsComponent,
  EntornosComponent, ModelosComponent, PropertiesComponent, RutasComponent, ServiciosComponent]
})
export class FeaturesModule {
}
