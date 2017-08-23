import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Template } from '../../classes/template'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TemplatesService {
	private templates:Template[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.templates = null;
	}
	public getTemplates(){
		if(this.templates == null){
			return this.rest.getMapSilent('/templates').map((res:Response) => {
				let response = res.json();
				this.templates = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.templates);
	          observer.complete();
	    });
	}
	public addTemplate(template:Template){
		return new Observable(observer => {
	        this.rest.post({
	        	name: template.NAME,
	        	fields: JSON.stringify(template.FIELDS)
	        },'/templates').subscribe(
	          	data => {
	          		this.templates.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editTemplate(template:Template){
		return new Observable(observer => {
	        this.rest.post({
	        	id: template.ID_PRODUCT_TEMPLATE,
	        	name: template.NAME,
	        	fields: JSON.stringify(template.FIELDS)
	        },'/templates/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.templates.length;i++){
			            if(this.templates[i].ID_PRODUCT_TEMPLATE == data.ID_PRODUCT_TEMPLATE){
			              this.templates[i] = data;
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
	public deleteTemplate(template:Template){
		return new Observable(observer => {
	        this.rest.delete(template.ID_PRODUCT_TEMPLATE, '/templates').subscribe(
	          	data => {
	          		this.templates.splice(this.templates.indexOf(template),1);
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
