import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
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
  private loading:boolean = false;
	constructor() {
  	console.log('Environment config', Config);
	}
  togleLoading(show:boolean){
    this.loading = show;
  }
}
