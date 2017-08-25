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
  private price_final:number = 0;
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
  private addShowcase(event:any, product:number, price:number, stock:number, discount: number, publishdate:string){
    event.preventDefault();
    if(stock <= this.productos[product].STOCK && stock != 0){
      this.showcase.PRODUCT = this.productos[product];
      this.showcase.PRICE = price;
      this.showcase.STOCK = stock;
      this.showcase.DISCOUNT = discount;
      this.showcase.PUBLISH_DATE = publishdate;
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
    else{
      this.alert.warning("El producto no tiene suficiente stock.");
    }
    
  }
  private dateconvert(value:string){
    let newValue = value.replace(/\..*Z/g, '');
    let date = value.split('T');
    let date_seg = date[0].split('-');
    return date_seg[0]+"-"+date_seg[1]+"-"+date_seg[2];
  }
  private createShowcase(){
      this.showcase = new Showcase();
      this.view = 'create';
  }
  private editShowcase(showcase:Showcase){
    this.showcase = new Showcase();
    this.showcase.parse(showcase);
    this.price_final = (this.showcase.PRICE)?((this.showcase.DISCOUNT)?this.showcase.PRICE*((100-this.showcase.DISCOUNT)/100):this.showcase.PRICE):0;
    this.view = 'edit';
  }
  private backtoshowcase(){
    this.view = 'showcase';
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
  private setPrice(price:number,discount:number){
    this.price_final = (price)?((discount)?price*((100-discount)/100):price):0;
  }
  private cloneStock(product:number, stock:any){
    if(product != -1){
      stock.value = this.productos[product].STOCK;
    }
    else
    {
      this.alert.warning("Debe seleccionar un producto");
    }
      
  }
  private nopublish(showcase:Showcase){
    let date = new Date(showcase.PUBLISH_DATE.replace("T", " "));
    if(date < (new Date())){
      return false;
    }
    else{
      return true;
    }
  }
  private searchby(value:any){
      this.product_showcase = [];
      if(value==''){
        this.product_showcase = this.showcases;
      }
      else
      {
        for(let i=0;i<this.showcases.length;i++){
          if(this.showcases[i].PRODUCT.NAME.toUpperCase().search(value.toUpperCase()) != -1 || this.showcases[i].ID_SHOWCASE == value){
            this.product_showcase.push(this.showcases[i]);
          }
        }
      }
  }
  private findProduct(product:Product){
    for(let i=0; i<this.productos.length; i++){
      if(product.ID_PRODUCT = this.productos[i].ID_PRODUCT){
        return i;
      }
    }
    return -1;
  }
}
