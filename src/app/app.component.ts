import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { get,set, remove } from './storage.service';
import { Player } from './player';
import { Router } from '@angular/router';

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
    private router: Router
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
    });
  }
}
