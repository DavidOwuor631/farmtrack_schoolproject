/*import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  name!: string;
  address!: string;
  paymentMethod!: string

  onSubmit(): void {
    // Handle form submission and process payment
    console.log('Order confirmed');
    console.log(`Name: ${this.name}`);
    console.log(`Address: ${this.address}`);
    console.log(`Payment Method: ${this.paymentMethod}`);
  }

}
*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CheckoutComponent implements OnInit {
  cartData: any;
  items: any[] = [];
  totalAmount: number = 0;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  // Define the properties to bind with the form
  name: string = '';
  address: string = '';
  paymentMethod: string = 'creditCard'; // Default value

  ngOnInit(): void {
    // Retrieve the saved cart data
    const savedCartData = localStorage.getItem('cartData');
    if (savedCartData) {
      this.cartData = JSON.parse(savedCartData);
      this.items = this.cartData.items;
      this.totalAmount = this.cartData.totalAmount;
    }

    // Load PayPal script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AWaxKpMOJbH-K3hteX9MUcOE8HfzsCKtw9n6d1MWj_xX3L145cG5p2zJRCY-915QAhPLUfEsX83cd8Od&currency=USD';
    script.onload = () => {
      this.initializePayPalButton();
    };
    document.body.appendChild(script);
  }

  // Initialize PayPal Button
  initializePayPalButton(): void {
    if (window['paypal']) {
      window['paypal'].Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalAmount.toFixed(2), // Total amount from cart
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            console.log('Transaction details:', details);
          });
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
        },
      }).render(this.paymentRef.nativeElement);
    } else {
      console.error('PayPal SDK not loaded.');
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    console.log('Form submitted');
    console.log('Name:', this.name);
    console.log('Address:', this.address);
    console.log('Payment Method:', this.paymentMethod);
    console.log('Total:', this.totalAmount);

    if (this.paymentMethod === 'paypal') {
      alert('Please use the PayPal button to complete the payment.');
    } else {
      // Handle other payment methods (e.g., credit card)
      console.log('Processing credit card payment...');
    }
  }
}
