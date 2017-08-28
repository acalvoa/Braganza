import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  	private sidebar:boolean = false;
  	constructor() {
    
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
