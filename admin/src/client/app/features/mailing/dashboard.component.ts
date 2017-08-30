import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';

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
    /* COMPONENT */
    public static NAME:string = 'sd-dashboard';
    public static ID:string = module.id;
    public static PUBLIC_NAME:string = 'Modulo de Dashboard';
    /*           */
  	private sidebar:boolean = false;
  	constructor(private role:RolesService) {
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
