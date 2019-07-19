// Author: Dhruvi Shah
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  username=''
 // password=''
  courseID=''
  programID=''
  isAdmin=''
  programs = []
  courses = []
  emailID=''
  UpdateProfileForm: FormGroup;
  constructor(private client:HttpClient, private router:Router,private authentocationService: AuthenticationService,private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    if(this.authentocationService.isUserLoggedIn())
    {
      this.client.get("https://webbackendnotesbuddy.herokuapp.com/getPrograms")
      .subscribe((data: any) => {
        if (data.Data != '') {
          this.programs = data.Data
        }
      })

      
      this.courses=[{id: 1, name: 'Sentence 1'},
      {id: 2, name: 'Sentence 2'},
      {id: 3, name: 'Sentence 3'},
      {id: 4, name: 'Sentence 4 '}]

      let userid = sessionStorage.getItem('userid')
      this.client.get("https://webbackendnotesbuddy.herokuapp.com/findUserById?userId="+userid)
      .subscribe((data: any) => {
        if (data.status == 200) {
          this.username= data.Data["name"]    
          this.emailID= data.Data["emailID"]
          this.programID= data.Data["programID"]
        }
        else {
          alert("Please check the detail.")
        }
      });
     }
    else
    {
      this.authentocationService.logOut();
      this.router.navigate(['']);
    }
  }

  createForm() {
    this.UpdateProfileForm = this.fb.group({
      emailID: ['', Validators.required],
      // password: ['', Validators.required],
      // conPassword: ['', Validators.required],
      programID: ['', Validators.required],
      courseID: ['', Validators.required]
    })
  }

  Update()
  {
    alert("In Progress")
  }

}
