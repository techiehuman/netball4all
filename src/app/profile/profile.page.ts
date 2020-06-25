import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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


  public onchange  : boolean = false;


  public selectedState:number;

  constructor(private router: Router, private formBuilder : FormBuilder,
    public  restService: RestService, private ref: ChangeDetectorRef){  
      
      
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    $("#profile-pic").attr("src",imageUrl);
      this.pictureData = CameraResultType.Base64;
    //imageElement.src = imageUrl;
  }

  updateProfile(form){
    // debugger;
    if(form.emailaddress == "") {
     this.isSubmitted = false;

    } else {
      this.isSubmitted = true;
    }
     if(this.pictureData != '') {
         form.picture = this.pictureData;
     }
 
     if (!this.isSubmitted) {
       alert("Email Address is empty");
       return false;
     } else {
       this.restService.updateProfile(form.value, this.player.id).subscribe((res)=>{
         if (res.id) {
           this.router.navigate(['app/tabs/id-card'])
         }else {
           alert("Something went wrong");
         }
       });
   
     }
   }

  get errorControl() {
    return this.validations_form.controls;
  }
}
