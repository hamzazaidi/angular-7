import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../models/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.styl']
})
export class UserListComponent implements OnInit {

  constructor() { }
  @Input() users: IUser [];
  @Output() select = new EventEmitter<IUser>();
  @Output() delete = new EventEmitter<IUser>();
  @Output() edit = new EventEmitter<IUser>();
  ngOnInit() {
  }

  selectUser(user: IUser) {
    this.select.emit(user);
  }
  deleteUser(user: IUser) {
    this.delete.emit(user);
  }
  editUser(user: IUser) {
    this.edit.emit(user);
  }

}
