import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Notifications } from '../notifications';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notifications: Notifications[];

  constructor(public  restService: RestService) { 

   


  }

  ngOnInit() {

    this.restService.getNotifications().subscribe(response => {
        console.log(response)
        this.notifications = response; 
       
    });
  }

}
