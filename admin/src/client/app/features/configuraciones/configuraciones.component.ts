import { Component } from '@angular/core';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';

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
    /* COMPONENT */
    public static NAME:string = 'sd-configuraciones';
    public static ID:string = module.id;
    public static PUBLIC_NAME:string = 'Modulo de Configuraciones';
    /*           */
  	private sidebar:boolean = false;
  	constructor(private role:RolesService) {
  	}
  	hideSiderbar(){
  		this.sidebar = !this.sidebar;
  	}
  	
}
