import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()       //pre-defined interface
export class MyAuthGuard implements CanActivate {
    constructor(public router:Router){}
    canActivate(){  //pre-defined methods!
        let obj = sessionStorage.getItem("token");
        if (obj != null){
            return true;
            console.log("success to access page")
        } else {
            this.router.navigate(["login"]);
            return false;
            console.log("failed to retrieve token to pass")
        }
       console.log("Attempted to come here")
        // return true;   //if trues false, cannot go to target page. if returns true, then can access page.
    }
}