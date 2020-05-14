import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {take} from 'rxjs/operators';
import {get} from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {Employee, Job, JobDetails} from '../../models/Job.interface';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpClient: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private jobId: string;
  public job: JobDetails;
  public loading: boolean;

  private getJob = () => {
    this.loading = true;

    this
      .httpClient
      .get(`job/${this.jobId}/details`)
      .pipe(take(1))
      .subscribe((details: JobDetails) => {
        this.job = details;
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
  };

  ngOnInit(): void {
    this.loading = true;
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getJob();
  }

  public edit = (job: Job): void => {
    this
      .router
      .navigate([`/jobs/${job.jobId}/edit`], {
        state: job
      })
      .catch((err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      });
  };

  public liked = (origin: 'matched'|'connections', {candidate, idx}) => {
    // Moving candidate to the new list ahead of time, since liked/ offered screen has no CTA
    if (origin === 'matched') {
      this.job.candidates.available.push(...this.job.candidates.matched.splice(idx, 1));
    } else {
      this.job.candidates.offered.push(...this.job.candidates.liked.splice(idx, 1));
    }

    this
      .httpClient
      .post(`job/${this.jobId}/offer/${candidate.id}`)
      .pipe(take(1))
      .subscribe(() => {
        this.toastr.success('Liked');
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
        this.getJob();
      });
  };
}
