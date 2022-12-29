import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart, IPriceSummary } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: ICart[] | undefined;

  priceSummary: IPriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private products: SellerService, private router:Router) { }

  ngOnInit(): void {
    this.loadCartDetails();
  }

  removeToCart(cartId: number | undefined){

      cartId && this.cartData && this.products.removeCartDb(cartId).subscribe((res)=>{
       this.loadCartDetails();
        })
      }


  loadCartDetails(){
    this.products.currentCart().subscribe((res) => {
      this.cartData = res;
      console.warn(res)
      let price:number = 0;
      console.warn(typeof price)
      res.forEach((item) => {
        if (item.quantity) {
          let p = +item.price;
          let q = +item.quantity;
          // console.log(typeof p)
          //price = (price) + (+item.price); //(+) to change string value to numeric
          price = price + (p * q);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 100;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 100) + 100 - (price / 10);

      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    });
  }

  check(){
    this.router.navigate(['check']);
  }

}
