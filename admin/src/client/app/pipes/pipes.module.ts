import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { ClpPipe } from './clp.pipe';
import { SafePipe } from './safe.pipe';
import { DatecleanerPipe } from './datecleaner.pipe';

@NgModule({
  imports: [],
  declarations: [KeysPipe, ClpPipe, SafePipe,DatecleanerPipe],
  providers: [],
  exports:[KeysPipe, ClpPipe, SafePipe,DatecleanerPipe]
})

export class PipesModule {
}
