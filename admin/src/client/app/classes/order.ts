import { Product } from './product';
import { Showcase } from './showcase';
export class Order{
	public ID_ORDER:number;
	public PRODUCT:Product;
	public SHOWCASE:Showcase;
	public TBK_TRANSACTION:number;
	public USER:number;
	public PUBLISH_DATE:string;
	public parse(showcase:Order){
		this.ID_ORDER = showcase.ID_ORDER;
		this.PRODUCT = showcase.PRODUCT;
		this.SHOWCASE = showcase.SHOWCASE;
		this.TBK_TRANSACTION = showcase.TBK_TRANSACTION;
		this.USER = showcase.USER;
	}
}