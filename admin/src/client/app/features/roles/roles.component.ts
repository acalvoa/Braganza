import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Admin } from '../../classes/admin';
import { AdminsService } from '../../services/rest/admins.service';
import { Field } from '../../classes/field';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';
import { Role } from '../../classes/role';
import { ComponentDef } from '../../classes/componentdef';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-roles',
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.css'],
})
export class RolesComponent {
	/* COMPONENT */
    public static NAME:string = 'sd-roles';
    public static ID:string = module.id;
    public static PUBLIC_NAME:string = 'Modulo de Roles';
    /*           */
	private view:string = 'showcase';
	private roles:Role[];
	private roles_showcase:Role[];
	private components:ComponentDef[];
	private rol:Role;
  	constructor(private user:UserService, private router: Router, private alert:AlertService,private roles_service:RolesService,
  		private role:RolesService) {
  		this.roles = [];
    	this.components = this.roles_service.getComponents();
     	this.fetch();
  	}
  	private fetch(){
		this.roles_service.getRoles().subscribe(
	  		data => {
	  			this.roles = data;
	        	this.roles_showcase = data;
	  		},
	  		error => {
	  			this.alert.error(error);
	  		}
	  	);
	}
	private addRole(event:any, name:string){
		event.preventDefault();
		this.rol.NAME = name;
	    if(this.view == 'create'){
	      this.roles_service.addRole(this.rol).subscribe(
	        data => {
	            this.rol = null;
	            this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
		else if(this.view == 'edit'){
	      this.roles_service.editRole(this.rol).subscribe(
	        data => {
	          for(let i=0; i<this.roles.length;i++){
	            if(this.roles[i].ID_ROLE == this.rol.ID_ROLE){
	              this.roles[i] = this.rol;
	            }
	          }
	          this.rol = null;
	          this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
	} 
	private editRole(role:Role){
		this.rol = new Role();
		this.rol.parse(role);
    	this.view = 'edit';
	}
	private delete(role:Role){
		this.roles_service.deleteRole(role).subscribe(
	      data => {        
	        this.rol = null;
	        this.view = 'showcase';
	      },
	      error => {
	        this.alert.error(error);
	      }
	    );
	}
	
	private createRole(){
		this.rol = new Role();
		this.rol.PERMISIONS = this.components;
		this.view = 'create';
	}
	private search_hide(element:any){
	    element.value = '';
	}
	private backtoshowcase(){
		this.view = 'showcase';
	}
	private searchby(value:string){
	    this.roles_showcase = [];
	    if(value==''){
	      this.roles_showcase = this.roles;
	    }
	    else
	    {
	      for(let i=0;i<this.roles.length;i++){
	        if(this.roles[i].NAME.toUpperCase().search(value.toUpperCase()) != -1){
	          this.roles_showcase.push(this.roles[i]);
	        }
	      }
	    }
	}
}
