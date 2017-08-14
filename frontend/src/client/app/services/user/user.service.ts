import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Data } from '../../classes/data';
import { Backend } from '../../shared/config/backend.url';
import { Codes } from '../../shared/config/codes';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';
import { LoginComponent } from '../../shared/login/login.component';
import { MyAuthConfig } from '../../shared/login/config.auth';
import { User } from '../../classes/user';
import { UserDependence } from '../../interfaces/user_dependence';
import { RestService } from '../rest/rest.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	// DEFINIMOS LAS VARIABLES
	private user:User = null;
	private components:UserDependence[] = [];
	private last_code:number;
	private status:boolean;
	/*
	@autor: Angelo Calvo A.
	@name: register_component
	CONSTRUCTOR DEL SERVICIO DE USUARIOS. EL SIGUIENTE SERVICIO USA LOS SERVICIOS REST Y 
	LOS COMPONENTES AUTHSERVICES Y ROUTER
	*/
	constructor(@Inject(RestService) private rest:RestService, private auth: AuthService, private router: Router){
		//verificamos si el usuario esta logeado
		this.restore(false).subscribe(
		    data => {
		    	if(data){
		    		console.log('User Logged in platform.');
		    	}
		    },
		    err => console.error(err)
		);
	}
	/*
	@autor: Angelo Calvo A.
	@name: register_component
	
	*/
	public isLoggedReady(){	
		return this.restore(true);
	}
	/*
	@autor: Angelo Calvo A.
	@name: register_component

	*/
	public isLogged(){
		return this.status;
	}
	/*
	@autor: Angelo Calvo A.
	@name: register_component

	*/
	public login(email:string, password:string){
		let self = this;
		return this.rest.postMap({
			EMAIL: email,
			PASSWORD: password
		}, Backend.USER.LOGIN, function(res:Response){
			let response:any = res.json();	
			self.last_code = response.code;		
			if(response.code === Codes.OK){
				self.status = true;
				self.user = new User(response.data);
				self.call_component();
				return true;
			}
			else{
				self.status = false;
	    		return false;
			}
		});
	}
	/*
	@autor: Angelo Calvo A.
	@name: logout

	*/
	public logout(){
		this.user = null;
		this.call_component();
	}
	/*
	@autor: Angelo Calvo A.
	@name: register_component
	METODO PARA QUE LOS COMPONENTES QUE NECESITEN DE CALLBACKS A PARTIR DE LOS PROCESOS DE LOGIN
	PUEDAN REGISTRAR SUS OBJETOS. TODOS LOS OBJETOS REGISTRADOS SERAN LLAMADOS CADA VEZ QUE SE EFECTUE
	EL PROCESO DE LOGIN
	*/
	public register_component(component:UserDependence){
		this.components.push(component);
	}
	/*
	@autor: Angelo Calvo A.
	@name: restore

	*/
	private restore(fallback:boolean){
		let self = this;
		return this.rest.getMap(Backend.USER.RESTORE, function(res:Response){
			let response:any = res.json();
			self.last_code = response.code;		
			if(response.code === Codes.OK){
				self.status = true;
				self.user = new User(response.data);
				self.call_component();
				return true;
			}
			if(fallback) this.router.navigate(['/']);
			return false;
		});
	}
	/*
	@autor: Angelo Calvo A.
	@name: call_component

	*/
	private call_component(){
		for(let i=0; i<this.components.length;i++){
			this.components[i].userCallback();
		}
	}
}
