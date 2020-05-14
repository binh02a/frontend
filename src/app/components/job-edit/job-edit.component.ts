import {DataService} from '../../services/data.service';
import {ChooseRoleComponent} from '../choose-role/choose-role.component';
import {Component, OnInit, ViewChild, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../models/Job.interface';
import {Role} from '../../models/Industry.interface';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {get} from 'lodash';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private httpClient: DataService,
  ) {
    // navigation properties has to be called within constructors
    this.job = this.router.getCurrentNavigation().extras.state as Job || {};
  }

  @ViewChild('chooseRole') public chooseRole: ChooseRoleComponent;
  public job: Job;
  public loading: boolean;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // we save token within data service,
    // url refresh will kill the service, the call will get a 401
    // better to reroute to home page
    if (this.job && this.job.jobId === id) {
      this.job.roleId = this.job.role.roleId;
      return;
    }
  }

  public getRole = (role: Role) => {
    this.job.role = role;
    this.job.roleId = role.roleId;
    this.chooseRole.hide();
  };

  public updateData = () => {
    this.loading = true;
    return this
      .httpClient
      .post(this.job.jobId && `job/edit/${this.job.jobId}` || 'job', this.job)
      .pipe(take(1))
      .subscribe(() => {
        this.toastr.success('Job upserted');
        this.httpClient.get('job').pipe(take(1));
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
  };

  getAddress(place) {
    this.job.workLocation = {
      address: place.formatted_address,
      longitude: get(place, 'geometry.location.lng')(),
      latitude: get(place, 'geometry.location.lat')(),
    };
  }
}
