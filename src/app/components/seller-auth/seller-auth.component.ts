import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ISignUp } from 'src/app/model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService, private router:Router) { }
  showLogin=true;

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  SignUp(data:ISignUp){
   this.seller.sellerSignUp(data);
   console.warn(data);
  }
  Login(data:ISignUp){
    console.log(data);
    this.seller.sellerLogin(data);
  }

  onlogin(){
    this.showLogin=true;
  }

  onSign(){
    this.showLogin=false;
  }
}
