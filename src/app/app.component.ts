import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui-store';

   productCategories: ProductCategory[]=[];
    constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
    }

   listProductCategories(){
    this.productService.getProductCategories().subscribe(
    data=> {
    this.productCategories = data;
    }
    );
    }
}
