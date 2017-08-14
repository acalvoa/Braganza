import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'footer-app',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
})

export class FooterComponent implements OnInit{
	ngOnInit() {
	}
}