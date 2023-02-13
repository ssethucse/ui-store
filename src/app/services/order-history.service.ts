import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

 authToken: string;
 storage: Storage = localStorage;

  private baseUrl = 'http://localhost:8085';
  constructor(private httpClient: HttpClient) { }

 /*  getOrderHistory(thePhone: string): Observable<GetResponseOrderHistory>{
     this.authToken = JSON.parse(this.storage.getItem('authToken'));

     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*,http://localhost:8085.com',
      'Authorization': `Bearer ${this.authToken}`
     })
     const orderHistoryUrl = `${this.baseUrl}/order/findByCustomerPhone/${thePhone}`;
     return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl, { headers: headers });
  } */

  getOrderHistory1(thePhone: string): Observable<GetResponseOrderHistory>{
       const orderHistoryUrl = `${this.baseUrl}/order/findByCustomerPhone/${thePhone}`;
       return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }

  getOrders(): Observable<any>{
       const orderUrl = `${this.baseUrl}/order/findAllOrders`;
       return this.httpClient.get<any>(orderUrl);
  }

  updateOrder(id: string): Observable<any>{
      return this.httpClient.post<any>(`${this.baseUrl}/order/status/upgrade`,id);
    }
}

interface GetResponseOrderHistory{
 content:  OrderHistory[];
}
