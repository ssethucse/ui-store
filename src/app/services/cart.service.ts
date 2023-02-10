import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Address } from 'src/app/common/address';
import { CustomerProfile } from 'src/app/common/customer-profile';
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private profileUrl = "http://localhost:8085/order/findCustomerProfile";

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;

  constructor(private httpClient: HttpClient) {
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if(data !=null){
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

  getProfile(phone: string): Observable<any>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("phone",phone);
      return this.httpClient.get<CustomerProfile>(this.profileUrl,{params:queryParams});
    }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

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

  this.persistCartItems();
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
