import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { ChangeDetectorRef } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { get,set, remove } from '../storage.service';
import * as $ from 'jquery';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';
import { MiscService } from '../misc.service';
import { NgZone  } from '@angular/core';

const { Camera } = Plugins;
const { Keyboard } = Plugins;



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
  
})
export class ProfilePage implements OnInit {

  public pageData = {};
  public pageDataStatus = {};
  public player: Player = new Player();
  public states: States[];
  public seasons: Season[];
  public financial_status : string = "";
  public seasonName: string = "";
  public validations_form: FormGroup;
  public validation_messages = {};
  public pictureData : string = "";
  public imageFile : File;
  public imageName : string = "";
  public selectedState:number;

  constructor(public router: Router, private formBuilder : FormBuilder,
    public  restService: RestService, private ref: ChangeDetectorRef,public miscService : MiscService, private zone: NgZone){
      get("states").then((response:[States]) => {
        this.states = new Array();
        this.states = response
      });  
    }
  
   ngOnInit() {
    /*get("states").then((response:[States]) => {
      this.states = response
    }); */
   }
   ngAfterViewInit() { /*ionViewWillEnter() { */
    this.miscService.presentLoading("Loading...");

    this.restService.getStateList().subscribe(response => {
      this.states = response;
  
      get("PlayerUser").then((response:Player) => {
        $("#profile-pic").attr("src",response.picture);
  
        this.player  = response;
        console.log("state id : "+this.player.state)
        this.selectedState = this.player.state;
        console.log("selectedState: "+this.player.state)  
        this.ref.detectChanges();
        
  
      if(this.player.is_financial == 0) {
        this.financial_status = "Unfinancial";
      } else {
        this.financial_status = "Financial";
      }
  
      this.restService.getSeasonList().subscribe(response => {
        this.seasons = response;
        
        this.seasonName = this.restService.getSeasonName(this.player.season_id, this.seasons);
        this.miscService.dismissLoading(); 
      });
  
      });
    });

    //setTimeout(() => {
      // your code
      this.zone.run(() => {
        get("states").then((response:[States]) => {
          this.states = new Array();
          this.states = response;
          this.selectedState = this.player.state;
        });  
      });
     //}, 2000); 
   }

   ionViewDidEnter() {
   }
   /*ngAfterViewInit() {
    console.log("ngAfterViewInit")
    //Lets First Find The States
    this.restService.getStateList().subscribe(response => {
      this.states = response;
        //Lets Fetch the Player Info Now.
       // this.restService.getPlayerDetailsById(1).subscribe(response => {


          //Now Lets Get the Player Season after gettting player Info
         
     // });
    }); 

    
   } */

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
  
    var imageUrl = image.path;

    console.log("")
    console.log(image);
    console.log("dataUrl : "+image.dataUrl);

    console.log("imageUrl : "+imageUrl);
    // Can be set to the src of an image now
    $("#profile-pic").attr("src",image.dataUrl);
      this.pictureData = "image";
      //imageElement.src = imageUrl;
    this.imageName = "profile-"+this.player.registration_number+Date.now()+ '.'+image.format;
    // call method that creates a blob from dataUri
    const imageBlob = this.miscService.dataURItoBlob(image.dataUrl);
     this.imageFile = new File([imageBlob], this.imageName, { type: 'image/'+image.format })
  }

  updateProfile(form){
   
      this.miscService.presentLoading('Please wait...');
     if(this.pictureData != '') {
         form.value.picture = this.imageFile;
         console.log("form.value.picture : "+form.value.picture)
     }
      this.restService.updateProfile(form.value, this.player.id,this.imageName,this.callback);
     //{
     /* this.restService.updateProfileDemo(form.value, this.player.id,this.imageName).then((res:Player) => {
      console.log("res :::"+res)

        if (res.id) {
          remove("PlayerUser");
          set("PlayerUser",res);
          //alert(JSON.stringify(res));
          alert(JSON.stringify(res));
          console.log(res)
          console.log(get("PlayerUser"));
          this.router.navigate(['app/tabs/id-card'])
        }else {
          alert("Something went wrong.");
        }
    }); */
     // }
   }

   callback = ((res) => {
      console.log("callback response  :"+res);
      if (res.id) {
        remove("PlayerUser");
        set("PlayerUser",res);
        console.log(res)
        console.log(get("PlayerUser"));
          this.miscService.dismissLoading();
        this.miscService.showToastMessage('Profile Updated successfully');
       // this.router.navigate(['app/tabs/id-card'])        
      }else {
        alert("Something went wrong.");
      }
   });

  get errorControl() {
    return this.validations_form.controls;
  }

  closeKeyboard() {
    Keyboard.hide();
  }
 
}
