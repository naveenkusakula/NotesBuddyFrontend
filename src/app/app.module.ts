import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CourseHomeComponent,
    RegistrationComponent,// Author: Dhruvi Shah
    LoginComponent,// Author: Dhruvi Shah
    UpdateProfileComponent,// Author: Dhruvi Shah
    LogoutComponent,// Author: Dhruvi Shah
    ForgotpasswordComponent,// Author: Dhruvi Shah
    DeleteProfileComponent// Author: Dhruvi Shah

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
