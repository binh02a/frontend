import {EmployerProfile, Profile} from '../../models/Profile.interface';
import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {get} from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public loading: boolean;
  public id: string;
  public email: string;
  public profile: EmployerProfile = {};

  constructor(private httpClient: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loading = true;

    this
      .httpClient
      .getUserProfile()
      .pipe(take(1))
      .subscribe((res: Profile) => {
        Object.assign(this.profile, res.employerProfile);
        this.id = res.id;
        this.email = res.email;
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
  }

  public updateData = () => {
    this.loading = true;

    return this
    .httpClient
    .post('users/employer', this.profile)
    .pipe(take(1))
    .subscribe((res: Profile) => {
      this.toastr.success('Profile updated');
      this.profile = res.employerProfile || {};
      this.id = res.id;
      this.email = res.email;
    }, (err) => {
      const status = err.statusText || 'Apologize!';
      const message = get(err, 'error.message') || get(err, 'error.title') || 'Something happened ...';

      this.toastr.error(message, status);
    })
    .add(() => {
      this.loading = false;
    });
  };
}
