import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './core/containers/main/app.component';
import { NavComponent } from './core/components/nav/nav.component';
import { LoadingComponent } from './core/components/loading/loading.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [ LoadingComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
