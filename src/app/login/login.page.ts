import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

public validations_form: FormGroup;
public validation_messages = {};


  constructor(private router: Router, private formBuilder : FormBuilder){
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
   this.validations_form = this.formBuilder.group({
    username: new FormControl('', Validators.compose([
      Validators.maxLength(25),
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.required
    ])),
    password: new FormControl('', Validators.compose([
      Validators.maxLength(25),
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.required
    ]))
    

  });

   this.validation_messages = {
    'username': [
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
  }

  /* this.todo = this.formBuilder.group({
    username: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
    password: ['',Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')],
  }); */
     
  }


 /// constructor() { }
  

  ngOnInit() {

    
    
   

  }

      onSubmit(values){

      
        
        this.router.navigate(['app/tabs/id-card'])

      }

}
