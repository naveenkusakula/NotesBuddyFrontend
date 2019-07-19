// Author Name: Sunit Shah
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  username=''
  courses = [];
  //get user from session and the the program ID 
  programId= ''
  constructor(private router:Router,private client:HttpClient,private authentocationService: AuthenticationService ) { }
  ngOnInit() {
    
    if(this.authentocationService.isUserLoggedIn())
    {
      this.username =  sessionStorage.getItem('username')
      this.programId =  sessionStorage.getItem('programid')
      this.client.get("https://webbackendnotesbuddy.herokuapp.com/getCoursesForProgram?programId=" +this.programId)
    .subscribe((data:any)=>{
    this.courses =data.Data;
    });
    }
    else
    {
      this.authentocationService.logOut();
      this.router.navigate(['']);
    }

  }



  redirectToCourse(id,courseName)
  {

   this.router.navigate(['/courseHome'],  {queryParams: {id: id ,courseName :courseName}});
  }
}
