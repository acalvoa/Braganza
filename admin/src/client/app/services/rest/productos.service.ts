import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Product } from '../../classes/product'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductosService {
	private productos:Product[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.productos = null;
	}
	public getProductos(){
		if(this.productos == null){
			return this.rest.getMapSilent('/products').map((res:Response) => {
				let response = res.json();
				this.productos = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.productos);
	          observer.complete();
	    });
	}
	public addProducto(product:Product){
		return new Observable(observer => {
	        this.rest.post({
	        	name: product.NAME,
	        	description: product.DESCRIPTION,
	        	images: JSON.stringify(product.IMAGES),
	        	stock: product.STOCK,
	        	categories: JSON.stringify(product.CATEGORIES),
	        	template: product.TEMPLATE.ID_PRODUCT_TEMPLATE,
	        	fields: JSON.stringify(product.FIELDS)
	        },'/products').subscribe(
	          	data => {
	          		this.productos.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editProducto(product:Product){
		return new Observable(observer => {
			var images = [];
			for(let i=0; i<product.IMAGES.length;i++){
				images.push(product.IMAGES[i].ID_IMAGE);
			}
	        this.rest.post({
	        	id: product.ID_PRODUCT,
	        	name: product.NAME,
	        	description: product.DESCRIPTION,
	        	images: images,
	        	stock: product.STOCK,
	        	categories: JSON.stringify(product.CATEGORIES),
	        	template: product.TEMPLATE.ID_PRODUCT_TEMPLATE,
	        	fields: JSON.stringify(product.FIELDS)
	        },'/products/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.productos.length;i++){
			            if(this.productos[i].ID_PRODUCT == data.ID_PRODUCT){
			              this.productos[i] = data;
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
	public deleteProducto(product:Product){
		return new Observable(observer => {
	        this.rest.delete(product.ID_PRODUCT, '/products').subscribe(
	          	data => {
	          		this.productos.splice(this.productos.indexOf(product),1);
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
