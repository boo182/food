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
  total: number;
  
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

  // Calcumate the new total after adding or deleting items
  _calculateTotal = () => {
    const newTotal = this.cart.length ? this.cart
    .map(item => item.price * item.quantity)
    .reduce((a, b) => a + b) : 0;
    this.total = newTotal;
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
    * Ajoute un item à la sélection de produit
    * @param {number} productId
    */
  _addOne = (productId) => {
    this.cart[productId].quantity += 1;
    this._calculateTotal();
  }

  /**
    * enlève un item à la sélection de produit
    * @param {number} productId
    */
  _removeOne = (productId) => {
    if(this.cart[productId].quantity === 1) {
      this._deleteProduct(productId);
    } else {
      this.cart[productId].quantity -= 1;
    }
     this._calculateTotal();
  }

  /**
    * supprime la ligne de produits
    * @param {number} productId
    */
  _deleteProduct = (productId) => {
    if(this.cart.length === 1) {
      this.navCtrl.pop();
    } else {
      this.cart.splice(productId, 1);
      this._calculateTotal();
    }
    
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
