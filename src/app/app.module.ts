import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { HomeComponent } from './components/home/home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerEditProductComponent } from './components/seller-edit-product/seller-edit-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrderComponent } from './components/my-order/my-order.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserAuthComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    HomeComponent,
    SellerAddProductComponent,
    SellerEditProductComponent,
    SearchComponent,
    ProductDetailComponent,
    CartPageComponent,
    CheckOutComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
