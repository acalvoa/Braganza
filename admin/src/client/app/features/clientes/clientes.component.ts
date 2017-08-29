import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Template } from '../../classes/template';
import { TemplatesService } from '../../services/rest/templates.service';
import { Field } from '../../classes/field';
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
	private templates:Template[];
	private templates_showcase:Template[];
	private template:Template;
  	constructor(private user:UserService, private router: Router, private alert:AlertService,private templates_service:TemplatesService,
  		private role:RolesService) {
    	this.templates = [];
     	this.fetch();
  	}
  	private fetch(){
		this.templates_service.getTemplates().subscribe(
	  		data => {
	  			this.templates = data;
	        	this.templates_showcase = data;
	  		},
	  		error => {
	  			this.alert.error(error);
	  		}
	  	);
	}
	private addTemplate(event:any, name:string){
		event.preventDefault();
		this.template.NAME = name;
	    if(this.view == 'create'){
	      this.templates_service.addTemplate(this.template).subscribe(
	        data => {
	            this.template = null;
	            this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
		else if(this.view == 'edit'){
	      this.templates_service.editTemplate(this.template).subscribe(
	        data => {
	          for(let i=0; i<this.templates.length;i++){
	            if(this.templates[i].ID_PRODUCT_TEMPLATE == this.template.ID_PRODUCT_TEMPLATE){
	              this.templates[i] = this.template;
	            }
	          }
	          this.template = null;
	          this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
	} 
	private editTemplate(template:Template){
		this.template = new Template();
		this.template.parse(template);
    	this.view = 'edit';
	}
	private delete(template:Template){
		this.templates_service.deleteTemplate(template).subscribe(
	      data => {        
	        this.template = null;
	        this.view = 'showcase';
	      },
	      error => {
	        this.alert.error(error);
	      }
	    );
	}
	private changeType(value:string, i:number){
		this.template.FIELDS[i].TYPE = value;
	}
	private createTemplate(){
		this.template = new Template();
		this.view = 'create';
	}
	private createField(){
		this.template.addField();
	}
	private search_hide(element:any){
	    element.value = '';
	}
	private backtoshowcase(){
		this.view = 'showcase';
	}
	private searchby(value:string){
	    this.templates_showcase = [];
	    if(value==''){
	      this.templates_showcase = this.templates;
	    }
	    else
	    {
	      for(let i=0;i<this.templates.length;i++){
	        if(this.templates[i].NAME.toUpperCase().search(value.toUpperCase()) != -1){
	          this.templates_showcase.push(this.templates[i]);
	        }
	      }
	    }
	}
	private deleteField(fi:Field){
		console.log(this.template.FIELDS.indexOf(fi));
		this.template.FIELDS.splice(this.template.FIELDS.indexOf(fi),1);
	}
}
