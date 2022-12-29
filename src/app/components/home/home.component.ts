import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts: undefined | IProducts[]
  trendyProducts: undefined | IProducts[]
  constructor(private products: SellerService) { }

  ngOnInit(): void {
    this.products.popularProducts().subscribe((item: any) => {
      this.popularProducts = item;
    })
    this.products.trendyProducts().subscribe((data: any) => {
      this.trendyProducts = data;
    })
  }
}