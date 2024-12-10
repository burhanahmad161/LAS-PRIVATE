// import { Component } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// // import { Component } from '@angular/core';
// import { StripeFactoryService, StripeInstance } from "ngx-stripe";
// import { switchMap } from "rxjs";
// // import { environment } from "../environments/environment"

// interface IStripeSession {
//   id: string;
// }

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrl: './payment.component.css'
// })
// export class PaymentComponent {
//   public stripe!: StripeInstance;
//   public stripeAmount!: number;
//   isLoading: boolean = false;

//   constructor(private http: HttpClient,
//     private stripeFactory: StripeFactoryService) { }

//   ngOnInit(): void {
//     this.stripe = this.stripeFactory.create('sk_test_51QTW9CDiqcrh4bWVfxnwgMUj4We9MGO3gdM1EDIibpw9ZgaWs4edEBEm0y89dg4ooO95oCsB9m2AKelJYFIbP2N400PmImUXh2');
//     this.stripeAmount = 100;
//   }

//   checkout() {
//     this.isLoading = true;
//     const host = 'http://localhost:7000';
//     this.http.post(host + '/create-checkout-session', { data: { amount: this.stripeAmount * 100 } }, { observe: 'response' })
//       .pipe(
//         switchMap((response: HttpResponse<Object>) => {
//           const session: IStripeSession = response.body as IStripeSession;
//           return this.stripe.redirectToCheckout({ sessionId: session.id });
//         })
//       )
//       .subscribe(result => {
//         // If redirectToCheckout fails due to a browser or network
//         if (result.error) {
//           console.log(result.error)
//         }
//       });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StripeFactoryService, StripeInstance } from 'ngx-stripe';  // Correct import from ngx-stripe
import { switchMap } from 'rxjs';

interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']  // Corrected typo from styleUrl to styleUrls
})
export class PaymentComponent implements OnInit {
  public stripe!: StripeInstance;    // Declare Stripe instance
  public stripeAmount!: number;      // Declare stripeAmount
  isLoading: boolean = false;        // Declare isLoading for handling state

  constructor(
    private http: HttpClient,
    private stripeFactory: StripeFactoryService  // Inject StripeFactoryService
  ) {}

  ngOnInit(): void {
    // Directly assign the Stripe instance to this.stripe
    this.stripe = this.stripeFactory.create('pk_test_51QTW9CDiqcrh4bWVfxnwgMUj4We9MGO3gdM1EDIibpw9ZgaWs4edEBEm0y89dg4ooO95oCsB9m2AKelJYFIbP2N400PmImUXh2');
    this.stripeAmount = 100;  // Example amount in dollars
  }

  checkout() {
    this.isLoading = true;
    const host = 'http://localhost:3000';  // Your backend server URL
    
    // Call backend to create checkout session
    this.http.post(host + '/create-checkout-session', { data: { amount: this.stripeAmount * 100 } }, { observe: 'response' })
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          const session: IStripeSession = response.body as IStripeSession;  // Extract session ID
          return this.stripe.redirectToCheckout({ sessionId: session.id });  // Redirect to Stripe checkout
        })
      )
      .subscribe(result => {
        // If redirectToCheckout fails
        if (result.error) {
          console.log(result.error);
        }
      });
  }
}
