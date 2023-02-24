import { Component,OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { Customer } from 'src/app/common/customer';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

 orderHistoryList: OrderHistory[]=[];
 storage: Storage = localStorage;
 authError: string = "";

 constructor(private orderHistoryService: OrderHistoryService,
             private authService: AuthServiceService,
             private route: ActivatedRoute, private router: Router){
             }

 ngOnInit(): void {
    this.loadAuth();
    this.handleOrderHistory();
    this.router.navigateByUrl("/order-history");
  }

  loadAuth(){
  let customer = new Customer();
  customer.phone = JSON.parse(this.storage.getItem('phone'));
  customer.identity = JSON.parse(this.storage.getItem('identity'));

      this.authService.getAuthenticateDetail(customer).subscribe({
      next: response => {
        this.storage.setItem('authToken',JSON.stringify(`${response.data}`));
      },
      error: err => {
        console.log(`There was an error:${err.message}`);
      }
      });
  }

  handleOrderHistory(){
    const thePhone = JSON.parse(this.storage.getItem('phone'));

    /* this.orderHistoryService.getOrderHistory1(thePhone).subscribe(
      data => {
        this.orderHistoryList = data.content;
      }
    ); */

    this.orderHistoryService.getOrderHistory1(thePhone).subscribe({
      next: response => {
        this.orderHistoryList = response.content;
        this.storage.setItem('authError',JSON.stringify("false"));
        this.authError = 'No Records Found.Please Create the Order.';
      },
      error: err => {
       console.log(`There was an error:${err.message}`);
       if(err.status == 401){
        this.storage.setItem('authError',JSON.stringify("true"));
        this.authError = 'Not Authenticated! Please login again.';
       }else{
        this.authError = 'No Records Found.Please Create the Order.';
       }
      }
      });
  }
}
