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
import { ToastrService } from 'ngx-toastr';
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
             private authService: AuthServiceService,
             private toastr: ToastrService
/* @Inject(OKTA_AUTH) private oktaAuth: OktaAuth */){

 this.storage.setItem('authError',JSON.stringify("true"));
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
if(JSON.parse(this.storage.getItem('phone'))!=null){
  this.phone = JSON.parse(this.storage.getItem('phone'));
  this.isDisabled = false;
}
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
message.otp = this.otp;

            if(this.phone == "9944370922" ) {
              message.identity = '870306080171';
            }else {
              message.identity = genUniqueId();
            }


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
    this.storage.setItem('authError',JSON.stringify("false"));
  },
  error: err => {
    console.log(`There was an error:${err.message}`);
    this.storage.setItem('phone',JSON.stringify(message.phone));
    this.errorMsg = "OTP is wrong, please enter correct one."
    return;
  }
  });
this.storage.setItem('orderHistory',JSON.stringify("true"));

 //window.location.reload();
location.reload();
this.router.navigateByUrl("product/getProducts");
//alert(`Login Successfully.${response.data}`);
},
error: err => {
//alert(`There was an error:${err.message}`);
 console.log(`There was an error:${err.message}`);
//this.router.navigateByUrl("/login");
    this.errorMsg = "OTP is wrong, please enter correct one."
return;
}
});


//this.errorMsg="";
//this.router.navigateByUrl("product/getProducts");
//this.storage.setItem('orderHistory',JSON.stringify("true"));
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
//message.identity = genUniqueId();

this.storage.setItem('phone',JSON.stringify(this.phone));

if(this.storage.getItem('oco') && this.storage.getItem('today')
            && parseInt(this.storage.getItem('oco')) === 5 && this.storage.getItem('today') == JSON.stringify(new Date().toISOString().split('T')[0]))
{
  this.toastr.warning("Exceeds the OTP limit Today.\nPlease try on tomorrow.","OTP Exceeds!");
  return;
}else{
    if(this.storage.getItem('oco')!=null && parseInt(this.storage.getItem('oco'))<5){
      this.storage.setItem('oco',JSON.stringify(parseInt(this.storage.getItem('oco')) + 1));
    }else{
      this.storage.setItem('today',JSON.stringify(new Date().toISOString().split('T')[0]));
      this.storage.setItem('oco',JSON.stringify(1));
    }
}

this.otpService.RequestOtp(message).subscribe({
next: response => {
this.errorMsg = "OTP has been sent Successfully, Please enter the same.";
this.isDisabled = true;
},
error: err => {
//alert(`There was an error:${err.message}`);
 console.log(`There was an error:${err.message}`);
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

