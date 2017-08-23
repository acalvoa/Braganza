import { Component, Inject} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { Product } from '../../classes/product';
import { Category } from '../../classes/category';
import { Template } from '../../classes/template';
import { Image } from '../../classes/image';
import { ImagesService } from '../../shared/images/images.service';
import { ProductosService } from '../../services/rest/productos.service';
import { TemplatesService } from '../../services/rest/templates.service';
import { CategoriasService } from '../../services/rest/categorias.service';
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
	private view:string = 'showcase';
	private productos:Product[];
	private categorias:Category[];
	private templates:Template[];
  	private productos_showcase:Product[];
	private producto:Product;
  	private selected_producto:Product;
	constructor(private user:UserService, private router: Router, private alert:AlertService, 
		private image_service:ImagesService, private products_service:ProductosService,
		private category_service:CategoriasService, private template_service:TemplatesService) {
	  	this.productos = [];
	  	this.fetch();
	}
	private fetch(){
		this.products_service.getProductos().subscribe(
			data => {
				this.productos = data;
	      		this.productos_showcase = data;
			},
			error => {

			}
		);
		this.category_service.getCategories().subscribe(
			data => {
				this.categorias = data;
			},
			error => {

			}
		);
		this.template_service.getTemplates().subscribe(
			data => {
				this.templates = data;
			},
			error => {

			}
		);
	}
	private addProducto(event:any, name:string, description:string){
		event.preventDefault();
		this.producto.NAME = name;
		this.producto.DESCRIPTION = description;
	    if(this.view == 'create'){
	      this.products_service.addProducto(this.producto).subscribe(
	        data => {
	            this.producto = null;
	            this.view = 'showcase';
	        },
	        error => {
	          this.alert.error(error);
	        }
	      );
	    }
		else if(this.view == 'edit'){
	      this.products_service.editProducto(this.producto).subscribe(
	        data => {
	          for(let i=0; i<this.productos.length;i++){
	            if(this.productos[i].ID_PRODUCT == this.producto.ID_PRODUCT){
	              this.productos[i] = this.producto;
	            }
	          }
	          this.producto = null;
	          this.selected_producto = null;
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
	private createProducto(){
		this.producto = new Product();
		this.view = 'create';
	}
	private selectImage(){
		var self = this;
		this.image_service.show(function(image:Image){
			self.producto.IMAGES.push(image);
		});
	}
	private deleteImg(image:Image){
		this.producto.IMAGES.splice(this.producto.IMAGES.indexOf(image),1);
	}
  	private selectCategory(producto:Product){
    	this.selected_producto = producto;
  	}
  	private editCategory(producto:Product){
	    this.producto = producto;
	    this.view = 'edit';
  	}
  	private clean(){
    	this.selected_producto = null;
 	}
  	private delete(producto:Product){
	    this.products_service.deleteProducto(producto).subscribe(
	      data => {        
	        this.producto = null;
	        this.selected_producto = null;
	        this.view = 'showcase';
	      },
	      error => {
	        this.alert.error(error);
	      }
	    );
  	}
  	private changeTemplate(temp:number){
  		for(let i=0; i<this.templates.length; i++){
  			if(this.templates[i].ID_PRODUCT_TEMPLATE == temp){
  				this.producto.TEMPLATE = this.templates[i];
  				this.producto.FIELDS = this.templates[i].FIELDS;
  			}
  		}
  	}
  	private deleteCategory(category:Category){
  		console.log(this.producto.CATEGORIES.indexOf(category));
  		this.producto.CATEGORIES.splice(this.producto.CATEGORIES.indexOf(category),1);
  	}
  	private search_hide(element:any){
    	element.value = '';
  	}
  	private addCategory(categoria:number){
  		this.producto.CATEGORIES.push(this.categorias[categoria]);
  	}
  	private searchby(value:string){
	    this.productos_showcase = [];
	    if(value==''){
	      this.productos_showcase = this.productos;
	    }
	    else
	    {
	      for(let i=0;i<this.productos.length;i++){
	        if(this.productos[i].NAME.toUpperCase().search(value.toUpperCase()) != -1){
	          this.productos_showcase.push(this.productos[i]);
	        }
	      }
	    }
  	}
}
