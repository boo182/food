import { Component } from '@angular/core';
import  { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
//
import { PaymentPage } from '../payment/payment'; 
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  menu: any[];
  cart: any[] = [];
  total: number;

  constructor(public navCtrl: NavController, private http: Http) {
    const json = this.http.get('../../assets/datas.json').map(res => res.json().categories);
    json.subscribe(data => {
      this.menu = data
    });
}

/**
  * Méthode qui prend les indexs des catégories et des produits 
  * qui rajoute l'objet désiré au panier. Elle incrémente le compteur de l'objet
  * et lance la donction de calcul du prix final. Elle ajoute la propriété quantity
  * qui n'est pas définie dans l'objet initial.
  * @param {number} catId
  * @param {number} productId
  */
_addToCart = (catId, productId) => {
  this.menu[catId].products[productId].quantity = 
  this.menu[catId].products[productId].quantity
  ? this.menu[catId].products[productId].quantity + 1
  : 1;

  this.cart.push(this.menu[catId].products[productId]);
  this._totalPrice();
}


/**
  * Méthode qui prend les indexs des catégories et des produits 
  * qui supprime l'objet désiré du panier. Elle décrément le compteur de l'objet
  * et lance la fonction de calcul du prix final. Elle modifie la propriété quantity
  * en conséquence
  * @param {number} catId
  * @param {number} productId
  */
_deleteFromCart = (catId, productId) => {
  this.menu[catId].products[productId].quantity = 
  this.menu[catId].products[productId].quantity === 0 
  ? 0 
  :this.menu[catId].products[productId].quantity - 1;

  const itemToRemove = this.cart.findIndex(item => 
    item.name === this.menu[catId].products[productId].name);
    if(this.cart[itemToRemove] && this.cart[itemToRemove].quantity >= 0) {
      this.cart.splice(itemToRemove, 1);
    }
    this.total -= this.menu[catId].products[productId].price;
    this._totalPrice();
  }

// redirige vers la page de paiments si le panier contient au moins un produit.
  _onOrder = () => {
    if(this.cart.length > 0) {
      this.navCtrl.push(PaymentPage, {
        cart: this.cart,
        total: this.total,
      });
    }
  }


  /**
  * Méthode qui calcule le prix total du panier si le panier a au moins un élément.
  */
  _totalPrice = () => {
    this.total = this.cart.length > 0 ? this.cart
    .map(item => item.price)
    .reduce((a, b) => {
      return a+b;
    }) : '0';
  }

  /**
    * Prend l'index de la catégorie et ouvre ou la ferme le menu déroulant au click.
    * Ferme les autres menus déroulant si il y en a d'autre ouverts
    * la propriété open est automatiquement rajouté à l'objet en cours. Elle n'est pas
    * définie dans l'objet initial.
    * @param {number} i
  */
  _toggleCategory = (i) => {
    this.menu[i].open = !this.menu[i].open;
    this.menu.forEach(item => {
      if(item !== this.menu[i]) {
        item.open = false;
      }
    });
  } 
}
