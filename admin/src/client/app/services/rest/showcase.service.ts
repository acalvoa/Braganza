import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Showcase } from '../../classes/showcase'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShowcaseService {
	private showcase:Showcase[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.showcase = null;
	}
	public getShowcase(){
		if(this.showcase == null){
			return this.rest.getMapSilent('/showcase').map((res:Response) => {
				let response = res.json();
				this.showcase = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.showcase);
	          observer.complete();
	    });
	}
	public addShowcase(showcase:Showcase){
		return new Observable(observer => {
	        this.rest.post({
	        	product: showcase.PRODUCT.ID_PRODUCT,
	        	price: showcase.PRICE,
	        	stock: showcase.STOCK,
	        	discount: showcase.DISCOUNT,
	        	publish_date: showcase.PUBLISH_DATE
	        },'/showcase').subscribe(
	          	data => {
	          		data.ORDERS = [];
	          		this.showcase.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editShowcase(showcase:Showcase){
		return new Observable(observer => {
	        this.rest.post({
	        	id: showcase.ID_SHOWCASE,
	        	product: showcase.PRODUCT.ID_PRODUCT,
	        	price: showcase.PRICE,
	        	stock: showcase.STOCK,
	        	discount: showcase.DISCOUNT,
	        	publish_date: showcase.PUBLISH_DATE
	        },'/showcase/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.showcase.length;i++){
			            if(this.showcase[i].ID_SHOWCASE == data.ID_SHOWCASE){
			              this.showcase[i] = data;
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
	public deleteShowcase(showcase:Showcase){
		return new Observable(observer => {
	        this.rest.delete(showcase.ID_SHOWCASE, '/showcase').subscribe(
	          	data => {
	          		this.showcase.splice(this.showcase.indexOf(showcase),1);
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
