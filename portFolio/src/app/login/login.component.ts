import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRef= new FormGroup({
    username:new FormControl(),
    password:new FormControl()
  })

  msg:string=""

  constructor(public router:Router) { } //Dependency Injection

  ngOnInit(): void {
  }


  signMeUpClick(){
    console.log("Sign up button clicked on login page");
    this.router.navigate(["signUp"]);
  }

  checkUserValid(){
    let username1 = this.loginRef.get("username").value;
    let password1 = this.loginRef.get("password").value;
    console.log("username submitted is : ", username1)
    console.log("password submitted is : ", password1)
    sessionStorage.setItem("token","123");

    console.log("Login creditals submitted on login page")
    var retrieveUser = JSON.parse(localStorage.getItem('ONLYUSER'))
    var retrievePass = JSON.parse(localStorage.getItem('ONLYPASS'))
    console.log("The retrieved session credentials are : ", retrieveUser, retrievePass)
    if (retrieveUser && retrievePass){
      if (username1 == retrieveUser && password1 == retrievePass){
        this.msg == "success!"
        this.router.navigate(["dashboard"]);
        console.log("navigating to dashboard due to successful login")
      } else{
        this.msg = "failed, try again. Incorrect username/password."
      }
    } else {
      this.msg = "Please create an account and then try to login."
    }


    //localStorage.setItem('ONLYUSER', JSON.stringify(username1));
    //localStorage.setItem('ONLYPASS', JSON.stringify(password1))

    
    //retrieve local storage values for username and password and compare to
    //if(user1 == "ravi" && pass1 == "123"){
      //this.msg = "success!"
   // } else {
   //  this.msg = "failed!!"
   //}
  }
}
