import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.styl']
})
export class UserListItemComponent implements OnInit {

  isEditing = false;
  @Input() user: IUser;
  @Output() select = new EventEmitter<IUser>();
  @Output() delete = new EventEmitter<IUser>();
  @Output() edit = new EventEmitter<IUser>();
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: [ this.user.id ],
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      avatar: [this.user.avatar, Validators.required]
    });
  }

  onEdit() {
    this.isEditing = true;
  }

  selectUser(user: IUser) {
    this.select.emit(user);
  }

  deleteUser(user: IUser) {
    this.delete.emit(user);
  }

  onSubmit() {
    const first_name: string = this.userForm.controls.first_name.value;
    const last_name: string = this.userForm.controls.last_name.value;
    const avatar: string = this.userForm.controls.avatar.value;
    this.user.first_name = first_name;
    this.user.last_name = last_name;
    this.user.avatar = avatar;
    this.edit.emit(this.user);
  }

  onCancel() {
    this.isEditing = false;
  }

}
