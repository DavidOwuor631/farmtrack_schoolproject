import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../app/models/CartItem';
import { Product } from '../app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject to maintain the cart's state
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Add an item to the cart
  addToCart(product: Product, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  // Remove an item from the cart by product ID
  removeFromCart(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  // Clear all items from the cart
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  // Get the current cart items as an array
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  // Calculate the total price of items in the cart
  getTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}

