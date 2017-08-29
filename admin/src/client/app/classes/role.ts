import { ComponentDef } from './componentdef';
export class Role{
	ID_ROLE:number;
	NAME:string;
	PERMISIONS:ComponentDef[];
	public parse(role:Role){
		this.ID_ROLE = role.ID_ROLE;
		this.NAME = role.NAME;
		this.PERMISIONS = role.PERMISIONS;
	}
}