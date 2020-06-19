import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { $ } from 'protractor';
import * as $ from 'jquery';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  styles: ['.radio-icon button{--background: #ffffff; --border-radius: 100%;--box-shadow: 0px 3px 6px #00000029;}'],
})
export class ProfilePage implements OnInit {

  private todo: FormGroup;

  constructor(private router: Router, private formBuilder : FormBuilder, reactiveFormsModule : ReactiveFormsModule){

    $('ion-radio button').addClass('button-radio');
    $('button').addClass('button-radio');

    this.todo = this.formBuilder.group({
      email: new FormControl('firstname', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password : new FormControl('lastname', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
   }); 
  }

  ngOnInit() {
  }

}
