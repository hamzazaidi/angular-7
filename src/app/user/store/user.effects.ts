import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data/data.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { IUser } from '../models/user';
import * as fromUserActions from './user.actions';


@Injectable({ providedIn: 'root' })
export class UsersEffects {
  @Effect() loadUsers$ = this.actions$.pipe(
    ofType(fromUserActions.UsersActionTypes.LoadUsers),
    switchMap((action: fromUserActions.LoadUsers) =>
      this.userSvc.getUsers()
      .pipe(map((response: IUser[]) => new fromUserActions.LoadUsersSuccess(response)))
    )
  );
  @Effect() addUser$ = this.actions$.pipe(
    ofType(fromUserActions.UsersActionTypes.AddUser),
    switchMap((action: fromUserActions.AddUser) =>
      this.userSvc.addUser(action.payload)
      .pipe(
        map((response: IUser) => new fromUserActions.AddUserSuccess(response)),
        tap(_ => this.snackBar.open(`User added`))
      )
    )
  );
  @Effect() updateUser$ = this.actions$.pipe(
    ofType(fromUserActions.UsersActionTypes.UpdateUser),
    switchMap((action: fromUserActions.UpdateUser) =>
      this.userSvc.editUser(action.payload)
      .pipe(
        map((response: IUser) => new fromUserActions.UpdateUserSuccess(response)),
        tap(_ => this.snackBar.open(`User Edited`))
      )
    )
  );
  @Effect() deleteUser$ = this.actions$.pipe(
    ofType(fromUserActions.UsersActionTypes.DeleteUser),
    switchMap((action: fromUserActions.DeleteUser) =>
      this.userSvc.deleteUser(action.payload.id)
      .pipe(
        map((response: number) => new fromUserActions.DeleteUserSuccess(response)),
        tap(_ => this.snackBar.open(`User Deleted`))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private userSvc: DataService,
    private snackBar: MatSnackBar,
  ) {}
}
