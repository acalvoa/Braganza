import { Field } from './field';
export class Template{
	public ID_PRODUCT_TEMPLATE:number;
	public NAME:string;
	public FIELDS: Field[];
	constructor(){
		this.FIELDS = [];
	}
	public addField(){
		this.FIELDS.push((new Field()));
	}
	public parse(template:Template){
		this.ID_PRODUCT_TEMPLATE = template.ID_PRODUCT_TEMPLATE;
		this.NAME = template.NAME;
		this.FIELDS = template.FIELDS;
	}
}