import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Injectable()
export class LoadingService {
	private loading:LoadingComponent;
	private busy:boolean;
	private stack:any[];
	constructor(){
		this.stack = [];
		this.busy = false;
	}
	public registerLoading(obj:LoadingComponent){
		this.loading = obj;
	}
	public show(obj:any){
		this.stack.push(obj);
		this.loading.show();
	}
	public hide(obj:any){
		this.stack.push(obj);
		this.loading.hide();
	}
}
