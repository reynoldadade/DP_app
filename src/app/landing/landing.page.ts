import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  today = new Date();
  constructor(public menuCtrl: MenuController) {
  }

  ngOnInit() {
    // const width = window.screen.availWidth;
    // console.log(width);
    // console.log(screen.orientation.type, 'type');
  }

    ionViewWillEnter() {
      this.menuCtrl.enable(true);
  }

}
