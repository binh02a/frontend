import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {get, omit, pickBy, identity} from 'lodash';
import {DataService} from '../../services/data.service';
import {EmployerForm, SignupPayload} from '../../models/Signup.interface';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  @Output() signedUp = new EventEmitter<string>();

  @ViewChild('employerSignupModal') public employerSignupModal: ModalDirective;
  @ViewChild('employeeSignupModal') public employeeSignupModal: ModalDirective;
  @ViewChild('employerData') public employerData: NgForm;

  constructor(private toastr: ToastrService, private httpClient: DataService) {}

  public loading = false;
  public show = (mode: 'employee' | 'employer' = 'employer') => {
    if (mode === 'employer') {
      this.employerSignupModal.show();
    } else {
      this.employeeSignupModal.show();
    }
  };

  public register = () => {
    this.loading = true;

    // We use ngNativeValidate, only need to compare password here
    const formValue: EmployerForm = this.employerData.form.value;
    const {password, password2} = formValue;
    if (password !== password2) {
      this.toastr.error('Passwords do not match. Please retype');

      return;
    }

    const payload: SignupPayload  = {
      email: formValue.email,
      password: formValue.password,
      userType: 'employer',
      employerProfile: pickBy(omit(formValue, 'email', 'password2', 'password'), identity),
    };

    return this
      .httpClient
      .post('users/signup', payload)
      .pipe(take(1))
      .subscribe(() => {
        this.signedUp.emit(formValue.email);
        this.employerSignupModal.hide();
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
  };
}
