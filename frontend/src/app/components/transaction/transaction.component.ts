import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  constructor(private router: Router) {}

  products: Product[] = [
    { id: 1, name: 'Organic Apples', price: 1.99, quantity: 50, image: 'assets/images/apple.jpg' },
    { id: 2, name: 'Fresh Bananas', price: 0.99, quantity: 30, image: 'assets/images/banana.jpg' },
    { id: 3, name: 'Carrots', price: 2.49, quantity: 40, image: 'assets/images/carrots.jpg' },
    { id: 4, name: 'Tomatoes', price: 3.49, quantity: 20, image: 'assets/images/tomatoes.jpg' }
  ];

  cart: Product[] = [];

  get cartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    // Reduce product quantity
    const productIndex = this.products.findIndex(p => p.id === product.id);
    if (this.products[productIndex].quantity > 0) {
      this.products[productIndex].quantity -= 1;
    }
  }
  proceedToPayment(): void {
    // Create an object to hold the cart data, including the total amount
    const cartData = {
      items: this.cart,
      totalAmount: this.cartTotal
    };
  
    // Save the cart data to localStorage (or use a service for better scalability)
    localStorage.setItem('cartData', JSON.stringify(cartData));
  
    // Navigate to the checkout page
    this.router.navigate(['/checkout']);
  }
  
}
