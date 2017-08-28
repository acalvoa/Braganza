import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  	private sidebar:boolean = false;
  	constructor() {
    
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
