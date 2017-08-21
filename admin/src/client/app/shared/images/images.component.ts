import { Component, Output, NgZone, EventEmitter} from '@angular/core';
import { ImagesService } from './images.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { AlertService } from '../../services/alert/alert.service';
import { Config } from '../config/env.config';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-images',
  templateUrl: 'images.component.html',
  styleUrls: ['images.component.css'],
})
export class ImagesComponent {
  private view:string = 'showcase';
  private show:boolean = false;
  private image_op:string;
  private images:string[] = [];
  private image_showcase:string[] = [];
  private pages:number[] = [];
  private page_selected:number = 1;
  private api:string;
  private callback:any;
  //asddasdasdas
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  constructor(private image_service:ImagesService, private alert:AlertService) {
    this.image_service.registerLoading(this);
    this.api = Config.API;
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.fetchImages();
	}
  public show_container(callback:any){
    this.show = true;
    this.view = 'showcase';
    this.callback = callback;
  }
  private fetchImages(){
    this.image_service.getList().subscribe(
      data => {
        this.images = data.IMAGES;
        this.orderImages();
      },
      error => {
        this.alert.warning(error);
      });
  }
  private orderImages(){
    var pages = Math.ceil(this.images.length/16);
    this.pages = [];
    for(let i=0; i<pages; i++){
      this.pages.push((i+1));
    }
    this.image_showcase = this.images.slice(0,16);
    this.page_selected = 1;
  }
  private onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      const event: UploadInput = {
        type: 'uploadAll',
        url: Config.API+'/images',
        method: 'POST',
        concurrency: 0,
        fieldName: 'IMAGE'
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      this.images.push(output.file.response.IMAGE);
      this.orderImages();
      this.view = 'showcase';
    }
  }
  private startUpload(): void {
    // const event: UploadInput = {
    //   type: 'uploadAll',
    //   url: 'http://ngx-uploader.com/upload',
    //   method: 'POST',
    //   concurrency: 0,
    //   fieldName: 'IMAGE'
    // };

    // this.uploadInput.emit(event);
  }

  private cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  private removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  private removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  private toggleview(){
    this.show = !this.show;
  }
  private paginator(num:number){
    this.page_selected = num;
    this.image_showcase = this.images.slice(16*(num-1),16*(num));
  }
  private select_image(image:string){
    this.image_op = image;
  }
  private pick(){
    if(!this.callback){
      this.alert.error("Error: No se encuentra asignado un callback");
      return;
    }
    if(!this.image_op){
      this.alert.warning("Debe seleccionar una fotografia");
    }
    else{
      this.callback(this.image_op);
      this.callback = null;
      this.image_op = null;
      this.show = false;
    }
  }
}
