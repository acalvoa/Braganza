import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../shared/config/env.config';
@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {
  transform(value:any, args:string[]) : any {
    return Config.API+"/image/"+value;
  }
}
