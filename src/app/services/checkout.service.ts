import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Purchase } from 'src/app/common/purchase';
import { Customer } from 'src/app/common/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private validateUrl = environment.baseUrl + '/customer/validate/getDetail';
  private purchaseUrl = environment.baseUrl + '/checkout/purchase';
  /* private purchaseUrl = "http://localhost:8085/checkout/purchase";
  private validateUrl = "http://localhost:8085/customer/validate/getDetail"; */

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }

  validateCustomer(phone: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("phone",phone);
    return this.httpClient.get<Customer>(this.validateUrl,{params:queryParams});
    }
}
