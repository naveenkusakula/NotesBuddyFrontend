// Author: Dhruvi Shah
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterEvent, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username = ''
  password = ''
  courseID = ''
  programID = ''
  isAdmin = ''
  emailID = ''
  programs = []

  registrationForm: FormGroup;

  constructor(private client: HttpClient, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.client.get("https://webbackendnotesbuddy.herokuapp.com/getPrograms")
      .subscribe((data: any) => {
        if (data.Data != '') {
          this.programs = data.Data
        }
      })
  }

  createForm() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      emailID: ['', Validators.required],
      password: ['', Validators.required],
      programID: ['', Validators.required]
    })
  }

    Register()
    {
        this.client.post("https://webbackendnotesbuddy.herokuapp.com/addUser", { name: this.username, emailID: this.emailID, password: this.password, programID: this.programID, isAdmin: false })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.router.navigate([''])
            }
            else {
              alert("Please check the detail.")
            }
          });
    }
  }

