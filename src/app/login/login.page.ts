import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import {  set, remove } from '../storage.service';
import { Plugins } from '@capacitor/core';
import { MiscService } from '../misc.service';

const { Keyboard } = Plugins;





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

public validations_form: FormGroup;
public validation_messages = {};
public isSubmitted:boolean = false;



  constructor(private router: Router, private formBuilder : FormBuilder, private restService: RestService, public miscService : MiscService){
  /* this.validations_form = this.formBuilder.group({
      username : new FormControl('username', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password : new FormControl('password', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
   }); */
   

   /*this.validation_messages = {
    'email': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
   }*/

  /* this.todo = this.formBuilder.group({
    username: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
    password: ['',Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')],
  }); */
     
  }


 /// constructor() { }
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  login(form){
   // debugger;
    this.isSubmitted = true;
    if (!this.validations_form.valid) {
      return false;
    } else {
      this.miscService.presentLoading("logging in...");
      this.restService.login(form.value).subscribe((res)=>{
        if (res.id) {
          remove("PlayerUser");
          set("PlayerUser",res);
          this.miscService.dismissLoading();

          this.router.navigate(['app/tabs/id-card'])
        }else {
          alert("Wrong username or password.");
        }
        this.miscService.dismissLoading();
      });
  
    }
  }

  get errorControl() {
    return this.validations_form.controls;
  }
  closeKeyboard() {
    Keyboard.hide();
  }
  returnToForgot=()=>{
    this.router.navigate(['/forgot-password'])

  };

  

}
