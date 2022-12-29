import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  productData: undefined | IProducts

  constructor( private route:ActivatedRoute , private products:SellerService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId);
    productId && this.products.getProductById(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    })
  }

  submit(data:IProducts){
    // this.products.updateProduct(data)
    console.log(data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.products.updateProduct(data).subscribe(res=>{
      console.log(res)
      this.router.navigate(["seller-home"]);
    })
  }

}
