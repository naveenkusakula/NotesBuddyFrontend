import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authentocationService: AuthenticationService,
    private router: Router,private client:HttpClient) {
}

  ngOnInit() {
    this.authentocationService.logOut();
    this.router.navigate(['']);
  }
}
