import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Category } from '../../classes/category';
import { Image } from '../../classes/image';
import { ImagesService } from '../../shared/images/images.service';
import { CategoriasService } from '../../services/rest/categorias.service';
import { IRegComponent } from '../../classes/iregcomponent';
import { RolesService } from '../../services/rest/roles.service';
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
  /* COMPONENT */
  public static NAME:string = 'sd-categorias';
  public static ID:string = module.id;
  public static PUBLIC_NAME:string = 'Modulo de Categorias';
  /*           */
	private view:string = 'showcase';
	private categorias:Category[];
  private categorias_showcase:Category[];
	private categoria:Category;
  private selected_category:Category;
	constructor(private user:UserService, private router: Router, private alert:AlertService, 
		private image_service:ImagesService, private category_service:CategoriasService, private role:RolesService) {
  	this.categorias = [];
  	this.fetch();
	}
	private fetch(){
		this.category_service.getCategories().subscribe(
		data => {
			this.categorias = data;
      this.categorias_showcase = data;
		},
		error => {

		}
	);
	}
	private addCategory(event:any, name:string, description:string){
		event.preventDefault();
		this.categoria.NAME = name;
		this.categoria.DESCRIPTION = description;
    if(this.view == 'create'){
      this.category_service.addCategory(this.categoria).subscribe(
        data => {
            this.categoria = null;
            this.view = 'showcase';
        },
        error => {
          this.alert.error(error);
        }
      );
    }
		else if(this.view == 'edit'){
      this.category_service.editCategory(this.categoria).subscribe(
        data => {
          for(let i=0; i<this.categorias.length;i++){
            if(this.categorias[i].ID_CATEGORY == this.categoria.ID_CATEGORY){
              this.categorias[i] = this.categoria;
            }
          }
          this.categoria = null;
          this.selected_category = null;
          this.view = 'showcase';
        },
        error => {
          this.alert.error(error);
        }
      );
    }
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
  private selectCategory(category:Category){
    this.selected_category = category;
  }
  private editCategory(category:Category){
    this.categoria = category;
    this.view = 'edit';
  }
  private clean(){
    this.selected_category = null;
  }
  private delete(category:Category){
    this.category_service.deleteCategory(category).subscribe(
      data => {        
        this.categoria = null;
        this.selected_category = null;
        this.view = 'showcase';
      },
      error => {
        this.alert.error(error);
      }
    );
  }
  private search_hide(element:any){
    element.value = '';
  }
  private searchby(value:string){
    this.categorias_showcase = [];
    if(value==''){
      this.categorias_showcase = this.categorias;
    }
    else
    {
      for(let i=0;i<this.categorias.length;i++){
        if(this.categorias[i].NAME.toUpperCase().search(value.toUpperCase()) != -1){
          this.categorias_showcase.push(this.categorias[i]);
        }
      }
    }
  }
}
