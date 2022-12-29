import { Component, OnInit } from '@angular/core';
import { ICart, ILogin, IProducts, ISignUp } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  constructor(private user: UserService, private products: SellerService) { }

  ngOnInit(): void {
    this.user.reloadUser();
  }

  SignUp(data: ISignUp) {
    this.user.userSignUp(data);
    console.warn(data);
    // this.localToRemoteCart();
  }

  Login(data: ILogin) {
    this.user.userLogin(data);
    console.warn(data);
    this.localToRemoteCart();
  }

  onLogin() {
    this.showLogin = true;
  }

  onSign() {
    this.showLogin = false;
  }

  localToRemoteCart() {
    let data = localStorage.getItem('localCart');   //get local cart data 
    let user = localStorage.getItem('user');  //get user 
    let userId = user && JSON.parse(user).id;   //push with id
    if (data) {
      let cartList: IProducts[] = JSON.parse(data);   //push local data in list

      cartList.forEach((product: IProducts, index) => {
        let cartData: ICart = {
          ...product,    // get all product details
          productId: product.id,
          userId
        }
        delete cartData.id;

        setTimeout(() => {
          this.products.addToCart(cartData).subscribe(res => {   // call add to cart api 
            if (res) {
              console.log('item in db');
            }
          })
        }, 500);
        if (cartList.length === index + 1) {    // to remove product from local storage 
          localStorage.removeItem('localCart')
        }
      })
    }

    setTimeout(() => {     // use this so that all apis don't work at same time
      this.products.getCartList(userId)   //call getcart service
    }, 2000)
  }
}
