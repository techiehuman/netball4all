import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Notifications } from '../notifications';
import { IonRefresher } from '@ionic/angular';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notifications: Notifications[];

  constructor(public  restService: RestService) { 

   


  }
  ionViewWillEnter(){
   // alert("ionViewWillEnter");
    this.loadNotifications();

  }
  ionViewDidLoad(){
   // alert("ionViewDidLoad");
  }
  ngOnInit() {

       
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.loadNotifications();



    setTimeout(() => {
      console.log('Async operation has ended');
    refresher.target.complete();

    }, 2000);
  }
  loadNotifications(){
    this.restService.getNotifications().subscribe(response => {
      console.log(response)
      this.notifications = response; 
    }); 


  }

}
