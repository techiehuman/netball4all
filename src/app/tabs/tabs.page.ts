import { Component } from '@angular/core';
import { Player } from '../player';
import { get } from '../storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public player: Player = new Player();
  public idCardEnable : boolean = false;
  public tabName = "";
  public randomDate = 0;

  constructor(private router: Router) {}

  ngOnInit() {

    this.randomDate = new Date().getMilliseconds();
    get("PlayerUser").then((response:Player) => {
      this.player  = response;
      if(this.player.approved_for_next_season == 1) {
          this.idCardEnable = true;
          this.tabName = "id-card";
      } else {
        this.idCardEnable = false;
        this.tabName = "register-competition";
      }

    });
  }

  scanApprovedStatus() {

    get("PlayerUser").then((response:Player) => {
      this.player  = response;
      if(this.player.approved_for_next_season == 1) {
          this.idCardEnable = true;
          this.tabName = "id-card";
      } else {
        this.idCardEnable = false;
        this.tabName = "register-competition";
      }

    });
  }

}
