import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
	private menu:boolean = false;
	@Output() sidebar = new EventEmitter();
  	constructor(private user:UserService) {
      
  	}
  	private togleMenu():void{
  		this.menu = !this.menu;
  	}
  	private togleSidebar():void{
  		this.sidebar.emit();
  	}
    private logout(){
      this.user.logout();
    }
}
