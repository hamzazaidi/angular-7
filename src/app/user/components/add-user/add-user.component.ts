import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.styl']
})
export class AddUserComponent implements OnInit {

  @Output() addUser = new EventEmitter<IUser>();
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id: [ null ],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const first_name: string = this.userForm.controls.first_name.value;
    const last_name: string = this.userForm.controls.last_name.value;
    const avatar: string = this.userForm.controls.avatar.value;
    const user: IUser = {
      first_name,
      last_name,
      avatar,
      isProcessing: false
    };
    this.addUser.emit(user);
  }

  onReset() {
    this.userForm.reset();
  }
}
