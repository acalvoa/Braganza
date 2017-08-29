import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';
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
    /* COMPONENT */
    public static NAME:string = 'sd-home';
    public static ID:string = module.id;
    public static PUBLIC_NAME:string = 'Modulo Home';
    /*           */
  	private sidebar:boolean = false;
  	constructor(private role:RolesService) {
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
