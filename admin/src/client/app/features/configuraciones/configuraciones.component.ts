import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-configuraciones',
  templateUrl: 'configuraciones.component.html',
  styleUrls: ['configuraciones.component.css'],
})
export class ConfiguracionesComponent {
  	private sidebar:boolean = false;
  	constructor() {
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
