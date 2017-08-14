import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  	constructor(private user:UserService, private router: Router, private alert:AlertService) {
    
  	}
  	private login(event:any, user:string, password:string){
  		event.preventDefault();
  		this.user.login(user,password).subscribe(
  			data => {
  				if(data == 200){
  					this.router.navigate(['/dashboard']);
  				}
  				else if(data == 404){
  					this.alert.warning("El usuario no existe");
  				}
  				else if(data == 510){
  					this.alert.warning("La contraseña es incorrecta");
  				}
  			},
  			error => {
  				this.alert.error(error);
  			}
  		);
  	}
}
