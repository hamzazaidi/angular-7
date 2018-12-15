import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.styl']
})
export class AddUserFormComponent implements OnInit {

  @Input() userForm: FormGroup;
  @Output() submittedForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  onCancel() {
    this.cancelForm.emit();
  }

  onSubmit() {
    this.submittedForm.emit();
  }

}
