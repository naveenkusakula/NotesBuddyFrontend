// Author: Dhruvi Shah
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (private client:HttpClient){

  }
  authenticate(username, password) {
    var result ;
   this.client.post("https://webbackendnotesbuddy.herokuapp.com/userLogin",{name:username,password:password})
      .subscribe((data:any)=>{
        if (data.status == 200)
      {
        result = true;
      }
      else
      {
        result = false;
        alert(data.Message)
      }
   }) 
   return result;
}

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userid')
  }
}
