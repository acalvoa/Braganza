import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RestService } from './rest/rest.service';
import { GuardService } from './user/guard.service';
import { UserService } from './user/user.service';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  providers: [RestService, GuardService, UserService],
  exports: []
})
export class ServicesModule {
}
