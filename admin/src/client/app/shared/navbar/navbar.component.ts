import { Component, Output, EventEmitter } from '@angular/core';

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
  	constructor() {
    
  	}
  	private togleMenu():void{
  		this.menu = !this.menu;
  	}
  	private togleSidebar():void{
  		this.sidebar.emit();
  	}
}
