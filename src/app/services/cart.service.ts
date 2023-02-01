import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem){
  let alreadyExistInCart: boolean = false;
  let existingCartItem: CartItem = undefined;

  if(this.cartItems.length>0){

existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id )

    alreadyExistInCart = (existingCartItem != undefined);
   }

   if(alreadyExistInCart){
   existingCartItem.quantity++;
   }else{
   this.cartItems.push(theCartItem);
   }
   this.computeCartTotals();
  }

  computeCartTotals(){
  let totalPriceValue: number = 0;
  let totalQuantityValue: number = 0;

  for(let currentCartItem of this.cartItems){
  totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
  totalQuantityValue += currentCartItem.quantity;
  }

  this.totalPrice.next(totalPriceValue);
  this.totalQuantity.next(totalQuantityValue);
  }


decrementQuantity(item: CartItem){
item.quantity--;

if(item.quantity==0){
this.remove(item);
}else{
this.computeCartTotals();
}
}

remove(item: CartItem){
const itemIndex= this.cartItems.findIndex(temp=> temp.id==item.id);

if(itemIndex>-1){
this.cartItems.splice(itemIndex,1);
this.computeCartTotals();
}
}


}
