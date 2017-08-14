import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { MyAuthConfig } from './shared/login/config.auth';
import { FeaturesModule } from './features/features.module';


@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, SharedModule.forRoot(),Ng2UiAuthModule.forRoot(MyAuthConfig),
  ServicesModule, PipesModule, FeaturesModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
