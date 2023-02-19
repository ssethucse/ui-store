import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';
import { MessageModel } from '../common/message-model';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private mobileUrl = environment.baseUrl + '/mobile';
  //private baseUrl = 'http://localhost:8085/mobile';

  constructor(private httpClient: HttpClient) { }

   RequestOtp(message: MessageModel): Observable<any>{
       return this.httpClient.post<any>(`${this.mobileUrl}/sendOtp`,message).pipe(
                                                                  map(response=> response)
                                                                  );
   }

     ValidateOtp(message: MessageModel): Observable<any>{
           return this.httpClient.post<any>(`${this.mobileUrl}/validateOtp`,message).pipe(
                                                                      map(response=> response)
                                                                      );
   }
}
