import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

isAuthenticated: boolean = false;
userFullName: string = '';
orderHistory: boolean = false;
memberShow: boolean = false;

storage: Storage = localStorage;

constructor(private route: ActivatedRoute,
            private authService: AuthServiceService,
            private router: Router){
                                                }

ngOnInit(): void{
  let customer = new Customer();
  customer.phone = JSON.parse(this.storage.getItem('phone'));
  customer.identity = JSON.parse(this.storage.getItem('identity'));

  if(customer.phone == '9944370922' && customer.identity == '870306080171'){
  this.authService.getAuthenticateDetail(customer).subscribe({
  next: response => {
    this.memberShow = true;
  },
  error: err => {
   this.memberShow = false;
   console.log(`There was an error:${err.message}`);
  }
  });
  }

  this.orderHistory = JSON.parse(this.storage.getItem('orderHistory'));
}

getUserDetails(){
this.ngOnInit();
}

logout(){
  this.storage.clear();
  this.memberShow = false;
  //location.reload();
  //window.location.reload();
  window.location.href = window.location.href;
  this.router.navigateByUrl("product/getProducts");
}

}
