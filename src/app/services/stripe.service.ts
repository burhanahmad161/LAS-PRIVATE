import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class _StripeFactoryService {
    private stripePromise = loadStripe('pk_test_51QTW9CDiqcrh4bWVQgHyytOYjwx35X8Z8KvduC0hiXzowe4rP2K067uwPYtn9MLojjjZBhl0y2XoWPgj26lvsDZr00RimEchqW');
    
  constructor() {}

  getStripe() {
    return this.stripePromise;
  }
}
