import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

/* import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@Okta/okta-auth-js'; */
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { MembersPageComponent } from './components/members-page/members-page.component';

import myAppConfig from './config/my-app-config';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

/* const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig); */

 function sendToLoginPage(injector: Injector){
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
{path: 'order-history', component: OrderHistoryComponent /* canActivate: [true], data: { onAuthRequired: sendToLoginPage } */ },
{path: 'members', component: MembersPageComponent/* , canActivate: [false], data: { onAuthRequired: sendToLoginPage } */},
{path: 'login/callback', component: LoginComponent},
{path: 'login', component: LoginComponent},

{path: 'checkout', component: CheckoutComponent},
{path: 'cart-details', component: CartDetailsComponent},
{path: 'product/getInfo/:id', component: ProductDetailsComponent},
{path: 'product/getProducts/search/:keyword', component: ProductListComponent},
{path: 'product/getProducts/:id', component: ProductListComponent},
{path: 'product/getProducts', component: ProductListComponent},
{path: '', redirectTo: '/products', pathMatch: 'full'},
{path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  MatButtonModule,
  MatInputModule,
  FormsModule,
  MatCardModule
    /* OktaAuthModule */
  ],
  providers: [ProductService/* , { provide: OKTA_CONFIG, useValue: { oktaAuth }} */],
  bootstrap: [AppComponent]
})
export class AppModule { }
