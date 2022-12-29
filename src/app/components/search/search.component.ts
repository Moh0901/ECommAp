import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | IProducts[];
  constructor(private activeRoute: ActivatedRoute, private products:SellerService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);

    query && this.products.searchProducts(query).subscribe(res=>{
      this.searchResult=res;
    });
  }
}
