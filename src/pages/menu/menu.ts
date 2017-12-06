import { Component } from '@angular/core';
import  { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  menu: any[];
  cart: any[];

  constructor(public navCtrl: NavController, private http: Http) {
    const json = this.http.get('../../assets/datas.json').map(res => res.json().categories);
    json.subscribe(data => {
      this.menu = data
    });
  this.cart = [];
}
_toggleCategory = (i) => {
  this.menu[i].open = !this.menu[i].open;
} 

_addToCart = (catId, productId) => {
  this.menu[catId].products[productId].quantity = 
  this.menu[catId].products[productId].quantity
  ? this.menu[catId].products[productId].quantity + 1
  : 1;

  this.cart.push(this.menu[catId].products[productId]);
}

_deleteFromCart = (catId, productId) => {
  this.menu[catId].products[productId].quantity = 
  this.menu[catId].products[productId].quantity === 0 
  ? 0 
  :this.menu[catId].products[productId].quantity - 1;

  const itemToRemove = this.cart.findIndex(item => item.name === this.menu[catId].products[productId].name);
  this.cart.splice(itemToRemove, 1);
  }
}
