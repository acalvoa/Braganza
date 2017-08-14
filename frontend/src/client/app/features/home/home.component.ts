import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'home-app',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit{
	ngOnInit() {
		window.scrollTo(0,0);
	}
}
