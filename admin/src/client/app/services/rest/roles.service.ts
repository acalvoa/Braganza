import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Role } from '../../classes/role'; 
import { Observable } from 'rxjs/Observable';
import { ComponentDef } from '../../classes/componentdef';

@Injectable()
export class RolesService {
	private components:ComponentDef[];
	private roles:Role[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.roles = null;
		this.components = [];
	}
	public registerComponent(name:string, id:string, public_name:string){
		this.components.push(new ComponentDef(name,id,public_name));

	}
	public getComponents(){
		return this.components;
	}
	public getRoles(){
		if(this.roles == null){
			return this.rest.getMapSilent('/roles').map((res:Response) => {
				let response = res.json();
				this.roles = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.roles);
	          observer.complete();
	    });
	}
	public addRole(role:Role){
		console.log(role);
		return new Observable(observer => {
	        this.rest.post({
	        	name: role.NAME,
	        	permisions: JSON.stringify(role.PERMISIONS)
	        },'/roles').subscribe(
	          	data => {
	          		data.ORDERS = [];
	          		this.roles.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editRole(role:Role){
		return new Observable(observer => {
	        this.rest.post({
	        	id: role.ID_ROLE,
	        	name: role.NAME,
	        	permisions: JSON.stringify(role.PERMISIONS)
	        },'/roles/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.roles.length;i++){
			            if(this.roles[i].ID_ROLE == data.ID_ROLE){
			              this.roles[i] = data;
			            }
			        }
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public deleteRole(role:Role){
		return new Observable(observer => {
	        this.rest.delete(role.ID_ROLE, '/roles').subscribe(
	          	data => {
	          		this.roles.splice(this.roles.indexOf(role),1);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
}
