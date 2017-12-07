import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from '../confirmation/confirmation';
//


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  cart: any[];
  total: any[];
  
  _aggregateCart = (cart) => {
    let newCart = [];
    cart.forEach(function(item) {
     if(newCart.indexOf(item) < 0) {
         newCart.push(item);
     }
  });
  return newCart;
}

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.cart = this._aggregateCart(navParams.get('cart'));
    this.total = navParams.get('total');
  }

  _goBack = () => {
    this.navCtrl.pop();
  }
  _onPay = () => {
    this.navCtrl.push(ConfirmationPage, {
      finalOrder: this.cart,
      total: this.total,
    });

  }
}
