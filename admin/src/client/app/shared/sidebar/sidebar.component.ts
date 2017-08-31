import { Component, Input } from '@angular/core';
import { RolesService } from '../../services/rest/roles.service';
import { ComponentDef } from '../../classes/componentdef';
import { Role } from '../../classes/role';
import { AdminsService } from '../../services/rest/admins.service';
import { AlertService } from '../../services/alert/alert.service';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent {
	@Input() hidden:boolean;
	private active:string;
  private role:Role;
	private roles:ComponentDef[];
	private permision:any;
	private menu:any[];
  	constructor(private roles_service:RolesService, private admin_service:AdminsService, private alert:AlertService) {
  		this.fetchAdmin();
  	}
  	private makePermisions(){
      this.permision = {};
  		for(let i=0;i<this.roles.length;i++){
  			this.permision[this.roles[i].NAME] = this.roles[i];
  		}
  	}
    private fetchAdmin(){
      this.admin_service.getAdmin().subscribe(
        data =>{
          this.role = data.ROLE;
          this.roles = data.ROLE.PERMISIONS;
          this.makePermisions();
          this.makeMenu();
        },  
        error => {
          this.alert.error(error);
        }
      )
    }
  	private tab(tab:string){
  		if(this.active == tab){
  			this.active = null;
  			return;
  		}
  		this.active = tab;
  	}
  	private validateSection(section:string){
  		for(let i=0;i<this.roles.length;i++){
  			if(this.roles[i].NAME == section){
  				return this.roles[i].AUTH;
  			}
  		}
  		return false;
  	}
  	private makeMenu(){
      this.menu = [];
  		if(this.role.SUPERUSER || (this.permision['sd-dashboard'] && this.permision['sd-dashboard'].AUTH)){
        var dashboard = new Menu('Dashboard','fa-tachometer','/dashboard');
  		  this.menu.push(dashboard);
  		}
      //PRODUCTOS
  		var productos = new Category_menu('Productos','fa-sticky-note-o');
  		if(this.role.SUPERUSER || (this.permision['sd-productos'] && this.permision['sd-productos'].AUTH)) productos.addMenu(new Menu('Catalogo','fa-sticky-note-o','/productos/catalogo'));
  		if(this.role.SUPERUSER || (this.permision['sd-vitrina'] && this.permision['sd-vitrina'].AUTH))productos.addMenu(new Menu('Vitrina','fa-bookmark','/productos/vitrina'));
  		if(this.role.SUPERUSER || (this.permision['sd-categorias'] && this.permision['sd-categorias'].AUTH))productos.addMenu(new Menu('Categorias','fa-bookmark','/productos/categorias'));
  		if(this.role.SUPERUSER || (this.permision['sd-templates'] && this.permision['sd-templates'].AUTH))productos.addMenu(new Menu('Template','fa-file-archive-o','/productos/templates'));
  		if(productos.MENU.length > 0) this.menu.push(productos);
  		//SUSCRIPCIONES
  		var suscripciones = new Category_menu('Suscripciones','fa-puzzle-piece');
  		if(this.role.SUPERUSER || (this.permision['sd-planes'] && this.permision['sd-planes'].AUTH)) suscripciones.addMenu(new Menu('Planes','fa-cubes','/suscription/planes'));
  		if(this.role.SUPERUSER || (this.permision['sd-suscritos'] && this.permision['sd-suscritos'].AUTH)) suscripciones.addMenu(new Menu('Suscritos','fa-address-book-o','/suscription/suscritos'));
  		if(this.role.SUPERUSER || (this.permision['sd-odetrabajo'] && this.permision['sd-odetrabajo'].AUTH)) suscripciones.addMenu(new Menu('O. de Trabajo','fa-book','/suscription/odetrabajo'));
  		if(this.role.SUPERUSER || (this.permision['sd-cobros'] && this.permision['sd-cobros'].AUTH)) suscripciones.addMenu(new Menu('Cobros','fa-money','/productos/cobros'));
  		if(suscripciones.MENU.length > 0) this.menu.push(suscripciones);
  		//PEDIDOS
  		var pedidos = new Category_menu('Pedidos','fa-shopping-bag');
  		if(this.role.SUPERUSER || (this.permision['sd-compras'] && this.permision['sd-compras'].AUTH)) pedidos.addMenu(new Menu('Catalogo','fa-cubes','/pedidos/compras'));
  		if(this.role.SUPERUSER || (this.permision['sd-tbk'] && this.permision['sd-tbk'].AUTH)) pedidos.addMenu(new Menu('Vitrina','fa-address-book-o','/pedidos/transbank'));
  		if(pedidos.MENU.length > 0) this.menu.push(pedidos);
  		//USUARIOS
  		var usuarios = new Category_menu('Usuarios','fa-user-o');
  		if(this.role.SUPERUSER || (this.permision['sd-clientes'] && this.permision['sd-clientes'].AUTH)) usuarios.addMenu(new Menu('Clientes','fa-user-circle','/users/clientes'));
  		if(this.role.SUPERUSER || (this.permision['sd-admins'] && this.permision['sd-admins'].AUTH)) usuarios.addMenu(new Menu('Admins','fa-address-book-o','/users/admins'));
  		if(this.role.SUPERUSER || (this.permision['sd-roles'] && this.permision['sd-roles'].AUTH)) usuarios.addMenu(new Menu('Roles','fa-address-card','/users/roles'));
  		if(usuarios.MENU.length > 0) this.menu.push(usuarios);
  		//CONFIGURACIONES
  		var conf = new Category_menu('Configuraciones','fa-cogs');
  		if(this.role.SUPERUSER || (this.permision['sd-mailing'] && this.permision['sd-mailing'].AUTH)) conf.addMenu(new Menu('Mailing','fa-envelope-o','/config/mailing'));
  		if(this.role.SUPERUSER || (this.permision['sd-general'] && this.permision['sd-general'].AUTH)) conf.addMenu(new Menu('General','fa-cog','/config/general'));
  		if(conf.MENU.length > 0) this.menu.push(conf);
  	}
}
class Menu{
	LINK:string;
	ICON:string;
	NAME:string;
	constructor(name:string, icon:string, link:string){
		this.ICON = icon;
		this.NAME = name;
		this.LINK = link;
	}
}
class Category_menu{
	ICON:string;
	NAME:string;
	MENU:Menu[];
	constructor(name:string, icon:string){
		this.ICON = icon;
		this.NAME = name;
		this.MENU = [];
	}
	public addMenu(menu:Menu){
		this.MENU.push(menu);
	}
}