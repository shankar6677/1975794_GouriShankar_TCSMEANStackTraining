import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signRef= new FormGroup({
    signF:new FormControl(),
    signL:new FormControl(),
    signUser:new FormControl(),
    signPass:new FormControl()
  });
  msg:string=""
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  storeCredentials(){
    console.log("Storing user information")
    let username1 = this.signRef.get("signUser").value;
    let password1 = this.signRef.get("signPass").value;
    let fname = this.signRef.get("signF").value;
    let lname = this.signRef.get("signL").value;
    console.log("user stored is : ", username1)
    console.log("pass stored is : ", password1)
    console.log("First Name stored is : ", fname)
    console.log("Last Name stored is : ", lname)
    localStorage.setItem('ONLYUSER', JSON.stringify(username1))
    localStorage.setItem('ONLYPASS', JSON.stringify(password1))
    localStorage.setItem('FNAME', JSON.stringify(fname))
    localStorage.setItem('LNAME', JSON.stringify(lname))
    console.log("user & pass have been stored.")
    this.msg = "User information has been registered. Please redirect to login."
  }

  loginClick(){
    console.log("Login Page button clicked");
    this.router.navigate(["login"]);
  }
  
}
