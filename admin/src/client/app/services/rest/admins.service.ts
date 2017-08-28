import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Admin } from '../../classes/admin'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminsService {
	private admins:Admin[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.admins = null;
	}
	public getAdmins(){
		if(this.admins == null){
			return this.rest.getMapSilent('/product_admin').map((res:Response) => {
				let response = res.json();
				this.admins = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.admins);
	          observer.complete();
	    });
	}
	public addAdmin(admin:Admin){
		return new Observable(observer => {
	        this.rest.post({
	        	name: admin.NAME,
	        	lastname: admin.LASTNAME,
	        	password: admin.PASSWORD
	        },'/product_admin').subscribe(
	          	data => {
	          		this.admins.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editAdmin(admin:Admin){
		return new Observable(observer => {
	        this.rest.post({
	        	id: admin.ID_PRODUCT_TEMPLATE,
	        	name: admin.NAME,
	        	fields: JSON.stringify(admin.FIELDS)
	        },'/product_admin/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.admins.length;i++){
			            if(this.admins[i].ID_PRODUCT_TEMPLATE == data.ID_PRODUCT_TEMPLATE){
			              this.admins[i] = data;
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
	public deleteAdmin(admin:Admin){
		return new Observable(observer => {
	        this.rest.delete(admin.ID_PRODUCT_TEMPLATE, '/product_admin').subscribe(
	          	data => {
	          		this.admins.splice(this.admins.indexOf(admin),1);
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
