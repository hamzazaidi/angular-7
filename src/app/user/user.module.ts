import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';

import * as fromContaiers from './containers';
import * as fromComponents from './components';
import * as fromServies from './services';

import { LoaderDirective } from '../core/directives/loader.directive';


@NgModule({
  declarations: [
    LoaderDirective,
    ...fromContaiers.containers,
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ...fromServies.services
  ]
})
export class UserModule { }
