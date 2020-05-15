import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JobDetailsComponent} from './components/job-details/job-details.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {JobEditComponent} from './components/job-edit/job-edit.component';

const routes: Routes = [
  {path: 'jobs', component: HomeComponent},
  {path: 'jobs/create', component: JobEditComponent},
  {path: 'jobs/:id', component: JobDetailsComponent},
  {path: 'jobs/:id/edit', component: JobEditComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
