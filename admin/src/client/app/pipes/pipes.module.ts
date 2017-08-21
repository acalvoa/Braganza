import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { ClpPipe } from './clp.pipe';
import { SafePipe } from './safe.pipe';
import { DatecleanerPipe } from './datecleaner.pipe';
import { ImagePipe } from './image.pipe';

@NgModule({
  imports: [],
  declarations: [KeysPipe, ClpPipe, SafePipe,DatecleanerPipe, ImagePipe],
  providers: [],
  exports:[KeysPipe, ClpPipe, SafePipe,DatecleanerPipe, ImagePipe]
})

export class PipesModule {
}
