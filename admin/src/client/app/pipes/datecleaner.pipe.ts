import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'datecleaner'})
export class DatecleanerPipe implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/\..*Z/g, '');
    let date = value.split('T');
    let date_seg = date[0].split('-');
    let hour = date[1].split(':');
    let fecha = new Date(parseInt(date_seg[0]),parseInt(date_seg[1]),parseInt(date_seg[2]),parseInt(hour[0]),parseInt(hour[1]),parseInt(hour[2]));
    //return ((fecha.getDate()<10)?'0'+fecha.getDate():fecha.getDate())+'-'+(((fecha.getMonth())<10)?'0'+(fecha.getMonth()):(fecha.getMonth()+1))+'-'+fecha.getFullYear()+' '+(((fecha.getHours()+1)<10)?'0'+(fecha.getHours()+1):(fecha.getHours()+1))+':'+((fecha.getMinutes()<10)?'0'+fecha.getMinutes():fecha.getMinutes())+':'+((fecha.getSeconds()<10)?'0'+fecha.getSeconds():fecha.getSeconds());
    // return ((fecha.getDate()<10)?'0'+fecha.getDate():fecha.getDate())+'-'+(((fecha.getMonth())<10)?'0'+(fecha.getMonth()):(fecha.getMonth()))+'-'+fecha.getFullYear();
  	return date_seg[2]+"-"+date_seg[1]+"-"+date_seg[0];
  }
}
