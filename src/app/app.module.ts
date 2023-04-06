import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from "@angular/material/icon";

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
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { Router } from '@angular/router';
import { Injector } from '@angular/core';

import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AlertComponent } from './components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './components/about/about.component';
import { SliderComponent } from './components/slider/slider.component';
import { AnimateComponent } from './components/animate/animate.component';

const routes: Routes = [
{path: 'login/callback', component: LoginComponent},
{path: 'login', component: LoginComponent},

{path: 'product/getInfo/:id', component: ProductDetailsComponent},
{path: 'product/getProducts/search/:keyword', component: ProductListComponent},
{path: 'product/getProducts/:id', component: ProductListComponent},
{path: 'product/getProducts', component: ProductListComponent},
{path: 'checkout', component: CheckoutComponent},
{path: 'cart-details', component: CartDetailsComponent},
{path: 'order-history', component: OrderHistoryComponent},
{path: 'alert', component: AlertComponent},
{path: 'about', component: AboutComponent},
{path: '', redirectTo: 'product/getProducts', pathMatch: 'full'},
{path: '**', redirectTo: 'product/getProducts', pathMatch: 'full'}
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
    OrderHistoryComponent,
    AlertComponent,
    AboutComponent,
    SliderComponent,
    AnimateComponent
  ],
  imports: [
    RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'}),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    ReactiveFormsModule,
  MatButtonModule,
  MatInputModule,
    MatBadgeModule,
  FormsModule,
  MatCardModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot()
  ],
  providers: [ProductService , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
