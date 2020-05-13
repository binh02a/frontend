import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../models/Job.interface';
import {ToastrService} from 'ngx-toastr';
import {get} from 'lodash';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  public job: Job;
  public json: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    // navigation properties has to be called within constructors
    this.job = this.router.getCurrentNavigation().extras.state as Job;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // we save token within data service,
    // url refresh will kill the service, the call will get a 401
    // better to reroute to home page
    if (this.job && this.job.jobId === id) {
      this.job.roleId = this.job.role.roleId;
      return;
    }

    this
      .router
      .navigate(['#'])
      .catch((err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      });
  }
}
