import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | IProducts[];
  icon=faTrash;
  icon1=faEdit;
  constructor(private products:SellerService) { }


  ngOnInit(): void {
    this.products.showProduct().subscribe(res=>{
      console.log(res);
      this.productList=res;
    })
  }

  deleteProduct(id:number){
    this.products.removeProduct(id).subscribe(res=>{
      console.warn(res);
      this.ngOnInit();
    })
  }

}
