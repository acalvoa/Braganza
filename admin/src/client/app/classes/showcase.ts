import { Product } from './product';
export class Showcase{
	public ID_SHOWCASE:number;
	public PRODUCT:Product;
	public PRICE:number;
	public STOCK:number;
	public DISCOUNT:number;
	public PUBLISH_DATE:string;
	public parse(showcase:Showcase){
		this.ID_SHOWCASE = showcase.ID_SHOWCASE;
		this.PRODUCT = showcase.PRODUCT;
		this.PRICE = showcase.FIELDS;
		this.STOCK = showcase.STOCK;
		this.DISCOUNT = showcase.DISCOUNT;
		this.PUBLISH_DATE = showcase.PUBLISH_DATE;
	}
}