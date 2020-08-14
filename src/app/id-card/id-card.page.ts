import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Player } from '../player';
import { States } from '../states';
import { Season } from '../season';
import { get,set, remove } from '../storage.service';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
  const { PushNotifications } = Plugins;


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

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ' + token.value)
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );

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
