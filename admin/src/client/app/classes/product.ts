import { Category } from './category';
import { Field } from './field';
import { Template } from './template';
import { Image } from './image';

export class Product{
	public ID_PRODUCT:number;
	public NAME:string;
	public DESCRIPTION:string;
	public TEMPLATE:Template;
	public STOCK:number;
	public FIELDS:Field[];
	public CATEGORIES:Category[];
	public IMAGES:Image[];
	constructor(){
		this.TEMPLATE = new Template();
		this.FIELDS = [];
		this.CATEGORIES = [];
		this.IMAGES = [];
	}
}