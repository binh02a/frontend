import {Component, OnInit, ViewChild} from '@angular/core';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Token} from './models/Signup.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('signup') public signup: SignupComponent;
  @ViewChild('signin') public signin: SigninComponent;

  constructor(private dataService: DataService, private router: Router, private toastr: ToastrService) {}

  public inAction = false;
  public title = 'GreatJob';

  public openLogin = (email) => {
    this.signin.show(email);
  };

  private navigateToHome() {
    this.inAction = true;

    this
    .router
    .navigate(['/jobs'])
    .catch((err: Error) => {
      this.toastr.error(err.message, 'Something failed');
    });
  }

  public saveSession = (session: Token) => {
    this.dataService.saveSession(session);
    this.navigateToHome();
  };

  public removeToken = () => {
    this.dataService.reset();
    this.inAction = false;
  };

  ngOnInit(): void {
    if (this.dataService.inSession) {
      this.navigateToHome();
    }
  }
}
