import { Component,OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

 orderHistoryList: OrderHistory[]=[];
 storage: Storage = localStorage;

 constructor(private orderHistoryService: OrderHistoryService){}

 ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory(){
    const thePhone = JSON.parse(this.storage.getItem('phone'));

    this.orderHistoryService.getOrderHistory(thePhone).subscribe(
      data => {
        this.orderHistoryList = data.content;
      }
    );
  }
}
