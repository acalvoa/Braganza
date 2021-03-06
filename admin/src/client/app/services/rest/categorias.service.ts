import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Category } from '../../classes/category'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriasService {
	private categorias:Category[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.categorias = null;
	}
	public getCategories(){
		if(this.categorias == null){
			return this.rest.getMapSilent('/categories').map((res:Response) => {
				let response = res.json();
				this.categorias = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.categorias);
	          observer.complete();
	    });
	}
	public addCategory(category:Category){
		return new Observable(observer => {
	        this.rest.post({
	        	name: category.NAME,
	        	description: category.DESCRIPTION,
	        	image: category.IMAGE.ID_IMAGE
	        },'/categories').subscribe(
	          	data => {
	          		this.categorias.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editCategory(category:Category){
		return new Observable(observer => {
	        this.rest.post({
	        	id: category.ID_CATEGORY,
	        	name: category.NAME,
	        	description: category.DESCRIPTION,
	        	image: category.IMAGE.ID_IMAGE
	        },'/categories/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.categorias.length;i++){
			            if(this.categorias[i].ID_CATEGORY == data.ID_CATEGORY){
			              this.categorias[i] = data;
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
	public deleteCategory(category:Category){
		return new Observable(observer => {
	        this.rest.delete(category.ID_CATEGORY, '/categories').subscribe(
	          	data => {
	          		this.categorias.splice(this.categorias.indexOf(category),1);
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
