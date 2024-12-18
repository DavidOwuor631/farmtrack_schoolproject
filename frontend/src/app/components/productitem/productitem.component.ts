import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-productitem',
  standalone: true,
  imports: [],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css'
})
export class ProductitemComponent {

  @Input() product!: Product;

  addToCart(product: Product): void {
    // should replace with real cart logic 
    console.log(`${product.name} added to cart.`);
  }

}
