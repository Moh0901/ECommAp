import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private products:SellerService, private router:Router) { }

  ngOnInit(): void {
  }

  addProduct(data:IProducts){
    // console.log(data);
    this.products.addProduct(data).subscribe(res=>{
      console.log(res);
      this.router.navigate(["seller-home"]);
    });
  }
}
