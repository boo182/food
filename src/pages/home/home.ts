import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Pages
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  _onChoose = (resto) => {
    this.navCtrl.push(MenuPage, {
      restaurant: resto
    });
  }

}
