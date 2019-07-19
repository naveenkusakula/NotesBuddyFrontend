import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseHomeComponent } from './course-home/course-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },//
  { path: 'login', component: LoginComponent },// Author: Dhruvi Shah
{ path: 'logout', component: LogoutComponent },// Author: Dhruvi Shah
{ path: 'registration', component: RegistrationComponent },// Author: Dhruvi Shah
{ path: 'forgetpassword', component: ForgotpasswordComponent },// Author: Dhruvi Shah
{ path: 'updateProfile', component: UpdateProfileComponent },// Author: Dhruvi Shah
{ path: 'deleteProfile', component: DeleteProfileComponent },// Author: Dhruvi Shah
{ path: 'homePage', component: HomepageComponent },// Author: Dhruvi Shah
{ path: 'courseHome', component: CourseHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
