import { Component } from '@angular/core';
import { product } from '../models/model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {}

   ngOnInit(): void {
     this.product.popularProducts().subscribe((data)=>{
       this.popularProducts=data;
     })
 
     this.product.trendyProducts().subscribe((data)=>{
       this.trendyProducts=data;
     })
     this.startAutoSlide()
   }

   currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.popularProducts!.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.popularProducts!.length) % this.popularProducts!.length;
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // every 3 seconds
  }

}
