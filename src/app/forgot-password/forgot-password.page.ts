import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Plugins } from '@capacitor/core';
import * as $ from 'jquery';
//import { $ } from 'protractor';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

public validations_form: FormGroup;
public validation_messages = {};
public emailSent: boolean = false;
public resultMessage:string = "";
public isSubmitted:boolean = false;

  constructor(public router: Router, private formBuilder : FormBuilder, private restService: RestService, formsModule: FormsModule) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      emailaddress: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  forgot(form){
    this.isSubmitted = true;
     if (!this.validations_form.valid) {
       return false;
     } else {
       this.restService.forgotPassword(form.value).subscribe((res)=>{
         console.log(res)
         if (res.status=="success") {
            this.emailSent=true;
            $("#forgot-message").text(res.message+".");
            $("input[name=emailaddress").val("");
           // this.resultMessage = res.message;
         }else {
           alert("Email address does not exist");
         }
       });
   
     }
   }
  get errorControl() {
    return this.validations_form.controls;
  }
  closeKeyboard() {
    Keyboard.hide();
  }
  returnToLogin=()=>{
    this.router.navigate(['/'])

  };


}
