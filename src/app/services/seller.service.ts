import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isLoginError = new EventEmitter<boolean>(false); 

  constructor(private http:HttpClient,private route:Router) { }
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);

  userSignUp(data:any){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.route.navigate(['seller-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.route.navigate(['seller-home'])
    }
  }
  userLogin(data:any){
    debugger;
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
     console.warn(result)
     if(result && result.body && result.body.length===1){
       this.isLoginError.emit(false)
       localStorage.setItem('seller',JSON.stringify(result.body))
       this.route.navigate(['seller-home'])
     }else{
       console.warn("login failed");
       this.isLoginError.emit(true)
     }
    })
   }

}
