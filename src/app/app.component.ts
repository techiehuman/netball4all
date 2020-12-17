import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { get,set, remove } from './storage.service';
import { Player } from './player';
import { Router } from '@angular/router';
import { Plugins,PushNotification,
  PushNotificationActionPerformed} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.show();
        get("PlayerUser").then((response:Player) => {
          if (response != null && response.id) {

            if(response.approved_for_next_season == 0) {
              this.router.navigate(['app/tabs/register-competition']);
            } else
              this.router.navigate(['app/tabs/id-card']);

          } else if(!window.location.toString().includes("forgot-password")) {

            this.router.navigate(['/']);
          }
      });


      PushNotifications.requestPermission().then( result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          console.log('Push received: ' + JSON.stringify(notification));
  
          var dataObj = notification["data"];
          if (dataObj["type"] && dataObj["type"] == "NewSeason") {
            console.log("dataObj[is_approved] == 0", dataObj["is_approved"] == 0);
            get("PlayerUser").then((response:Player) => {
              response.approved_for_next_season = dataObj["is_approved"];
              remove("PlayerUser");
              set("PlayerUser",response);
                  //data":{"screen":"'Home'","user_id":"10","type":"NewSeason","is_approved":"0"}
                  //this.router.navigate(['app/tabs/id-card']);
                 // this.navCtrl.pop();
                  if (response.approved_for_next_season == 0) {
                    this.navCtrl.navigateRoot('app/tabs/register-competition');            
                  }
                }
            );
          } else {
                let url = this.router.url;
                var dataObj = notification["data"];

                if (url.indexOf("notification") != -1 || (dataObj["type"] && dataObj["type"] == "Notification")) {
                //  this.navCtrl.navigateRoot('app/tabs/notification'); 
                let randomNum = new Date().getMilliseconds();
                this.navCtrl.navigateRoot('app/tabs/notification/'+randomNum);
                } else {
                  console.log("reladong ");
                    window.location.reload();
                }
          }
      });
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));

         //{"actionId":"tap","notification":{"id":"0:1603975178505323%79eecb3579eecb35","data":{"google.delivered_priority":"high","google.sent_time":"1603975178482","google.ttl":"2419200","google.original_priority":"high","screen":"'Home'","user_id":"10","from":"302546325241","type":"NewSeason","is_approved":"0","collapse_key":"com.lyons.netball4all"}}}

          var dataObj = notification["notification"]["data"];
          if (dataObj["type"] && dataObj["type"] == "NewSeason") {
            console.log("dataObj[is_approved] == 0", dataObj["is_approved"] == 0);
            get("PlayerUser").then((response:Player) => {
              response.approved_for_next_season = dataObj["is_approved"];
              remove("PlayerUser");
              set("PlayerUser",response);
                  //data":{"screen":"'Home'","user_id":"10","type":"NewSeason","is_approved":"0"}
                  //this.router.navigate(['app/tabs/id-card']);
                  this.navCtrl.pop();
                  if (response.approved_for_next_season == 0) {
                    this.navCtrl.navigateRoot('app/tabs/register-competition');            
                  }
                }
            );
          } else {
            let randomNum = new Date().getMilliseconds();
            this.router.navigate(['app/tabs/notification/'+randomNum]);
          }
  
        }
      );
    });
  }
}
