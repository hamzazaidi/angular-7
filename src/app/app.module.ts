import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { metaReducers } from './core/store';
import { reducers, CustomSerializer } from './core/store/router/router.reducer';
import { RouterEffects } from './core/store/router/router.effects';
import { AppComponent } from './core/containers/main/app.component';
import { NavComponent } from './core/components/nav/nav.component';
import { LoadingComponent } from './core/components/loading/loading.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';




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
    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      RouterEffects
    ]),
    StoreRouterConnectingModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  entryComponents: [ LoadingComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
