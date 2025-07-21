import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {}

  submit(data: any) {
    this.product.addProduct(data).subscribe((result:any) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}
