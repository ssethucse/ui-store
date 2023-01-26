import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8085';

  constructor(private httpClient: HttpClient) { }

getProductCategories(): Observable<ProductCategory[]>{

  const categoryUrl = `${this.baseUrl}/product/getAllCategory`;
   return this.httpClient.get<any>(categoryUrl).pipe(
    map(response=> response)
    );

}


  getProductList(categoryId: number): Observable<Product[]>{

  const searchUrl = `${this.baseUrl}/product/getProducts/${categoryId}`;

  return this.httpClient.get<any>(searchUrl).pipe(
  map(response=> response.content)
  );
  }

  getSearchList(keyword: string): Observable<Product[]>{

  const filterUrl = `${this.baseUrl}/product/getProducts/search/${keyword}`;

  return this.httpClient.get<any>(filterUrl).pipe(
  map(response=>response.content)
  );
  }

  getProductInfo(productId: number): Observable<Product>{

    const infoUrl = `${this.baseUrl}/product/getInfo/${productId}`;

    return this.httpClient.get<any>(infoUrl).pipe(
    map(response=> response)
    );
    }

}


