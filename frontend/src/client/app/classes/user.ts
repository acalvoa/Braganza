export class User{
	public name:string;
	public lastname:string;
	public email:string;
	// INSTACIAMOS EL CONSTRUCTOR
	constructor(data:any = {}){
		if(data.name) this.name = data.name;
		if(data.lastname) this.lastname = data.lastname;
		if(data.email) this.email = data.email;
	}
}