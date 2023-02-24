import { Component,OnInit } from '@angular/core';
import { OrderResp } from 'src/app/common/order-resp';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { InvoiceHistory } from 'src/app/common/invoice-history';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {
orderHistoryList: OrderResp[]=[];
orderInvoiceList: InvoiceHistory[]=[];

constructor(private orderHistoryService: OrderHistoryService){}

 ngOnInit(): void {
    this.handleOrderHistory();
 }

 handleOrderHistory(){
     this.orderHistoryService.getOrders().subscribe(
       data => {
         this.orderHistoryList = data;
       }
     );
 }

 updateStatus(id: string){
    this.orderHistoryService.updateOrder(id).subscribe(
       data => {
         console.log(data);
       }
     );
     location.reload();
 }
 invoiceDetails(id: string){
   this.orderHistoryService.updateInvoice(id).subscribe(
    data=>{
      this.orderInvoiceList = data;
    }
   )
  }

}
