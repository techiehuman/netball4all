import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';
import { get,set, remove } from '../storage.service';


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



  constructor(public restService: RestService) {

   
   }

   ngOnInit() {

    console.log('Initializing HomePage');

   
   
  }
  
  ionViewDidEnter() {

    this.restService.getStateList().subscribe(response => {
      remove("states");
      set("states",response);

    });

   // this.restService.getPlayerDetailsById(1).subscribe(response => {
    get("PlayerUser").then((response:Player) => {
      this.player  = response;
    
  

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

  

 

}
