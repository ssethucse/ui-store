import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MessageModel } from 'src/app/common/message-model';
import { Customer } from 'src/app/common/customer';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OtpService } from 'src/app/services/otp.service';
import { map } from 'rxjs/operators';
/* import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget'; */

import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

/* oktaSignin: any; */

username : string ="";
password : string ="";
phone: string="";
errorMsg: string = "Please Enter Mobile Number to Proceed.";
otp: string="";
isDisabled: boolean = true;

storage: Storage = localStorage;

constructor( private route: ActivatedRoute,
             private router: Router,
             private otpService: OtpService,
             private authService: AuthServiceService
/* @Inject(OKTA_AUTH) private oktaAuth: OktaAuth */){

 if(JSON.parse(this.storage.getItem('orderHistory'))){
   this.router.navigateByUrl("product/getProducts");
 }

/* this.oktaSignin = new OktaSignIn({
  logo: 'assets/images/logo.png',
  baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
  clientId: myAppConfig.oidc.clientId,
  redirectUri: myAppConfig.oidc.redirectUri,
  authParams: {
    pkce: true,
    issuer: myAppConfig.oidc.issuer,
    scopes: myAppConfig.oidc.scopes
  }
}); */
}

ngOnInit(): void{
  /* this.oktaSignin.remove();

  this.oktaSignin.renderEl({
    el: '#okta-sign-in-widget'},
    (response: any)=>{
      if(response.status=== 'SUCCESS'){
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error: any) => {
      throw error;
     }
    ); */
}


submit(){
if(this.otp=="" || this.otp==null){
this.errorMsg = "Please Enter OTP to Proceed";
this.storage.setItem('orderHistory',JSON.stringify("false"));
}else{

let message = new MessageModel();
let customer = new Customer();

message.phone = this.phone;
message.identity = genUniqueId();
message.otp = this.otp;

customer.phone = this.phone;
customer.identity = message.identity;

if(message.phone==null){
  message.phone = JSON.parse(this.storage.getItem('phone'));
}

this.otpService.ValidateOtp(message).subscribe({
next: response => {
this.storage.setItem('identity',JSON.stringify(message.identity));
this.storage.setItem('phone',JSON.stringify(message.phone));

this.authService.getAuthenticateDetail(customer).subscribe({
next: response => {
this.storage.setItem('authToken',JSON.stringify(`${response.data}`));
this.storage.setItem('orderHistory',JSON.stringify("true"));
},
error: err => {
alert(`There was an error:${err.message}`);
}
});


 //window.location.reload();
location.reload();
//alert(`Login Successfully.${response.data}`);
},
error: err => {
alert(`There was an error:${err.message}`);
}
});


this.errorMsg="";
this.router.navigateByUrl("product/getProducts");
this.storage.setItem('orderHistory',JSON.stringify("true"));
}
this.clear();
}

clear(){
this.phone ="";
this.password = "";
}

keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

check(value: string){
    if(value.length==10){
      this.isDisabled = false;
    }else{
    this.isDisabled = true;}
}

otpCall(){

let message = new MessageModel();
message.phone = this.phone;
message.identity = genUniqueId();

this.storage.setItem('phone',JSON.stringify(this.phone));

this.otpService.RequestOtp(message).subscribe({
next: response => {
this.errorMsg = "OTP has been sent Successfully, Please enter the same.";
},
error: err => {
alert(`There was an error:${err.message}`);
}
});

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


