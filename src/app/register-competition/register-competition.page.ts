import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { get,set, remove } from '../storage.service';
import { RestService } from '../rest.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { MiscService } from '../misc.service';
import { Router } from '@angular/router';

 
const { Keyboard } = Plugins;





@Component({
  selector: 'app-register-competition',
  templateUrl: './register-competition.page.html',
  styleUrls: ['./register-competition.page.scss'],
})
export class RegisterCompetitionPage implements OnInit {

  public player: Player = new Player();
  public validations_form: FormGroup;
  public isSubmitted:boolean = false;



  constructor(private formBuilder : FormBuilder, private restService : RestService,public miscService : MiscService,private router: Router) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      teamname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      season: new FormControl('', Validators.compose([
        Validators.required
      ])),
      details: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
}
  ionViewDidEnter() {
    get("PlayerUser").then((response:Player) => {
      this.player  = response;
    });
  }

  get errorControl() {
    return this.validations_form.controls;
  }
  closeKeyboard() {
    Keyboard.hide();
  }

  register(form){
    // debugger;
     this.isSubmitted = true;
     if (!this.validations_form.valid) {
       return false;
     } else {
       this.miscService.presentLoading("updating...");
       this.restService.updatePlayerSeason(this.player.id,form.value, this.callback);
     /* this.restService.updatePlayerSeason2(this.player.id,form.value).subscribe((res)=>{

        if (res.id) {
          remove("PlayerUser");
          set("PlayerUser",res);
          this.miscService.dismissLoading();
          if(res.approved_for_next_season == 0) {
            this.router.navigate(['app/tabs/register-competition']);
          } else
          this.router.navigate(['app/tabs/id-card']);
    
        }else {
          alert("Something went wrong. Please try again..");
        }
        this.miscService.dismissLoading();
      }); */
     }
   }
  callback = ((res) => {

    if (res.id) {
      remove("PlayerUser");
      set("PlayerUser",res);
      this.miscService.dismissLoading();
      if(res.approved_for_next_season == 0) {
        this.router.navigate(['app/tabs/register-competition']);
      } else
      this.router.navigate(['app/tabs/id-card']);

    }else {
      alert("Something went wrong. Please try again..");
    }
    this.miscService.dismissLoading();
    console.log(res);
  });

}
