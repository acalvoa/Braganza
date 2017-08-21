import { Injectable, Inject} from '@angular/core';
import { Config } from '../../shared/config/env.config';
import {Http, Response, Headers} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ImagesComponent } from './images.component';
import { RestService } from '../../services/rest/rest.service';

@Injectable()
export class ImagesService {
    private image:ImagesComponent;
    constructor(@Inject(RestService) private rest:RestService){

    }
    public registerLoading(image:ImagesComponent){
      this.image = image;
    }
    public getList(){
     	return this.rest.getSilent('/images/list');
    }
    public show(callback:any){
    	this.image.show_container(callback);
    }
}
