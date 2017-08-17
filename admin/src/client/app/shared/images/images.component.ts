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
  private images:string[] = ['1','1','1','1','1','1','1'];
  private image_showcase:string[] = ['1','1','1','1','1','1','1'];
  private pages:number[] = [1,2,3,4,5];
  private page_selected:number = 1;
  //asddasdasdas
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  constructor(private image_service:ImagesService, private alert:AlertService) {
    this.image_service.registerLoading(this);
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
	}
  onUploadOutput(output: UploadOutput): void {
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
      console.log(output);
    }
  }
  startUpload(): void {
    // const event: UploadInput = {
    //   type: 'uploadAll',
    //   url: 'http://ngx-uploader.com/upload',
    //   method: 'POST',
    //   concurrency: 0,
    //   fieldName: 'IMAGE'
    // };

    // this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  private toggleview(){
    this.show = !this.show;
  }
  private paginator(num:number){
    this.page_selected = num;
  }
  private select_image(image:string){
    this.image_op = image;
  }
}
