import {Component, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('logoutModal') public logoutModal: ModalDirective;
  @Output() logout = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit() {
    const menu = this.elementRef.nativeElement.querySelector('.nav--open');
    const open = this.elementRef.nativeElement.querySelector('.navbar--icon');
    const close = this.elementRef.nativeElement.querySelector('.nav--open-icon');

    if (open){
      open.addEventListener('click', () => {
        menu.classList.toggle('close');
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        menu.classList.toggle('close');
      });
    }
  }

  public removeToken() {
    this.logout.emit();
  }
}
