import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducts } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | IProducts[];
  cartItems=0;
  constructor(private route: Router, private products: SellerService) { }

  ngOnInit(): void {

    this.route.events.subscribe((r: any) => {
      if (r.url) {
        console.log(r.url)
        if (localStorage.getItem('seller') && r.url.includes('seller')) {
          console.log('seller-area');
          this.userType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.userType = 'user';
          //to update cart header 
          this.products.getCartList(userData.id)
        } else {
          console.warn('ouside-seller');
          this.userType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length;
    }
    this.products.cartData.subscribe(items=>{
      this.cartItems=items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(["/"]);
  }

  userLogOut(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.products.cartData.emit([]);   //to change cart data to 0 on header when user logout
  }

  onSearch(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.products.searchProducts(element.value).subscribe((res) => {
        console.log(res)
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchResult = res;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(["/details/" + id]);
  }

  onSubmit(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`]);

  }
}
