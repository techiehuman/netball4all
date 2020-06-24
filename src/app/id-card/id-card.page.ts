import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';

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



  constructor(public  restService: RestService) {

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

      console.log(this.seasonName)

  });

  this.restService.getStateList().subscribe(response => {
    this.states = response;
    console.log("****")
    console.log(this.states)
    this.stateName = this.restService.getStateName(this.player.state, this.states);

    console.log(this.stateName)

});
   }

  ngOnInit() {
   
  }

}
