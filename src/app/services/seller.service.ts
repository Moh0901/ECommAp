import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart, ILogin, IOrder, IProducts, ISignUp } from '../model';
import { Router } from '@angular/router';
import { BehaviorSubject, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn = new BehaviorSubject<boolean>(false);
  cartData = new EventEmitter<[] | IProducts[]>();
  url = "http://localhost:3000/";

  sellerSignUp(data: ISignUp) {
    return this.http.post(this.url + "seller", data, { observe: 'response' }).subscribe((res) => {
      this.isLoggedIn.next(true)
      localStorage.setItem('seller', JSON.stringify(res.body));
      this.router.navigate(["seller-home"])
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isLoggedIn.next(true);
      this.router.navigate(["seller-home"]);
    }
  }

  sellerLogin(data: ILogin) {
    return this.http.get
      (this.url + `seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.body && res.body.length) {
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(["seller-home"])
          console.log("Login Successfully");
        } else {
          console.warn("Login Failed");
        }
      });
  }

  ////////////////////////////////////Product Services/////////////////////////////////////////////

  addProduct(data: IProducts) {
    return this.http.post(this.url + "products", data)
  }

  showProduct() {
    return this.http.get<IProducts[]>(this.url + "products");
  }

  removeProduct(id: number) {
    return this.http.delete(this.url + `products/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<IProducts>(this.url + `products/${id}`)
  }

  updateProduct(product: IProducts) {
    return this.http.put(this.url + `products/${product.id}`, product)
  }

  popularProducts() {
    return this.http.get<IProducts[]>(this.url + "products?_limit=3")
  }

  trendyProducts() {
    return this.http.get<IProducts[]>(this.url + "products?_limit=4")
  }

  searchProducts(query: string) {
    return this.http.get<IProducts[]>(this.url + `products?q=${query}`)
  }

  localToCart(data: IProducts) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);  // when cart is 0 bnot update cart header so this require to count(0)+1
    } else {
      //this work when cart have atleast one item
      cartData = JSON.parse(localCart);
      cartData.push(data);   //new cart data pushed in prevoius cart array
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeToCart(productId: number) {
    let cartData = localStorage.getItem('localCart');

    if (cartData) {
      let items: IProducts[] = JSON.parse(cartData);
      items = items.filter((item: IProducts) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      console.log(items);
      this.cartData.emit(items);
    }
  }

  addToCart(cart: ICart) {
    return this.http.post(this.url + "cart", cart)
  }

  getCartList(userId: number) {
    return this.http.get<IProducts[]>(this.url + 'cart?userId=' + userId,
    { observe: 'response', })
      .subscribe((res) => {
        console.log(res);
        if (res && res.body) {
          this.cartData.emit(res.body);
        }
    });
  }

  //to remove cart item form db
  removeCartDb(cartId:number){
    return this.http.delete(this.url + "cart/" + cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<ICart[]>(this.url + 'cart?userId='+userData.id);
  }

  orderNow(data: IOrder){
    return this.http.post(this.url + 'orders', data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<IOrder[]>(this.url + 'orders?userId='+userData.id);
  }

  deleteCartItems(cartId:number){
    return this.http.delete(this.url + "cart/" + cartId, { observe: 'response', }).subscribe((res) => {
      if(res){
        this.cartData.emit([])
      }
    });
  }

  cancelOrder(orderId:number){
    return this.http.delete(this.url +"orders/"+ orderId);
  }
}
