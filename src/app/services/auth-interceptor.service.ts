import { Injectable } from '@angular/core';
import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from '@angular/common/http';
import { from,Observable } from 'rxjs';
import { interval } from 'rxjs';
import { Customer } from 'src/app/common/customer';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  //accessToken: string= null;
  private storage: Storage = localStorage;

  constructor(private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return from(this.handleAccess(req,next));
  }

  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>>{
    const urlOrder = ['order/findByCustomerPhone','order/findAllOrders','order/status/upgrade','order/findCustomerProfile'];

    if(urlOrder.some(url => req.urlWithParams.includes(url))){
    /* let customer = new Customer();
    customer.phone = JSON.parse(this.storage.getItem('phone'));
    customer.identity = JSON.parse(this.storage.getItem('identity'));
     this.authService.getAuthenticateDetail(customer).subscribe({
                         next: response => {
                         this.accessToken = JSON.stringify(`${response.data}`);
                         },
                         error: err => {
                          console.log(`There was an error:${err.message}`);
                         }
                         }); */

      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ JSON.parse(this.storage.getItem('authToken'))//this.accessToken
        }
      });

    }
    return await from(next.handle(req)).toPromise();

  }
}
