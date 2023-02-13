export class OrderResp {
  constructor(public id: string,
              public orderTrackingNumber: string,
              public totalPrice: number,
              public totalQuantity: number,
              public dateCreated: Date,
              public status: string,
              public phone: string){
              }
}
