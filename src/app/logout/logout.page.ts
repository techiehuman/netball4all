import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from '../storage.service';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';

const { Modals } = Plugins;



@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.showConfirm();

  }
  async showConfirm() {

    let confirmRet = await Modals.confirm({
      title: 'Logout',
      message: 'Are you sure?'
    });
    console.log(JSON.stringify(confirmRet));
    if(confirmRet.value == true) {
      remove("PlayerUser");
     this.router.navigate(['/']);
    }else {
      this.router.navigate(['app/tabs/id-card'])

    }
  }
 

}
