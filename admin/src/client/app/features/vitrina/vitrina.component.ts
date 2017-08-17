import { Component } from '@angular/core';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-vitrina',
  templateUrl: 'vitrina.component.html',
  styleUrls: ['vitrina.component.css'],
})
export class VitrinaComponent {
  	private sidebar:boolean = false;
  	constructor() {
    
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
