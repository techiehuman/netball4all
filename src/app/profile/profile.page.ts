import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { ChangeDetectorRef } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';




//import { $ } from 'protractor';
import * as $ from 'jquery';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';

const { Camera } = Plugins;

//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
  
})
export class ProfilePage implements OnInit {

  private todo: FormGroup;
  public pageData = {};
  public pageDataStatus = {};
  public player: Player = new Player();
  public states: States[];
  public seasons: Season[];
  public financial_status : string = "";
  public seasonName: string = "";
  


  public onchange  : boolean = false;


  public selectedState:number;

  constructor(private router: Router, private formBuilder : FormBuilder, reactiveFormsModule : ReactiveFormsModule,
    public  restService: RestService, private ref: ChangeDetectorRef){  
      
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
  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
      console.log("detectChanges 1");
      this.restService.getStateList().subscribe(response => {
        this.states = response;
      this.selectedState = this.player.state;

        console.log(this.states)

    });
    },1000)
    
    setTimeout(() => {
      this.ref.markForCheck();
       console.log("selectedState 3 : "+this.selectedState);
      this.onchange = true;
      console.log("markForCheck 2");
     
    },2000)
  }

  ngOnInit() {
   
    this.restService.getPlayerDetailsById(1).subscribe(response => {
      console.log(response)
        this.player = response;
        if(this.player.is_financial == 0) {
          this.financial_status = "Unfinancial";
        } else {
          this.financial_status = "Financial";
        }
    });

    this.restService.getSeasonList().subscribe(response => {
      this.seasons = response;
    this.seasonName = this.restService.getSeasonName(this.player.season_id, this.seasons);

      console.log(this.states)

  });
    

  }
  

}
