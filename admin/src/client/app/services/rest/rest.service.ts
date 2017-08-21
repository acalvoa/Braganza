import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
	http:Http;
	private blackscreen:any;
	//construimos los metodos
	constructor(http: Http, private router: Router) {
		this.http = http;
	}
	public post(data:any, uri:string) {
		let body:string = '';
		if(this.blackscreen) this.blackscreen.show('Cargando...','rest-service');
		for(let key in data){
			if(data[key] == 0 || (data[key] != null && data[key] != '')){
				if(typeof data[key] == 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.post(Config.API+uri, body, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			this.blackscreen.hide('rest-service');
			return response;
		});
	}
	public postSpecial(data:any, uri:string, header:any) {
		return this.http.post(Config.API+uri, data, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			this.blackscreen.hide('rest-service');
			return response;
		});
	}
	public postMap(data:any, uri:string) {
		let body:string = '';
		for(let key in data){
			if(data[key] == 0 || (data[key] != null && data[key] != '')){
				if(typeof data[key] == 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.post(Config.API+uri, body, {
	      	headers: header,
	      	withCredentials: true
	    });
	}
	// FOR JWT IMPLEMENTATION (FUTURE)
	public get(uri:string) {
		let header = this.createHeaders();
		if(this.blackscreen) this.blackscreen.show('Cargando...','rest-service');
		return this.http.get(Config.API+uri, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			this.blackscreen.hide('rest-service');
			return response;
		});
	}
	public getSilent(uri:string) {
		let header = this.createHeaders();
		return this.http.get(Config.API+uri, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			return response;
		});
	}
	public getMap(uri:string) {
		let header = this.createHeaders();
		return this.http.get(Config.API+uri, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			return response;
		});
	}
	public delete(id:number,uri:string) {
		if(this.blackscreen) this.blackscreen.show('Cargando...','rest-service');
		let header = this.createHeaders();
		return this.http.delete(Config.API+uri+'/'+id, {
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			this.blackscreen.hide('rest-service');
			return response;
		});
	}
	public put(id:number,uri:string, data:any) {
		if(this.blackscreen) this.blackscreen.show('Cargando...','rest-service');
		let body:string = '';
		for(let key in data){
			if(data[key] == 0 || (data[key] != null && data[key] != '')){
				if(typeof data[key] == 'object') data[key] = JSON.stringify(data[key]);
				body += key+`=${data[key]}&`;
			}
		}
		body = body.substring(0,(body.length-1));
		let header = this.createHeaders();
		return this.http.put(Config.API+uri+'/'+id, body,{
	      	headers: header,
	      	withCredentials: true
	    }).map((res:Response) => {
			let response = res.json();
			this.blackscreen.hide('rest-service');
			return response;
		});
	}
	public blackscreen_set(black:any){
		this.blackscreen = black;
	}
	private createHeaders() {
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return headers;
	}
}
