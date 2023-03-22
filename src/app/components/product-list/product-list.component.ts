import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/common/Product';
import { CartItem } from 'src/app/common/cart-item';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 50;
  theTotalElements: number = 0;

  previousKeyword: string="";
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

if(this.previousKeyword != theKeyword){
this.thePageNumber=1;
}
this.previousKeyword = theKeyword;


    this.productService.getSearchListPaginate(this.thePageNumber - 1,
                                                    this.thePageSize,
                                                    theKeyword).subscribe(
      data => {
         this.products = data.content;
                  this.thePageNumber = data.number + 1;
                  this.thePageSize = data.size;
                  this.theTotalElements = data.totalElements;
      }
    )
  }

  handleListProducts() {
    const categoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (categoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }


  if(this.previousCategoryId != this.currentCategoryId) {
  this.thePageNumber = 1;
   }
   this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
        data => {
          this.products = data.content;
          this.thePageNumber = data.number + 1;
          this.thePageSize = data.size;
          this.theTotalElements = data.totalElements;
        }
      )
  }


 doSearch(value: string){
  this.router.navigateByUrl(`product/getInfo/${value}`);
}

updatePageSize(value: string){
this.thePageSize=+value;
this.thePageNumber=1;
this.listProducts();
}

addToCart(product: Product){

const theCartItem = new CartItem(product);
this.cartService.addToCart(theCartItem);
}

}
