import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {get} from 'lodash';
import {Token} from '../../models/Signup.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  @Output() session = new EventEmitter<Token>();
  @ViewChild('loginModal') public loginModal: ModalDirective;

  public loading = false;
  public email: string;
  public password: string;

  constructor(private toastr: ToastrService, private httpClient: DataService) {}

  public show = (email = '', password = '') => {
    this.email = email;
    this.password = password;

    this.loginModal.show();
  };

  public login = () => {
    this.loading = true;
    return this
      .httpClient
      .post('users/authenticate', {
        email: this.email,
        password: this.password,
      })
      .pipe(take(1))
      .subscribe((session: Token) => {
        this.session.emit(session);
        this.loginModal.hide();
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
  };
}
