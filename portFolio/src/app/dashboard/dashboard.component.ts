import { formatCurrency } from '@angular/common';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 // contact:ContactRef= new ContactRef("hello",123);
  //contact{cName:string, cNumber:number};
  fname = JSON.parse(localStorage.getItem('FNAME'))
  lname = JSON.parse(localStorage.getItem('LNAME'))
  usercontact= JSON.parse(localStorage.getItem('ONLYUSER'))
  con:Contact = new Contact("test", 10);
  contacts:Array<Contact>= new Array();
  contactForm : FormGroup
  constructor(public router:Router,private fb : FormBuilder) {
    this.contactForm = this.fb.group({
      contactName : ['', Validators.required],
      contactNumber : ['', Validators.required]
    })
   // let contact: {cName:string, cNumber:number}[];
  // let usercontact = JSON.parse(localStorage.getItem('ONLYUSER'))
   }

  ngOnInit(): void {
  }

  addContactt(){
    if(this.contactForm.valid){
      this.contacts.push(this.contactForm.value);
      this.contactForm.reset();
      console.log(this.contacts)
    }
  }

  addContact(name, pnumber){
    let cont = new Contact(name, pnumber);
    this.contacts.push(cont);
    console.log("its cliked")
    alert("Reference has been added, please check the list to ensure ths information is accurate.")
    //form.reset();
    //console.log(this.contacts.cName);
  }

  logoutClick(){
    sessionStorage.removeItem("token");
    console.log("Logout button clicked on dashboard page");
    this.router.navigate(["login"]);
  }

}
