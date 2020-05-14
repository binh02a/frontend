import {Component, OnInit, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {take} from 'rxjs/operators';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {get} from 'lodash';
import {Router, ChildActivationStart} from '@angular/router';
import {Role, Industry} from '../../models/Industry.interface';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss']
})
export class ChooseRoleComponent implements OnInit {
  @Output() newRole = new EventEmitter<Role>();
  @ViewChild('chooseRoleModal') public chooseRoleModal: ModalDirective;
  @Input() idx: any;
  public id: string;
  public refId: string;
  public headerId: string;
  public refHeader: string;

  constructor(
    private toastr: ToastrService,
    private httpClient: DataService,
  ) { }

  public loading: boolean;
  public industries: Industry[] = [];
  public show = () => {
    this.chooseRoleModal.show();
  };

  ngOnInit(): void {
    this.loading = true;
    this
      .httpClient
      .get('roles?reverse=true')
      .pipe(take(1))
      .subscribe((res: Industry[]) => {
        this.industries = res || [];
      }, (err) => {
        this.toastr.error(get(err, 'error.message') || 'Apologize. Something happened ...');
      })
      .add(() => {
        this.loading = false;
      });
    this.id = `industry-${this.idx}`;
    this.refId = `#${this.id}`;
    this.headerId = `header-${this.id}`;
    this.refHeader = `#${this.headerId}`;
  }

  public changeRole(role: Role) {
    this.newRole.emit(role);
  }

  public hide = () => {
    this.chooseRoleModal.hide();
  };
}
