import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from '../confirmation/confirmation';
//Services
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  cart: any[];
  total: any[];
  
   /**
    * Prend le panier en cours, récupère les éléments par type 
    * et les aggrège et renvoie les quantités de chaques produits 
    * @param {object} cart
    */
  _aggregateCart = (cart) => {
    let newCart = [];
    cart.forEach(function(item) {
     if(newCart.indexOf(item) < 0) {
         newCart.push(item);
     }
  });
  return newCart;
}

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private ordersService: OrdersService,
  ) {
    this.cart = this._aggregateCart(navParams.get('cart'));
    this.total = navParams.get('total');
  }

   /**
    * Ajoute aux commandes de l'utilisateur la commande actuelle
    */
  _addToOrders = () => {
    const lastOrder = {
      date: new Date(),
      total: this.total,
      products: this.cart,
    }
    this.ordersService.newOrder(lastOrder);
  }

  // permet de revenir à la view précédente en gardant les éléments du panier
  _goBack = () => {
    this.navCtrl.pop();
  }
  
  // Appelle la fonction addToCart et push la view suivante
  _onPay = () => {
    this._addToOrders();
    this.navCtrl.push(ConfirmationPage, {
      finalOrder: this.cart,
      total: this.total,
    });
  }
}
