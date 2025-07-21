import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  standalone: false,
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss',
})
export class SellerAuthComponent {
  authError:String='';
  showLogin=false;
  constructor(private seller: SellerService,private route:Router) {}
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: any): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: any): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
      }
    })
    
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }
}
