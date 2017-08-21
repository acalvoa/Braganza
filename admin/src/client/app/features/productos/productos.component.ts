import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Product } from '../../classes/product';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.css'],
})
export class ProductosComponent {
	private products:Product[];
  	constructor(private user:UserService, private router: Router, private alert:AlertService) {
    
  	}
  	
}
