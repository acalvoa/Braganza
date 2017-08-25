import { Product } from './product';
import { Order } from './order';
export class Showcase{
	public ID_SHOWCASE:number;
	public PRODUCT:Product;
	public PRICE:number;
	public STOCK:number;
	public DISCOUNT:number;
	public PUBLISH_DATE:string;
	public ORDERS:Order[];
	constructor(){
		this.PRICE = 0;
		this.DISCOUNT = 0;
		this.ORDERS = [];
	}
	public parse(showcase:Showcase){
		this.ID_SHOWCASE = showcase.ID_SHOWCASE;
		this.PRODUCT = showcase.PRODUCT;
		this.PRICE = showcase.PRICE;
		this.STOCK = showcase.STOCK;
		this.DISCOUNT = showcase.DISCOUNT;
		this.PUBLISH_DATE = showcase.PUBLISH_DATE;
		this.ORDERS = showcase.ORDERS;
	}
}