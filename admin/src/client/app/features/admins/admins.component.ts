import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Admin } from '../../classes/admin';
import { AdminsService } from '../../services/rest/admins.service';
import { Field } from '../../classes/field';
import { Role } from '../../classes/role';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-admins',
  templateUrl: 'admins.component.html',
  styleUrls: ['admins.component.css'],
})
export class AdminsComponent {
	/* COMPONENT */
	public static NAME:string = 'sd-admins';
  	public static ID:string = module.id;
  	public static PUBLIC_NAME:string = 'Modulo Administradores';
	/*           */
	private view:string = 'showcase';
	private admins:Admin[];
	private admins_showcase:Admin[];
	private admin:Admin;
	private roles:Role[];
  	constructor(private user:UserService, private router: Router, private alert:AlertService,private admins_service:AdminsService,
  		private role:RolesService) {
    	this.admins = [];
     	this.fetch();
  	}
  	private fetch(){
		this.admins_service.getAdmins().subscribe(
	  		data => {
	  			this.admins = data;
	        	this.admins_showcase = data;
	  		},
	  		error => {
	  			this.alert.error(error);
	  		}
	  	);
	  	this.role.getRoles().subscribe(
	  		data =>{
	  			this.roles = data;
	  		},
	  		error => {
	  		}
	  	);
	}
	private addAdmin(event:any, name:string, lastname:string, email:string, password:string){
		event.preventDefault();
		this.admin.NAME = name;
		this.admin.LASTNAME = lastname;
		this.admin.EMAIL = email;
	    if(this.view == 'create'){
			this.admin.PASSWORD = password;	
	      	this.admins_service.addAdmin(this.admin).subscribe(
		        data => {
		            this.admin = null;
		            this.view = 'showcase';
		        },
		        error => {
		          this.alert.error(error);
		        }
	      	);
	    }
		else if(this.view == 'edit'){
	      this.admins_service.editAdmin(this.admin).subscribe(
	        data => {
	          for(let i=0; i<this.admins.length;i++){
	            if(this.admins[i].ID_ADMIN == this.admin.ID_ADMIN){
	              this.admins[i] = this.admin;
	            }
	          }
	          this.admin = null;
	          this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
	} 
	private editAdmin(admin:Admin){
		this.admin = new Admin();
		this.admin.parse(admin);
    	this.view = 'edit';
	}
	private delete(admin:Admin){
		this.admins_service.deleteAdmin(admin).subscribe(
	      data => {        
	        this.admin = null;
	        this.view = 'showcase';
	      },
	      error => {
	        this.alert.error(error);
	      }
	    );
	}
	private changeRole(temp:number){
  		for(let i=0; i<this.roles.length; i++){
  			if(this.roles[i].ID_ROLE == temp){
  				this.admin.ROLE = this.roles[i];
  			}
  		}
  	}
	private createAdmin(){
		this.admin = new Admin();
		this.view = 'create';
	}
	private search_hide(element:any){
	    element.value = '';
	}
	private backtoshowcase(){
		this.view = 'showcase';
	}
	private searchby(value:string){
	    this.admins_showcase = [];
	    if(value==''){
	      this.admins_showcase = this.admins;
	    }
	    else
	    {
	      for(let i=0;i<this.admins.length;i++){
	        if(this.admins[i].NAME.toUpperCase().search(value.toUpperCase()) != -1){
	          this.admins_showcase.push(this.admins[i]);
	        }
	      }
	    }
	}
}
