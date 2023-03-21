import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

 authToken: string;
 storage: Storage = localStorage;

  private baseUrl = environment.baseUrl;
  //private baseUrl = 'http://localhost:8085';
  constructor(private httpClient: HttpClient) { }

//GetResponseOrderHistory replaced OrderHistory
  getOrderHistory1(thePhone: string): Observable<OrderHistory>{
       const orderHistoryUrl = `${this.baseUrl}/order/findByCustomerPhone/${thePhone}`;
       return this.httpClient.get<OrderHistory>(orderHistoryUrl);
  }

  getOrders(): Observable<any>{
       const orderUrl = `${this.baseUrl}/order/findAllOrders`;
       return this.httpClient.get<any>(orderUrl);
  }

  updateOrder(id: string): Observable<any>{
      return this.httpClient.post<any>(`${this.baseUrl}/order/status/upgrade`,id);
  }

  updateInvoice(id: string): Observable<any>{
      return this.httpClient.post<any>(`${this.baseUrl}/order/invoice`,id);
  }
}

interface GetResponseOrderHistory{
 content:  OrderHistory[];
}
