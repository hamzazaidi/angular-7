import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { Observable } from 'rxjs';
import * as fromRootStore from '../../../store';
import * as fromUsersStore from '../../../store/users/users.reducer';
import * as fromUsersAction from '../../../store/users/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  @ViewChild(AddUserComponent) addUserComponent: AddUserComponent;
  usersResponse$: Observable<IUser []>;
  isLoading$: Observable<boolean>;
  isAdding$: Observable<boolean>;
  constructor(
    private router: Router,
    private store: Store<fromUsersStore.UsersState>
  ) {
    this.usersResponse$ = this.store.pipe(select(fromRootStore.selectAllUsers));
    this.isLoading$ = this.store.pipe(select(fromRootStore.selectUsersIsLoading));
    this.isAdding$ = this.store.pipe(select(fromRootStore.selectUserIsAdding));
  }

  ngOnInit() {
    this.store.dispatch(new fromUsersAction.LoadUsers());
  }

  onUserSelect(user: IUser) {
    if (user.id) {
      this.router.navigate(['users', user.id]);
    }
  }

  onAddUser(user: IUser) {
    this.store.dispatch(new fromUsersAction.AddUser(user));
  }

  onDeleteUser(user: IUser) {
    this.store.dispatch(new fromUsersAction.DeleteUser(user));
  }

  onEditUser(user: IUser) {
    this.store.dispatch(new fromUsersAction.UpdateUser(user));
  }

}
