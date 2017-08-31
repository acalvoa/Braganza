export class User{
	public ID_USER:number;
	public EMAIL:string;
	public NAME:string;
	public LASTNAME:string;
	public PASSWORD:string;
	public FACEBOOK:string;
	public GOOGLE:string;
	public ORDERS:number;
	public SUSCRIPTION: number;

	public parse(user:User){
		this.ID_USER = user.ID_USER;
		this.EMAIL = user.EMAIL;
		this.NAME = user.NAME;
		this.LASTNAME = user.LASTNAME;
		this.FACEBOOK = user.FACEBOOK;
		this.GOOGLE = user.GOOGLE;
	}
}