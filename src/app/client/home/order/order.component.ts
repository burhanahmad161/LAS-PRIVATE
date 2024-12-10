import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  order = {
    phone: '',
    address: ''
  };

  stripePromise = loadStripe('pk_test_51QTW9CDiqcrh4bWVQgHyytOYjwx35X8Z8KvduC0hiXzowe4rP2K067uwPYtn9MLojjjZBhl0y2XoWPgj26lvsDZr00RimEchqW'); // Use your own Stripe public key

  constructor(private router: Router) {}

  async onSubmit(form: any) {
    if (form.valid) {
      // Call your backend API to create a Stripe Checkout session
      try {
        const sessionId = await this.createStripeCheckoutSession();
        
        // Redirect to Stripe Checkout page
        const stripe = await this.stripePromise;
        stripe?.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error('Error creating Stripe session:', error);
      }
    }
  }

  // Function to call backend API to create the Stripe session
  private async createStripeCheckoutSession() {
    const response = await fetch('http://localhost:3000/api/stripe/api/create-checkout-session', { // Adjust the URL depending on where you defined the route
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: this.order.phone,
        address: this.order.address,
        amount: 1000  // Amount in cents (e.g., 1000 = $10.00)
      })
    });
    
    const session = await response.json();
    return session.id;
  }
}