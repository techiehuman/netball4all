import { Component, OnInit } from '@angular/core';
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
    //  console.log(response)

      
      this.notifications = response; 
      for(var i =0;i<this.notifications.length;i++) {
        var stringDate : String = this.notifications[i]['created_at'];
        let date = new Date(stringDate.replace(' ', 'T'));
        console.log( date.getDay());
        console.log(date.getFullYear());
        console.log(date.getMonth());
        var month = date.getMonth()+1;
        this.notifications[i]['date_created_at'] = this.str_pad(date.getDate())+' - '+this.str_pad(month)+' - '+date.getFullYear();
        this.notifications[i]['time_created_at'] = this.formatAMPM(date);
        this.notifications[i]['description'] = this.urlify(this.notifications[i]['description']);

      }
      console.log(this.notifications);
    }); 


  }

   formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + '' + ampm;
    return strTime;
  }

   str_pad(n) {
    return String("00" + n).slice(-2);
}

 urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}




}
