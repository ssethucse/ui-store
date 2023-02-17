import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';
import { MessageModel } from '../common/message-model';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private baseUrl = 'http://localhost:8085/mobile';

  constructor(private httpClient: HttpClient) { }

   RequestOtp(message: MessageModel): Observable<any>{
       return this.httpClient.post<any>(`${this.baseUrl}/sendOtp`,message).pipe(
                                                                  map(response=> response)
                                                                  );
   }

     ValidateOtp(message: MessageModel): Observable<any>{
           return this.httpClient.post<any>(`${this.baseUrl}/validateOtp`,message).pipe(
                                                                      map(response=> response)
                                                                      );
   }
}
