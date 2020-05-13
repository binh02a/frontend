import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ModalModule, BsModalRef} from 'ngx-bootstrap/modal';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './components/signup/signup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SigninComponent} from './components/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopNavigationComponent} from './components/topnav/topNavigation.component';
import {JobSummaryComponent} from './components/job-summary/job-summary.component';
import {JobDetailsComponent} from './components/job-details/job-details.component';
import {DataService} from './services/data.service';
import {CandidateInfoComponent} from './components/candidate-info/candidate-info.component';
import {ProfileComponent} from './components/profile/profile.component';
import {JobEditComponent} from './components/job-edit/job-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    SidebarComponent,
    TopNavigationComponent,
    JobSummaryComponent,
    JobDetailsComponent,
    CandidateInfoComponent,
    ProfileComponent,
    JobEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      newestOnTop: true,
      autoDismiss: true,
      maxOpened: 3,
    }),
  ],
  providers: [BsModalRef, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
