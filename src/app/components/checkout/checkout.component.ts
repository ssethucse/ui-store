import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validator, Validators } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';
import { Address } from 'src/app/common/address';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/common/purchase';
import { OrderItem} from 'src/app/common/order-item';
import { Order } from 'src/app/common/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

totalPrice: number = 0;
totalDiscount: number = 0;
totalQuantity: number = 0;
shippingFees: boolean = true;
phones: string = null;
customerValidate: boolean = false;
checkDisk: boolean = false;
isDisabled: boolean = false;

address: Address = new Address();


  storage: Storage = localStorage;

/* creditCardMonths: number[] = [];
creditCardYears: number[] = []; */

checkoutFormGroup: FormGroup;
constructor(private formBuilder: FormBuilder,
            private shopFormService: ShopFormService,
            private cartService: CartService,
            private checkoutService: CheckoutService,
            private router: Router,
            private toastr: ToastrService){
}

ngOnInit(): void{
this.reviewCartDetails();
this.getAddressDetails();
this.isDisabled = false;

this.checkoutFormGroup = this.formBuilder.group({
customer: this.formBuilder.group({
firstName: new FormControl('',[Validators.required,Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
lastName: new FormControl('',[Validators.required,Validators.minLength(1), ShopValidators.notOnlyWhiteSpace]),
phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
email: new FormControl('')
//email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$')])
}),
shippingAddress: this.formBuilder.group({
/* country: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]), */
street: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
city: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
/* state: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]), */
zipCode: new FormControl('',[Validators.required,Validators.minLength(6),ShopValidators.notOnlyWhiteSpace]),
})

//,
/* billingAddress: this.formBuilder.group({
country: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
street: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
city: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
state: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
zipCode: new FormControl('',[Validators.required,Validators.minLength(6),ShopValidators.notOnlyWhiteSpace]),
}) */
/* creditCard: this.formBuilder.group({
cardType: new FormControl('',[Validators.required]),
nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhiteSpace]),
cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
expirationMonth: new FormControl('',[Validators.required]),
expirationYear: new FormControl('',[Validators.required])
}) */
})

//populate creditCard months
/* const startMonth: number = new Date().getMonth()+1;

this.shopFormService.getCreditCardMonths(startMonth).subscribe(
data=>{
this.creditCardMonths = data;
});

this.shopFormService.getCreditCardYears().subscribe(
data=>{
this.creditCardYears = data;
}); */

}

onSubmit(){
this.isDisabled = true;
//alert(this.checkoutFormGroup.get('customer').value.email);
let location: string[]=['600106','600094','600034','600030','600026','600093','600024','600092','600102','600107','600010','600040','600031','600029'];

if(this.checkoutFormGroup.invalid){
//alert('test');
this.checkoutFormGroup.markAllAsTouched();
return;
}


if(!location.includes(this.checkoutFormGroup.get('shippingAddress.zipCode').value)){
  this.toastr.info("Currently we are not serving to this location.\nWe will get back you soon.","Invalid Location!");
  //this.router.navigateByUrl("/product/getProducts");
}

this.phones = this.checkoutFormGroup.get('customer.phone').value;
//this.phones = JSON.parse(this.storage.getItem('phone'));
//alert(this.phones);
this.checkoutService.validateCustomer(this.phones).subscribe({
next: response => {
 if(response!=null && response.identity!=null && response.identity.length>0){

     let order = new Order();
     if(this.totalPrice<1000){
        order.totalPrice = this.totalPrice + 50;
     }else{
       order.totalPrice = this.totalPrice;
     }
       order.totalQuantity = this.totalQuantity;

       const cartItems = this.cartService.cartItems;

       let orderItems: OrderItem[] = cartItems.map(temp=> new OrderItem(temp));

       let purchase = new Purchase();

       purchase.customer = this.checkoutFormGroup.controls['customer'].value;
       //purchase.customer.identity = genUniqueId();

       purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
       //const shippingState: string = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
       /* const shippingCountry: string = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
       purchase.shippingAddress.state = shippingState;
       purchase.shippingAddress.country = shippingCountry;  */

    /*    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
       const billingState: string = JSON.parse(JSON.stringify(purchase.billingAddress.state));
       const billingCountry: string = JSON.parse(JSON.stringify(purchase.billingAddress.country));
       purchase.billingAddress.state = billingState;
       purchase.billingAddress.country = billingCountry; */

       purchase.order = order;
       purchase.orderItems = orderItems;

       this.checkoutService.placeOrder(purchase).subscribe({
       next: response => {
       //alert(`Your Order has been received.\nOrder Tracking Number:${response.orderTrackingNumber}`);
       //alert(`Your Order has been received.\nWe will get back you soon.`);
       this.resetCart();
       this.toastr.success("Your Order has been received.\nWe will get back you soon.","Ordered Successfully!");
       if(JSON.parse(this.storage.getItem('authError'))=="false"){
          this.router.navigateByUrl("/order-history");
       }else{
          this.router.navigateByUrl("/product/getProducts/1");
        }
       },
       error: err => {
       //alert(`There was an error:${err.message}`);
       console.log(`There was an error:${err.message}`);
       }
       });
    }else{
    this.toastr.warning("Please Verify your mobile number.","Need Verification!");
    this.router.navigateByUrl("login");
   }
  },
 error: err => {
 //alert(`There was an error:${err.message}`);
 console.log(`There was an error:${err.message}`);
 return;
 }
 });



}

get firstName(){ return this.checkoutFormGroup.get('customer.firstName');}
get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
get phone(){ return this.checkoutFormGroup.get('customer.phone');}
get email(){ return this.checkoutFormGroup.get('customer.email');}

get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street');}
get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city');}
/* get shippingAddressState(){ return this.checkoutFormGroup.get('shippingAddress.state');} */
get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode');}
/* get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country');} */

/*
get billingAddressStreet(){ return this.checkoutFormGroup.get('billingAddress.street');}
get billingAddressCity(){ return this.checkoutFormGroup.get('billingAddress.city');}
get billingAddressState(){ return this.checkoutFormGroup.get('billingAddress.state');}
get billingAddressZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode');}
get billingAddressCountry(){ return this.checkoutFormGroup.get('billingAddress.country');}
 */


/*
get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType');}
get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard');}
get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber');}
get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode');}
 */

/* copyShippingAddressToBillingAddress(event){
if(event.target.checked){
this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
}else{
this.checkoutFormGroup.controls.billingAddress.reset();
}
} */

resetCart(){
this.cartService.cartItems = [];
this.cartService.totalQuantity.next(0);
this.cartService.totalPrice.next(0);
this.cartService.totalDiscount.next(0);

this.checkoutFormGroup.reset();
this.storage.removeItem('cartItems');

this.router.navigateByUrl("/product/getProducts");
}

handleMonthsAndYears(){
/* const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
const currentYear: number = new Date().getFullYear();
const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

let startMonth: number;
if(currentYear==selectedYear){
  startMonth = new Date().getMonth()+1;
}else{
  startMonth = 1;
}

this.shopFormService.getCreditCardMonths(startMonth).subscribe(
data=>{
this.creditCardMonths = data;
}
); */
}

reviewCartDetails(){
this.cartService.totalQuantity.subscribe(
 data=> this.totalQuantity = data
);
this.cartService.totalPrice.subscribe(
data=> this.totalPrice = data
);
this.cartService.totalDiscount.subscribe(
data=> this.totalDiscount = data
);
if(this.totalPrice>1000){
   this.shippingFees = false;
}
}


getAddressDetails(){
this.phones = JSON.parse(this.storage.getItem('phone'));
if(this.phones && this.phones.length>0){

this.cartService.getProfile(this.phones).subscribe({
next: response => {
if(response!=null){
this.address.street = response.shippingAddress.street;
this.address.city = response.shippingAddress.city;
this.address.zipCode = response.shippingAddress.zipCode;

this.checkoutFormGroup.get('customer.firstName').setValue(response.customer.firstName);
this.checkoutFormGroup.get('customer.lastName').setValue(response.customer.lastName);
if(response.customer.phone!=null){
  this.checkDisk = true;
}
this.checkoutFormGroup.get('customer.phone').setValue(response.customer.phone);
this.checkoutFormGroup.get('customer.email').setValue(response.customer.email);

this.checkoutFormGroup.get('shippingAddress.city').setValue(response.shippingAddress.city);
this.checkoutFormGroup.get('shippingAddress.street').setValue(response.shippingAddress.street);
this.checkoutFormGroup.get('shippingAddress.zipCode').setValue(response.shippingAddress.zipCode);
}else{
this.checkoutFormGroup.get('customer.phone').setValue(this.phones);
this.checkDisk = true;
}
},
error: err => {
//alert(`There was an error:${err.message}`);
console.log(`There was an error:${err.message}`);
}
});
}
}

}

function genUniqueId(): string {
  const dateStr = Date
    .now()
    .toString(36); // convert num to base 36 and stringify

  const randomStr = Math
    .random()
    .toString(36)
    .substring(2, 8); // start at index 2 to skip decimal point

  return `${dateStr}-${randomStr}`;
}
