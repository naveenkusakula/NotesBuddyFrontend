// Author: Dhruvi Shah
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  u_password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService,private client:HttpClient) { }

  ngOnInit() {
  }

  checkLogin() {
    this.client.post("https://webbackendnotesbuddy.herokuapp.com/userLogin",{name:this.username,password:this.u_password})
    .subscribe((data:any)=>{
      if (data.status == 200)
    {
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('userid', data.userid)
      sessionStorage.setItem('programid', data.programid)
      this.router.navigate(['/homePage'])
      this.invalidLogin = false
    }
    else
    {
      if (data.status == 401)
      {
        alert("Incorrect Password")
      } 
      this.router.navigate([''])
      this.invalidLogin = true
    }
    })
  }
}
