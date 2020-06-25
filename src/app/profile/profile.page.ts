import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { ChangeDetectorRef } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { get,set, remove } from '../storage.service';




//import { $ } from 'protractor';
import * as $ from 'jquery';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';

const { Camera } = Plugins;



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
  public validations_form: FormGroup;
  public validation_messages = {};
  public isSubmitted = false;
  public pictureData : string = "";
  //const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

  public selectedState:number;

  constructor(private router: Router, private formBuilder : FormBuilder,
    public  restService: RestService, private ref: ChangeDetectorRef){  
      
      
  }
  
   /*savePicture = async (photo: CameraPhoto, fileName: string): Promise<CameraPhoto> => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      path:fileName,
      webPath : photo.webPath,
      format : 'jpeg | png | jpg'
    };
   }; */
  ngOnInit() {

    //Lets First Find The States
    this.restService.getStateList().subscribe(response => {
      this.states = response;
        //Lets Fetch the Player Info Now.
       // this.restService.getPlayerDetailsById(1).subscribe(response => {


          get("PlayerUser").then((response:Player) => {
            this.player  = response;
          console.log(this.player);

          });
          this.isSubmitted = true;
          if(this.player.is_financial == 0) {
            this.financial_status = "Unfinancial";
          } else {
            this.financial_status = "Financial";
          }

          this.restService.getSeasonList().subscribe(response => {
            this.seasons = response;
          this.selectedState = this.player.state;

            this.seasonName = this.restService.getSeasonName(this.player.season_id, this.seasons);
          });

          //Now Lets Get the Player Season after gettting player Info
         
     // });
    });

    
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    $("#profile-pic").attr("src",imageUrl);
      this.pictureData = CameraResultType.Uri;
      alert(this.pictureData)
    //imageElement.src = imageUrl;
  }

  updateProfile(form){
    // debugger;
     if(this.pictureData != '') {
         form.value.picture = this.pictureData;
     }
     
      this.restService.updateProfile(form.value, this.player.id).subscribe((res)=>{
        if (res.id) {
          remove("PlayerUser");
          set("PlayerUser",res);
          alert(JSON.stringify(res));

          this.router.navigate(['app/tabs/id-card'])
        }else {
          alert("Something went wrong.");
        }
      });
   }

  get errorControl() {
    return this.validations_form.controls;
  }

  // async componentDidLoad() {
    
  // }
}
