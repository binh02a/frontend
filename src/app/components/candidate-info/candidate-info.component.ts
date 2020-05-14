import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from '../../models/Job.interface';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent {
  @Input() candidate: Employee;
  @Input() idx: number;
  @Input() likable = true;
  @Output() liked = new EventEmitter<{
    candidate: Employee;
    idx: number;
  }>();

  public like = () => {
    this.liked.emit({
      candidate: this.candidate,
      idx: this.idx,
    });
  };
}
