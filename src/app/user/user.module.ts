import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';

import * as fromContaiers from './containers';
import * as fromComponents from './components';
import * as fromServies from './services';
import { usersReducer } from './store/user.reducer';
import { UsersEffects } from './store/user.effects';

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
    MaterialModule,
    StoreModule.forFeature('usersState', usersReducer),
    EffectsModule.forFeature([
      UsersEffects
    ]),
  ],
  providers: [
    ...fromServies.services
  ]
})
export class UserModule { }
