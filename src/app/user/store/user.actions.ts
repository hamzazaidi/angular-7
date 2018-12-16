import { Action } from '@ngrx/store';
import { IUser } from '../models/user';

export enum UsersActionTypes {
  SelectUser = '[Users] Select User',
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  AddUser = '[Users] Add User',
  AddUserSuccess = '[Users] Add User Success',
  UpdateUser = '[Users] Update User',
  UpdateUserSuccess = '[Users] Update User Success',
  DeleteUser = '[Users] Delete user',
  DeleteUserSuccess = '[Users] Delete user Success',
}

export class SelectUser implements Action {
  readonly type = UsersActionTypes.SelectUser;
  constructor(private payload: IUser) {}
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LoadUsersSuccess;
  constructor(public payload: IUser[]) {}
}

export class AddUser implements Action {
  readonly type = UsersActionTypes.AddUser;
  constructor(public payload: IUser) {}
}

export class AddUserSuccess implements Action {
  readonly type = UsersActionTypes.AddUserSuccess;
  constructor(public payload: IUser) {}
}

export class UpdateUser implements Action {
  readonly type = UsersActionTypes.UpdateUser;
  constructor(public payload: IUser) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UpdateUserSuccess;
  constructor(public payload: IUser) {}
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DeleteUser;
  constructor(public payload: IUser) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DeleteUserSuccess;
  constructor(public payload: number) {}
}


export type UsersActions =
  | SelectUser
  | LoadUsers
  | LoadUsersSuccess
  | UpdateUser
  | UpdateUserSuccess
  | AddUser
  | AddUserSuccess
  | DeleteUser
  | DeleteUserSuccess;
