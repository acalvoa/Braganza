import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import { UserService } from './services/user/user.service';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor(private user:UserService) {
    console.log('Environment config', Config);
  }
}
