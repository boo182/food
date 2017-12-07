import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { PaymentPage } from '../payment/payment';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root = PaymentPage;

  constructor(params: NavParams) {
    console.log(params);
  }
}
