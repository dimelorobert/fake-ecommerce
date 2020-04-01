'use strict';

const euro = "€";
const unities = "(ud/s)";
//clase tienda con catalogo
class Shop {
  catalogue;
  constructor(catalogue) {
    this.catalogue = catalogue;
  }
  //metodo estatico para sacar factura
  static checkout(user) {
    for (const item of user.pay) {
       //bucle for of que recorre cada uno de los productos seleccioneados por arnulfo
      const invoice = `${item.item.name} ${item.item.price} ${euro} x ${item.units} ${unities} ----------> = ${item.item.price * item.units} ${euro}`;      
      console.log(invoice);
    }
    //.reduce para obtener el total con 2 decimales
    console.log(
      `TOTAL = ${user.pay.reduce(
        (total, item) => Math.round((total + item.item.price * item.units)*100)/100 + 1,
        0
      )}${euro}`
    );
    return user.pay;
  }
}

//clase item (name y price)
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

//clase user con (name y cart) PRIVADO
class User {
  name;
  #cart = [];
  constructor(name) {
    this.name = name;
  }
  //metodo para devolver el valor a pagar de lo que arnulfo a seleccionado y que esta en el cart, get para leerlo,ya que set es para modificarlo o meter valor nuevo.
  get pay() {
    return this.#cart;
  }
  //metodo para identificar items repetidos
  checkIfRepeated(newItem) {
    for (const itemInCart of this.#cart) {
      if (itemInCart.item.name === newItem.name) {
        return itemInCart;
      }
    }
    return false;
  }
  //metodo add para meter items al cart ,suma articulos repetidos
  addToCart(newItem) {
    if (this.checkIfRepeated(newItem)) {
      this.checkIfRepeated(newItem).increase();
      return this.#cart;
    } else {
      this.#cart.push(new CartItem(newItem));
      return this.#cart;
    }
  }
  //metodo seleccion items azar
  fillTheCart(cartSize, shop) {
    for (let i = 0; i < cartSize; i++) {
      this.addToCart(shop.catalogue[Math.floor(Math.random() * Math.floor(shop.catalogue.length))]);
    }
  }
}

//clase cart (item y unidades)
class CartItem {
  item;
  units = 1;
  constructor(item) {
    this.item = item;
  }
  //metodo para incrementar la cantidad items que se repiten
  increase() {
    this.units++;
  }
}

//variable para almacenar items
let catalogue = [
  new Item('camisa RALPH LAURENT', 25.99),
  new Item('pantalon ARMANI', 50.99),
  new Item('calcetines ZARA', 14.99),
  new Item('bufanda DOLCE GABANNA', 9.99)
];
const myUser = new User('Arnulfo');
//se crea una tienda con el inventario definido anteriormente
const myShop = new Shop(catalogue);

//arnulfo llenando el cart
myUser.fillTheCart(6, myShop);

//invoice de arnulfo
Shop.checkout(myUser);