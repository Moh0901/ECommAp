import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderData: undefined | IOrder[];
  constructor(private products: SellerService) { }

  ngOnInit(): void {

    // to get list of order
    this.getOrderList();

  }

  cancelOrder(orderId: undefined| number){
    orderId && this.products.cancelOrder(orderId).subscribe((res)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.products.orderList().subscribe((res)=>{
      this.orderData=res;
  })
}

}
