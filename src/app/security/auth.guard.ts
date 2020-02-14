import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SharedService} from '../shared/shared.service';
import {MenuController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public sharedService: SharedService, public menuCtrl: MenuController) {}

  canActivate(): boolean {
    if ( !sessionStorage.getItem('userCode')) {
      this.menuCtrl.enable(false);
      this.router.navigate(['home']);
      return  false;
    }
    return true;
  }
}
