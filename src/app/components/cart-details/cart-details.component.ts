import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
cartItems: CartItem[] = [];
totalPrice: number = 0;
totalDiscount: number = 0;
totalQuantity: number = 0;
shippingFees: boolean = true;

constructor(private cartService: CartService){
}
ngOnInit(): void{
this.listCartDetails();
}

listCartDetails(){
this.cartItems = this.cartService.cartItems;

this.cartService.totalPrice.subscribe(
data=> this.totalPrice = data
);

this.cartService.totalDiscount.subscribe(
data=> this.totalDiscount = data
);

this.cartService.totalQuantity.subscribe(
data=> this.totalQuantity = data
);

this.cartService.computeCartTotals();

if(this.totalPrice>1000){
   this.shippingFees = false;
}

}

incrementQuantity(item: CartItem){
this.cartService.addToCart(item);
}

decrementQuantity(item: CartItem){
this.cartService.decrementQuantity(item);
}

remove(item: CartItem){
this.cartService.remove(item);
}

}
