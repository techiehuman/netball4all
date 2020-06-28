import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { ChangeDetectorRef } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { get,set, remove } from '../storage.service';

const { Keyboard } = Plugins;

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
  public imageFile : File;
  public imageName : string = "";
  public selectedState:number;

  constructor(public router: Router, private formBuilder : FormBuilder,
    public  restService: RestService, private ref: ChangeDetectorRef){  
      
      
  }
  
   ngOnInit() {

   }
   
   ngAfterViewInit() {

    //Lets First Find The States
    this.restService.getStateList().subscribe(response => {
      this.states = response;
        //Lets Fetch the Player Info Now.
       // this.restService.getPlayerDetailsById(1).subscribe(response => {

          get("PlayerUser").then((response:Player) => {
            $("#profile-pic").attr("src",response.picture);

            this.player  = response;
            console.log("state id : "+this.player.state)
            this.selectedState = this.player.state;
            console.log("selectedState: "+this.player.state)

          //console.log(this.player);

          });
          this.isSubmitted = true;
          if(this.player.is_financial == 0) {
            this.financial_status = "Unfinancial";
          } else {
            this.financial_status = "Financial";
          }

          this.restService.getSeasonList().subscribe(response => {
            this.seasons = response;
            
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
      resultType: CameraResultType.DataUrl,
    });
    
    var imageUrl = image.path;
    console.log("imageUrl : "+imageUrl);
    // Can be set to the src of an image now
    $("#profile-pic").attr("src",image.dataUrl);
      this.pictureData = "sss";
     // console.log("mandeep : "+JSON.stringify(image));

      //imageElement.src = imageUrl;

    this.imageName = "profile-"+this.player.registration_number+Date.now()+ '.'+image.format;
    console.log("goldy :"+this.imageName)
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(image.dataUrl);
   console.log(imageBlob);
    //const imageBlob = this.b64toBlob(image.base64String);
     this.imageFile = new File([imageBlob], this.imageName, { type: 'image/'+image.format })
     console.log(this.imageFile)
  }

  updateProfile(form){
    // debugger;
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
   //  debugger;
      console.log("callback response  :"+res);
      if (res.id) {
        remove("PlayerUser");
        set("PlayerUser",res);
        //alert(JSON.stringify(res));
        console.log(res)
        console.log(get("PlayerUser"));
        this.router.navigate(['app/tabs/id-card'])        
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
  dataURItoBlob(dataURI) {
    console.log("NEHA "+dataURI);
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

      console.log("Water : "+byteString)
       // byteString = dataURI
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

 /*b64toBlob  (b64Data, contentType='', sliceSize=512)  {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
 } */

 /*b64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(decodeURIComponent(base64Data));
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
 } */
b64toBlob(imageBase64){
  console.log(" imageBase64 ::::::: "+imageBase64)
  const rawData = window.atob(imageBase64);
const bytes = new Array(rawData.length);
for (var x = 0; x < rawData.length; x++) {
    bytes[x] = rawData.charCodeAt(x);
}
const arr = new Uint8Array(bytes);
return new Blob([arr], {type: 'image/png'});
}

}
