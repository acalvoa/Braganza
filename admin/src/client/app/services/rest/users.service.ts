import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { User } from '../../classes/user'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
	private users:User[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.users = null;
	}
	public getUsers(){
		if(this.users == null){
			return this.rest.getMapSilent('/users').map((res:Response) => {
				let response = res.json();
				this.users = response;
				return response;
			});
		}
		return new Observable(observer => {
	          observer.next(this.users);
	          observer.complete();
	    });
	}
	public addUser(user:User){
		return new Observable(observer => {
	        this.rest.post({
	        	name: user.NAME,
	        	lastname: user.LASTNAME,
	        	password: user.PASSWORD,
	        	email: user.EMAIL
	        },'/users').subscribe(
	          	data => {
	          		this.users.push(data);
	          		observer.next(data);
	          		observer.complete();
	          	},
	          	error =>{
	          		console.log(error);
	          	}
	        );
	    });
	}
	public editUser(user:User){
		return new Observable(observer => {
	        this.rest.post({
	        	id: user.ID_USER,
	        	name: user.NAME,
	        	lastname: user.LASTNAME,
	        	password: user.PASSWORD,
	        	email: user.EMAIL
	        },'/users/edit').subscribe(
	          	data => {
	          		for(let i=0; i<this.users.length;i++){
			            if(this.users[i].ID_USER == data.ID_USER){
			              this.users[i] = data;
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
	public deleteUser(user:User){
		return new Observable(observer => {
	        this.rest.delete(user.ID_USER, '/users').subscribe(
	          	data => {
	          		this.users.splice(this.users.indexOf(user),1);
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
