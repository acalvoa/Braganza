import { Injectable} from '@angular/core';
import { Config } from '../../shared/config/env.config';
import {Http, Response, Headers} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ImagesComponent } from './images.component';

@Injectable()
export class ImagesService {
    private image:ImagesComponent;
    public registerLoading(image:ImagesComponent){
      this.image = image;
    }
}
