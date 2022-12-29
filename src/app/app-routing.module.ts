import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerEditProductComponent } from './components/seller-edit-product/seller-edit-product.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { AuthGuard } from './guard/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrderComponent } from './components/my-order/my-order.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'seller-auth', component: SellerAuthComponent
  },
  {
    path:'seller-home', component: SellerHomeComponent, canActivate: [AuthGuard]
  },
  {
    path:'seller-add-product', component: SellerAddProductComponent, canActivate: [AuthGuard]
  },
  {
    path:'seller-edit-product/:id', component: SellerEditProductComponent, canActivate: [AuthGuard]
  },
  {
    path:'search/:query', component: SearchComponent
  },
  {
    path:'details/:productId', component: ProductDetailComponent
  },
  {
    path:'user-auth', component: UserAuthComponent
  },
  {
    path:'cart', component: CartPageComponent
  },
  {
    path:'check', component: CheckOutComponent
  },
  {
    path:'my-order', component: MyOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
