import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesComponent } from './images.component';
import { ImagesService } from './images.service';
import { NgUploaderModule } from 'ngx-uploader';
import { PipesModule } from '../../pipes/pipes.module';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, NgUploaderModule, PipesModule],
  declarations: [ImagesComponent],
  providers: [ImagesService],
  exports: [CommonModule, FormsModule, RouterModule, ImagesComponent, PipesModule]
})
export class ImagesModule {
}
