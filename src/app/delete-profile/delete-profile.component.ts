// Author: Dhruvi Shah
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {

  constructor(private client:HttpClient,private router: Router,private authentocationService: AuthenticationService) { }

  ngOnInit() {
    if(this.authentocationService.isUserLoggedIn())
    {
      let userid = sessionStorage.getItem('userid')
      this.client.get("https://webbackendnotesbuddy.herokuapp.com/deleteUserbyId?userId=" + userid)
      .subscribe((data:any)=>{
        if(data.status !=404)
        {
          alert("Deleted Successfully")
          this.authentocationService.logOut();
          this.router.navigate(['']);
        }
        else
        {
          alert("Account not deleted")
        }
      })
    }
    else
    {
      this.router.navigate(['']);
    }

 
  }
}
