import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { IListResponse } from '../../models/listResponse';
import { AddUserComponent } from '../../components/add-user/add-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  @ViewChild(AddUserComponent) addUserComponent: AddUserComponent;
  usersResponse: IUser [];
  isLoading = false;
  isAdding = false;
  constructor(
    private dataSvc: DataService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._processRequest();
  }

  onUserSelect(user: IUser) {
    if (user.id) {
      this.router.navigate(['users', user.id]);
    }
  }

  onAddUser(user: IUser) {
    this.isAdding = true;
    this.dataSvc.addUser(user).subscribe(
      (response: IUser) => this.usersResponse = [ ...this.usersResponse, response ],
      (error) => console.log(error),
      () =>  {
        this.isAdding = false;
        this.addUserComponent.onReset();
        this.snackBar.open(`User added`);
      }
    );
  }

  onDeleteUser(user: IUser) {
    user.isProcessing = true;
    this.dataSvc.deleteUser(user.id).subscribe(
      (response: boolean) => this.usersResponse = this.usersResponse.filter(u => u.id !== user.id),
      (error) => console.log(error),
      () => {
        user.isProcessing = false;
        this.snackBar.open(`User Deleted`);
      }
    );
  }

  onEditUser(user: IUser) {
    user.isProcessing = true;
    this.dataSvc.editUser(user).subscribe(
      (response: IUser) => {
        this.usersResponse = this.usersResponse.map((u: IUser) => u.id === response.id ? response : u);
      },
      (error) => console.log(error),
      () => {
        user.isProcessing = true;
        this.snackBar.open(`User Edited`);
      }
    );
  }

  _processRequest(pageNumber: number = 1): void {
    this.isLoading = true;
    this.dataSvc.getUsers(pageNumber).subscribe(
      (response: IUser[]) => this.usersResponse = response,
      (error) => console.log(error),
      () => this.isLoading = false
    );
  }

}
