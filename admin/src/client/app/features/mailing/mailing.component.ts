import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-mailing',
  templateUrl: 'mailing.component.html',
  styleUrls: ['mailing.component.css'],
})
export class MailingComponent {
    /* COMPONENT */
    public static NAME:string = 'sd-mailing';
    public static ID:string = module.id;
    public static PUBLIC_NAME:string = 'Modulo de Mailing Autogenerados';
    /*           */
  	private sidebar:boolean = false;
  	constructor(private role:RolesService) {
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
