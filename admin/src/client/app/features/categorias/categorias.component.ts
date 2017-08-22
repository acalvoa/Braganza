import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Category } from '../../classes/category';
import { Image } from '../../classes/image';
import { ImagesService } from '../../shared/images/images.service';
import { CategoriasService } from '../../services/rest/categorias.service';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-categorias',
  templateUrl: 'categorias.component.html',
  styleUrls: ['categorias.component.css'],
})
export class CategoriasComponent {
	private view:string = 'showcase';
	private categorias:Category[];
	private categoria:Category;
  	constructor(private user:UserService, private router: Router, private alert:AlertService, 
  		private image_service:ImagesService, private category_service:CategoriasService) {
    	this.categorias = [];
    	this.fetch();
  	}
  	private fetch(){
  		this.category_service.getCategories().subscribe(
			data => {
				console.log(data);
				this.categorias = data;
			},
			error => {

			}
		);
  	}
  	private addCategory(event:any, name:string, description:string){
  		event.preventDefault();
  		this.categoria.NAME = name;
  		this.categoria.DESCRIPTION = description;
  		this.category_service.addCategory(this.categoria).subscribe(
			data => {
  				this.categorias.push(this.categoria);
  				this.categoria = null;
  				this.view = 'showcase';
			},
			error => {
				this.alert.error(error);
			}
		);
  	} 
  	private backtoshowcase(){
  		this.view = 'showcase';
  	}
  	private createCategory(){
  		this.categoria = new Category();
  		this.view = 'create';
  	}
  	private selectImage(){
  		var self = this;
  		this.image_service.show(function(image:Image){
  			self.categoria.IMAGE = image;
  		});
  	}
  	private deleteImg(){
  		this.categoria.IMAGE = null;
  	}
}
