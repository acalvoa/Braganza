export class ComponentDef{
	NAME:string;
	ID:string;
	PUBLIC_NAME:string;
	AUTH:boolean;
	constructor(name:string, id:string,public_name:string, auth:boolean = false){
		this.NAME = name;
		this.ID =  id;
		this.PUBLIC_NAME = public_name;
		this.AUTH = auth;
	}
}