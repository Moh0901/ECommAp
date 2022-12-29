import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart, IOrder } from 'src/app/model';

import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  totalPrice: undefined | number;
  cartData: undefined | ICart[];
  orderMsg: undefined | string;

  constructor(private products: SellerService, private router:Router) { }

  ngOnInit(): void {
    this.products.currentCart().subscribe((res) => {
      let price:number = 0;
      this.cartData=res;   //get all data to cart
      res.forEach((item) => {
        if (item.quantity) {
          let p = +item.price;
          let q = +item.quantity;     //(+) to change string value to numeric
          price = price + (p * q);
        }
      });
      this.totalPrice = price + (price / 100) + 100 - (price / 10);
      console.log(this.totalPrice);

    });
  }

  orderNow(data:IOrder){
    console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData: IOrder={
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
         item.id && this.products.deleteCartItems(item.id) // to check id is undefined or not
        },600)
      })

      this.products.orderNow(orderData).subscribe((res)=>{
        if(res){
          this.orderMsg = "Your Order is Placed";
          setTimeout(()=>{
            this.router.navigate(['my-order']);
            this.orderMsg=undefined;
          },4000)

        }
      })
    }
  }

}
