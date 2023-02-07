import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validator, Validators } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/common/purchase';
import { OrderItem} from 'src/app/common/order-item';
import { Order } from 'src/app/common/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

totalPrice: number = 0;
totalQuantity: number = 0;

/* creditCardMonths: number[] = [];
creditCardYears: number[] = []; */

checkoutFormGroup: FormGroup;
constructor(private formBuilder: FormBuilder,
            private shopFormService: ShopFormService,
            private cartService: CartService,
            private checkoutService: CheckoutService,
            private router: Router){
}

ngOnInit(): void{
this.reviewCartDetails();

this.checkoutFormGroup = this.formBuilder.group({
customer: this.formBuilder.group({
firstName: new FormControl('',[Validators.required,Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
lastName: new FormControl('',[Validators.required,Validators.minLength(1), ShopValidators.notOnlyWhiteSpace]),
phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
email: new FormControl('')
//email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$')])
}),
shippingAddress: this.formBuilder.group({
country: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
street: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
city: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
state: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
zipCode: new FormControl('',[Validators.required,Validators.minLength(6),ShopValidators.notOnlyWhiteSpace]),
}),
billingAddress: this.formBuilder.group({
country: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
street: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
city: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
state: new FormControl('',[Validators.required,ShopValidators.notOnlyWhiteSpace]),
zipCode: new FormControl('',[Validators.required,Validators.minLength(6),ShopValidators.notOnlyWhiteSpace]),
})
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
//alert(this.checkoutFormGroup.get('customer').value.email);
if(this.checkoutFormGroup.invalid){
//alert('test');
this.checkoutFormGroup.markAllAsTouched();
return;
}

let order = new Order();
order.totalPrice = this.totalPrice;
order.totalQuantity = this.totalQuantity;

const cartItems = this.cartService.cartItems;

let orderItems: OrderItem[] = cartItems.map(temp=> new OrderItem(temp));

let purchase = new Purchase();

purchase.customer = this.checkoutFormGroup.controls['customer'].value;
purchase.customer.identity = genUniqueId();

purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
const shippingState: string = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
const shippingCountry: string = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
purchase.shippingAddress.state = shippingState;
purchase.shippingAddress.country = shippingCountry;

purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
const billingState: string = JSON.parse(JSON.stringify(purchase.billingAddress.state));
const billingCountry: string = JSON.parse(JSON.stringify(purchase.billingAddress.country));
purchase.billingAddress.state = billingState;
purchase.billingAddress.country = billingCountry;

purchase.order = order;
purchase.orderItems = orderItems;

this.checkoutService.placeOrder(purchase).subscribe({
next: response => {
//alert(`Your Order has been received.\nOrder Tracking Number:${response.orderTrackingNumber}`);
alert(`Your Order has been received.\nWe will get back you soon.`);
this.resetCart();
},
error: err => {
alert(`There was an error:${err.message}`);
}
});

}

get firstName(){ return this.checkoutFormGroup.get('customer.firstName');}
get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
get phone(){ return this.checkoutFormGroup.get('customer.phone');}
get email(){ return this.checkoutFormGroup.get('customer.email');}

get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street');}
get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city');}
get shippingAddressState(){ return this.checkoutFormGroup.get('shippingAddress.state');}
get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode');}
get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country');}

get billingAddressStreet(){ return this.checkoutFormGroup.get('billingAddress.street');}
get billingAddressCity(){ return this.checkoutFormGroup.get('billingAddress.city');}
get billingAddressState(){ return this.checkoutFormGroup.get('billingAddress.state');}
get billingAddressZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode');}
get billingAddressCountry(){ return this.checkoutFormGroup.get('billingAddress.country');}


/*
get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType');}
get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard');}
get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber');}
get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode');}
 */

copyShippingAddressToBillingAddress(event){
if(event.target.checked){
this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
}else{
this.checkoutFormGroup.controls.billingAddress.reset();
}
}

resetCart(){
this.cartService.cartItems = [];
this.cartService.totalQuantity.next(0);
this.cartService.totalPrice.next(0);

this.checkoutFormGroup.reset();

this.router.navigateByUrl("/products");
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
