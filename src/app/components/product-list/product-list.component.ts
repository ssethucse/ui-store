import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/Product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  currentCategoryId: number=1;
  searchMode: boolean=false;

  constructor(private productService: ProductService,
  private route: ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(()=>{
  this.listProducts();
  });
  }

  listProducts(){
  this.searchMode = this.route.snapshot.paramMap.has('keyword');
  if(this.searchMode){
  this.handleSearchProducts();
  }else{
  this.handleListProducts();
  }
  }

  handleSearchProducts(){
   const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

   this.productService.getSearchList(theKeyword).subscribe(
   data=> {
   this.products = data;
   }
   )
  }

  handleListProducts(){
  const categoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(categoryId){
     this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
    this.currentCategoryId = 1;}

    this.productService.getProductList(this.currentCategoryId).subscribe(
    data=> {
    this.products = data;
    }
    )
  }

  doSearch(val: string){
  this.router.navigateByUrl(`product/getInfo/${val}`);
  }

}
