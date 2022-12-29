import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICart, IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productData: undefined | IProducts;
  productQuantity = 1;
  removeItem = false; // to show  remove button
  cartData: undefined | IProducts;

  constructor(private activeRoute: ActivatedRoute, private products: SellerService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);

    productId && this.products.getProductById(productId).subscribe(res => {
      console.log(res);
      this.productData = res;
    });

    //to check product is already in cart 
    let cart = localStorage.getItem('localCart');
    if (productId && cart) {
      let items = JSON.parse(cart);
      items = items.filter((item: IProducts) => productId == item.id.toString())
      if (items.length) {
        this.removeItem = true;
      } else {
        this.removeItem = false;
      }
    }
    let user = localStorage.getItem('user');
    if(user){
      let userId = user && JSON.parse(user).id; 
      this.products.getCartList(userId);
      //to not cart data to zero on header while refeshing browser
      this.products.cartData.subscribe((result)=>{
       let item = result.filter((item:IProducts) => productId?.toString() === item.productId?.toString())
        if(item.length){
          this.cartData = item[0];   // to get id of cartitem 
          this.removeItem = true;
        }
      })
    }
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'minus') {
      this.productQuantity -= 1;
    }
  }

  toCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;

      if (!localStorage.getItem('user')) { //user not logged in
        // console.log(this.productData);
        this.products.localToCart(this.productData);
        this.removeItem = true;   //to show remove cart on click add cart
      } else{   //user logged in
        console.log('logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;   //get user id 

        console.log(userId);
        
        let cart: ICart={
          ...this.productData,   //full details of product
          userId,
          productId: this.productData.id,
        }
        console.warn(cart);   //get user id with product data 

        delete cart.id;
        console.log(cart);
        // call api of add to cart
        this.products.addToCart(cart).subscribe(res=>{ 
          //to update cart on header
          if(res){
            this.products.getCartList(userId);
            this.removeItem = true;   //to show remove cart on click add cart
          }
        })
        
      }
    }
  }

  removeCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.products.removeToCart(productId);
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;  //get user id 
      console.log(this.cartData);
      this.cartData && this.products.removeCartDb(this.cartData.id).subscribe((res)=>{
        if(res){
          this.products.getCartList(userId);   
        }
      })
    }
    this.removeItem = false;  //to show add to cart on click remove cart... work on both conditions
  }


}


