import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RestService } from './rest.service';
import { Role } from '../../classes/role'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolesService {
	private components:any[];
	private roles:Role[];
	//construimos los metodos
	constructor(@Inject (RestService) private rest:RestService) {
		this.roles = null;
		this.components = [];
	}
	public registerComponent(){
		
	}
}
