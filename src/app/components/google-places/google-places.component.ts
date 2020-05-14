/// <reference types="@types/googlemaps" />
import {Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['../job-edit/job-edit.component.scss']
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  @Input() init: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;

  ngOnInit(): void {
    this.autocompleteInput = this.init;
  }

  ngAfterViewInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        types: ['geocode']  // 'establishment' / 'address' / 'geocode'
      });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.setAddress.emit(place);
    });
  }
}
