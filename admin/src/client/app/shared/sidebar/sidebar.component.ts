import { Component, Input } from '@angular/core';
import { RolesService } from '../../services/rest/roles.service';
import { ComponentDef } from '../../classes/componentdef';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent {
	@Input() hidden:boolean;
	private active:string;
	private roles:ComponentDef[];
	private menu:
  	constructor(private roles_service:RolesService) {
  		this.roles = this.roles_service.getComponents();
  	}
  	private tab(tab:string){
  		if(this.active == tab){
  			this.active = null;
  			return;
  		}
  		this.active = tab;
  	}
  	private validateSection(section:string){
  		for(let i=0;i<this.roles.length;i++){
  			if(this.roles[i].NAME == section){
  				return this.roles[i].AUTH;
  			}
  		}
  		return false;
  	}
}
class menu{
	
}