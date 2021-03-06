import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';
import { get,set, remove } from '../storage.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.page.html',
  styleUrls: ['./id-card.page.scss'],
})
export class IdCardPage implements OnInit {

  public player: Player = new Player();
  public states: States[];
  public financial_status : string = "";
  public seasonName : String = "";
  public stateName : String = "";
  public seasons: Season[];



  constructor(public restService: RestService,public router: Router,private platform: Platform) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      return;
    });
   }

   ngOnInit() {

    console.log('Initializing HomePage');
    this.loadPlayerData();
   
      
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    console.log("Router : ", this.router.url);

    this.platform.resume.subscribe((res) => {
      console.log('On Resume Called HomePage');
        this.restService.getPlayerDetailsById(this.player.id).subscribe(response => {
          remove("PlayerUser");
          set("PlayerUser",response);
          this.player  = response;
          if(this.player.approved_for_next_season == 0) {
            this.router.navigate(['app/tabs/register-competition']);
          }
        }); 
      });
  }

  ionViewDidEnter() {

    console.log("ionViewDidEnter  called");
    this.restService.getStateList().subscribe(response => {
      remove("states");
      set("states",response);

    });

   // this.restService.getPlayerDetailsById(1).subscribe(response => {
    get("PlayerUser").then((response:Player) => {
      this.player  = response;
      if(this.player.approved_for_next_season == 0) {
        this.router.navigate(['app/tabs/register-competition']);
       }
  

    console.log(this.player)
    if(this.player.is_financial == 0) {
      this.financial_status = "Unfinancial";
    } else {
      this.financial_status = "Financial";
    }

    this.restService.getSeasonList().subscribe(response => {
      this.seasons = response;
      this.seasonName = this.restService.getSeasonName(this.player.season_id, this.seasons);
      console.log(this.seasonName)
    });

    this.restService.getStateList().subscribe(response => {
      this.states = response;
      console.log("****")
      console.log(this.states)
      this.stateName = this.restService.getStateCodeName(this.player.state, this.states);
  
      console.log(this.stateName)
  
    });

    });
       
   // });

    
  }

  loadPlayerData() {
    get("PlayerUser").then((response:Player) => {
      this.player  = response;
     if(this.player.approved_for_next_season == 0) {
      this.router.navigate(['app/tabs/register-competition']);
     }
    });
  }

  

 

}
