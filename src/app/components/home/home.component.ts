import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {get} from 'lodash';
import {Router} from '@angular/router';
import {Job} from '../../models/Job.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private httpClient: DataService,
    private router: Router,
  ) {}

  public loading: boolean;
  public jobs: Job[] = [];

  ngOnInit(): void {
    this.loading = true;
    this
      .httpClient
      .get('job/offers')
      .pipe(take(1))
      .subscribe((res: any[]) => {
        this.jobs = res || [];
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
  }

  public edit(job: Job): void {
    this
      .router
      .navigate([`/jobs/${job.jobId}/edit`], {
        state: job
      })
      .catch((err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      });
  }
}
