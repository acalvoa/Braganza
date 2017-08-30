import { Role } from './role';
export class Admin{
	public ID_ADMIN:number;
	public EMAIL:string;
	public NAME:string;
	public PASSWORD:string;
	public LASTNAME:string;
	public ROLE:Role;

	public parse(admin:Admin){
		this.ID_ADMIN = admin.ID_ADMIN;
		this.EMAIL = admin.EMAIL;
		this.NAME = admin.NAME;
		this.LASTNAME = admin.LASTNAME;
		this.ROLE = admin.ROLE;
	}
}