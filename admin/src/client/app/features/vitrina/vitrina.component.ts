import { Component } from '@angular/core';
import { Showcase } from '../../classes/showcase';
import { Product } from '../../classes/product';
import { ShowcaseService } from '../../services/rest/showcase.service';
import { ProductosService } from '../../services/rest/productos.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-vitrina',
  templateUrl: 'vitrina.component.html',
  styleUrls: ['vitrina.component.css'],
})
export class VitrinaComponent {
  private view:string = 'showcase';
  private showcases:Showcase[];
  private productos:Product[];
  private product_showcase:Showcase[];
  private showcase:Showcase;
  private price:number = 0;
  private discount:number = 0;
  constructor(private user:UserService, private router: Router, private alert:AlertService, private vitrina_service:ShowcaseService,
    private product_service:ProductosService) {
    this.showcases = [];
    this.fetch();
  }
  private fetch(){
    this.vitrina_service.getShowcase().subscribe(
      data => {
        this.showcases = data;
        this.product_showcase = data;
      },
      error => {
        this.alert.error(error);
      }
    );
    this.product_service.getProductos().subscribe(
      data => {
        this.productos = data;
      },
      error => {

      }
    );
  }
  private addShowcase(event:any, name:string){
    event.preventDefault();
    this.showcase.NAME = name;
      if(this.view == 'create'){
        this.vitrina_service.addShowcase(this.showcase).subscribe(
          data => {
              this.showcase = null;
              this.view = 'showcase';
          },
          error => {
            this.alert.error(error);
          }
        );
      }
    else if(this.view == 'edit'){
        this.vitrina_service.editShowcase(this.showcase).subscribe(
          data => {
            for(let i=0; i<this.showcases.length;i++){
              if(this.showcases[i].ID_SHOWCASE == this.showcase.ID_SHOWCASE){
                this.showcases[i] = this.showcase;
              }
            }
            this.showcase = null;
            this.view = 'showcase';
          },
          error => {
            this.alert.error(error);
          }
        );
      }
  } 
    private createShowcase(){
        this.showcase = new Showcase();
        this.view = 'create';
        this.final_price = 0;
    }
      private editShowcase(showcase:Showcase){
        this.showcase = new Showcase();
        this.showcase.parse(showcase);
        this.view = 'edit';
      }
  private delete(showcase:Showcase){
    this.vitrina_service.deleteShowcase(showcase).subscribe(
        data => {        
          this.showcase = null;
          this.view = 'showcase';
        },
        error => {
          this.alert.error(error);
        }
      );
  }
  private cloneStock(product:number, stock:any){
        if(product != "-1"){
            for(let i=0;i<this.productos.length;i++){
                if(this.productos[i].ID_PRODUCT == product){
                    stock.value = this.productos[i].STOCK;
                }
            }  
        }
        else
        {
            this.alert.warning("Debe seleccionar un producto");
        }
      
  }
}
