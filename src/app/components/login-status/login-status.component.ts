import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
/* import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js'; */

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

isAuthenticated: boolean = false;
userFullName: string = '';
orderHistory: boolean = false;

storage: Storage = localStorage;

constructor(/* private oktaAuthService: OktaAuthStateService,
@Inject(OKTA_AUTH) private oktaAuth: OktaAuth */private route: ActivatedRoute,
                                                             private router: Router){}

ngOnInit(): void{
/*   this.oktaAuthService.authState$.subscribe(
    (result)=> {
      this.isAuthenticated = result.isAuthenticated;
      this.getUserDetails();
    }
  ); */
  this.orderHistory = JSON.parse(this.storage.getItem('orderHistory'));
}

getUserDetails(){
/*   if(this.isAuthenticated){
    this.oktaAuth.getUser().then(
      (res)=> {
        this.userFullName = res.user as string;

        const theEmail = res.email;
        this.storage.setItem('userEmail',JSON.stringify(theEmail));
      }
    );
  } */
}

logout(){
  /* this.oktaAuth.signOut(); */
  this.storage.clear();
  location.reload();
  this.router.navigateByUrl("product/getProducts");
}

}