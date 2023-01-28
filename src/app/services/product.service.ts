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


  getProductListPaginate(thePage: number, thePageSize: number, categoryId: number): Observable<GetResponseProducts>{

  const searchUrl = `${this.baseUrl}/product/getProducts/${categoryId}`
                      +`?page=${thePage}&pageSize=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getSearchListPaginate(thePage: number, thePageSize: number, keyword: string): Observable<GetResponseProducts>{

  const filterUrl = `${this.baseUrl}/product/getProducts/search/${keyword}`
                              +`?page=${thePage}&pageSize=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(filterUrl);
  }

  getProductInfo(productId: number): Observable<Product>{

    const infoUrl = `${this.baseUrl}/product/getInfo/${productId}`;

    return this.httpClient.get<any>(infoUrl).pipe(
    map(response=> response)
    );
    }
}

  interface GetResponseProducts {
  content:  Product[],
  totalPages: number,
  size: number,
  number: number
  }


