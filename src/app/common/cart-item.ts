import { Product } from 'src/app/common/Product';

export class CartItem {
id: string;
name: string;
imageUrl: string;
discountPrice: number;
unitPrice: number;
quantity: number;

constructor(product: Product){
this.id = product.id;
this.name = product.name;
this.imageUrl = product.imageUrl;
this.unitPrice = product.unitPrice;
this.discountPrice = product.discountPrice;

this.quantity = 1;

}
}
