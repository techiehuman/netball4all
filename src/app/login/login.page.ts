import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 private todo: FormGroup;

  constructor(private router: Router, private formBuilder : FormBuilder){

    this.todo = this.formBuilder.group({
      email: new FormControl('email', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password : new FormControl('password', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
   }); 
  }


 /// constructor() { }
  

  ngOnInit() {

    
    
   

  }

  onSubmit(){

   
    
    this.router.navigate(['app/tabs/id-card'])

  }

}
