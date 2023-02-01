import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Purchase } from 'src/app/common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

private purchaseUrl = "http://localhost:8085/checkout/purchase";
  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }
}
