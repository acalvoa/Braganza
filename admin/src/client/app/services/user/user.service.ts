import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Admin } from '../../classes/admin';

@Injectable()
export class UserService {
	private user:Admin;
	private status:boolean;
	//CONSTRUCTOR
	constructor(private http: Http, private router: Router){

	}
	public isLogged() {
		return false;
	}
	public isLoggedReady() {
		return this.restore(true);
	}
	private restore(fallback:boolean) {
		let header = this.createHeaders();
		return this.http.get(Config.API+'/admin/me', {
	      headers: header,
	      withCredentials: true
	    })
		.map((res:Response) => {
			let response = res.json();
			if(response.RESPONSE === 200) {
				this.user = response.USER;
				this.status = true;
				this.callUserCallback();
				return true;
			}
			if(fallback) this.router.navigate(['/login']);
			return false;
		});
	}
	private createHeaders() {
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return headers;
	}
	private callUserCallback() {

	}
}
