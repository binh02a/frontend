import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../models/Job.interface';

@Component({
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrls: ['./job-summary.component.scss']
})
export class JobSummaryComponent implements OnInit {
  @Input() job: Job;
  @Input() idx: any;

  public id: string;
  public refId: string;
  public headerId: string;
  public refHeader: string;

  ngOnInit(): void {
    this.id = `job-${this.idx}`;
    this.refId = `#${this.id}`;
    this.headerId = `header-${this.id}`;
    this.refHeader = `#${this.headerId}`;
  }
}
