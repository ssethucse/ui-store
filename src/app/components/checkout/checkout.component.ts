import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validator, Validators } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

totalPrice: number = 0;
totalQuantity: number = 0;

creditCardMonths: number[] = [];
creditCardYears: number[] = [];

checkoutFormGroup: FormGroup;
constructor(private formBuilder: FormBuilder,
            private shopFormService: ShopFormService){
}

ngOnInit(): void{
this.checkoutFormGroup = this.formBuilder.group({
customer: this.formBuilder.group({
firstName: new FormControl('',[Validators.required,Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
lastName: new FormControl('',[Validators.required,Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$')])
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
}),
creditCard: this.formBuilder.group({
cardType: new FormControl('',[Validators.required]),
nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhiteSpace]),
cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
expirationMonth: [''],
expirationYear: ['']
})
})

//populate creditCard months
const startMonth: number = new Date().getMonth()+1;

this.shopFormService.getCreditCardMonths(startMonth).subscribe(
data=>{
this.creditCardMonths = data;
});

this.shopFormService.getCreditCardYears().subscribe(
data=>{
this.creditCardYears = data;
});

}

onSubmit(){
//alert(this.checkoutFormGroup.get('customer').value.email);
if(this.checkoutFormGroup.invalid){
this.checkoutFormGroup.markAllAsTouched();
}
}

get firstName(){ return this.checkoutFormGroup.get('customer.firstName');}
get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
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


get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType');}
get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard');}
get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber');}
get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode');}

copyShippingAddressToBillingAddress(event){
if(event.target.checked){
this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
}else{
this.checkoutFormGroup.controls.billingAddress.reset();
}
}

handleMonthsAndYears(){
const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
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
);
}

}
