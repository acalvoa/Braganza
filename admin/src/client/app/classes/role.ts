import { ComponentDef } from './componentdef';
export class Role{
	ID_ROLE:number;
	NAME:string;
	PERMISIONS:ComponentDef[];
	SUPERUSER:boolean;
	public parse(role:Role){
		console.log()
		this.ID_ROLE = role.ID_ROLE;
		this.NAME = role.NAME;
		this.PERMISIONS = role.PERMISIONS;
		this.SUPERUSER = role.SUPERUSER;
	}
}