import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/rest/users.service';
import { User } from '../../classes/user';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.css'],
})
export class ClientesComponent {
	/* COMPONENT */
	public static NAME:string = 'sd-clientes';
	public static ID:string = module.id;
	public static PUBLIC_NAME:string = 'Modulo de Clientes';
	/*           */
	private view:string = 'showcase';
	private clientes:User[];
	private clientes_showcase:User[];
	private cliente:User;
  	constructor(private user:UserService, private router: Router, private alert:AlertService,private users_service:UsersService,
  		private role:RolesService) {
    	this.clientes = [];
     	this.fetch();
  	}
  	private fetch(){
		this.users_service.getUsers().subscribe(
	  		data => {
	  			this.clientes = data;
	        	this.clientes_showcase = data;
	  		},
	  		error => {
	  			this.alert.error(error);
	  		}
	  	);
	}
	private addTemplate(event:any, name:string){
		event.preventDefault();
		this.cliente.NAME = name;
	    if(this.view == 'create'){
	      this.users_service.addUser(this.cliente).subscribe(
	        data => {
	            this.cliente = null;
	            this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
		else if(this.view == 'edit'){
	      this.users_service.editUser(this.cliente).subscribe(
	        data => {
	          for(let i=0; i<this.clientes.length;i++){
	            if(this.clientes[i].ID_USER == this.cliente.ID_USER){
	              this.clientes[i] = this.cliente;
	            }
	          }
	          this.cliente = null;
	          this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
	} 
	private editTemplate(user:User){
		this.cliente = new User();
		this.cliente.parse(user);
    	this.view = 'edit';
	}
	private delete(user:User){
		this.users_service.deleteUser(user).subscribe(
	      data => {        
	        this.cliente = null;
	        this.view = 'showcase';
	      },
	      error => {
	        this.alert.error(error);
	      }
	    );
	}
	private changePassword(user:User){
  		
  	}
	private search_hide(element:any){
	    element.value = '';
	}
	private backtoshowcase(){
		this.view = 'showcase';
	}
	private searchby(value:string){
	    this.clientes_showcase = [];
	    if(value==''){
	      this.clientes_showcase = this.clientes;
	    }
	    else
	    {
	      for(let i=0;i<this.clientes.length;i++){
	        if(this.clientes[i].NAME.toUpperCase().search(value.toUpperCase()) != -1){
	          this.clientes_showcase.push(this.clientes[i]);
	        }
	      }
	    }
	}
}
