import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, ISignUp } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  url = "http://localhost:3000/";

  userSignUp(user: ISignUp) {
    return this.http.post(this.url + "users", user, { observe: 'response' }).subscribe((res) => {
      // this.isLoggedIn.next(true)
      localStorage.setItem('user', JSON.stringify(res.body));
      this.router.navigate(["/"])
    });
  }
 
  userLogin(user: ILogin) {
    return this.http.get<ISignUp[]>(this.url +  `users?email=${user.email}&password=${user.password}`, { observe: 'response' })
    .subscribe((res)=>{
      console.log(res);
      if(res && res.body){
        localStorage.setItem('user', JSON.stringify(res.body[0]));
      this.router.navigate(["/"])
      }
    })
  }

  reloadUser() {
    if (localStorage.getItem('user')) {
      // this.isLoggedIn.next(true);
      this.router.navigate(["/"]);
    }
  }
}


