import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(private productService: ProductService,
  private cartService: CartService,
  private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(()=>{
    this.handleProductDetails();
    });
  }

handleProductDetails(){
const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
this.productService.getProductInfo(theProductId).subscribe(
data=>{
this.product = data;
})
}

 goHome(){
  this.router.navigateByUrl("product/getProducts");
  }

  addToCart(){
  //alert(this.product.name);
   const theCartItem = new CartItem(this.product);
   this.cartService.addToCart(theCartItem);
  }

}




