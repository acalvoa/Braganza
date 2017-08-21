import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-templates',
  templateUrl: 'templates.component.html',
  styleUrls: ['templates.component.css'],
})
export class TemplatesComponent {
  	constructor(private user:UserService, private router: Router, private alert:AlertService) {
    
  	}
  	
}
