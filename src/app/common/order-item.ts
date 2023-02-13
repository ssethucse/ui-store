import { CartItem } from './cart-item';

export class OrderItem {
imageUrl: string;
unitPrice: number;
discountPrice: number;
quantity: number;
productId: string;

constructor(cartItem: CartItem){
this.imageUrl = cartItem.imageUrl;
this.discountPrice = cartItem.discountPrice;
this.unitPrice = cartItem.unitPrice;
this.quantity = cartItem.quantity;
this.productId = cartItem.id;
}
}
