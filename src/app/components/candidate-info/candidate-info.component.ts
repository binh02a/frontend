import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from '../../models/Job.interface';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent {
  @Input() candidate: Employee;
  @Input() likable = true;
  @Output() liked = new EventEmitter<string>();
}
