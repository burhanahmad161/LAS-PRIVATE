// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { loadStripe } from '@stripe/stripe-js';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrl: './order.component.css'
// })
// export class OrderComponent {
//     // Define the order object with properties for phone and address
//     order = {
//       phone: '',
//       address: ''
//     };
  
//     handler: any = null;
  
//     constructor() { }
  
//     ngOnInit() {
//       this.loadStripe();
//     }
  
//     pay(amount: any) {
//       var handler = (<any>window).StripeCheckout.configure({
//         key: 'pk_test_51QUHjKP7oFh0aMaVdf9teIcyZVqMDce5CZEBV4TGUyzPIl05Uaa1UIf4Ff9y79KhyUUvsjfE3JL3vqONuNvgONgU00hwW8YloP',
//         locale: 'auto',
//         token: function (token: any) {
//           // Handle the token
//           console.log(token);
//           alert('Token Created!!');
//         }
//       });
  
//       handler.open({
//         name: 'Demo Site',
//         description: '2 widgets',
//         amount: amount * 100
//       });
//     }
  
//     loadStripe() {
//       if (!window.document.getElementById('stripe-script')) {
//         var s = window.document.createElement("script");
//         s.id = "stripe-script";
//         s.type = "text/javascript";
//         s.src = "https://checkout.stripe.com/checkout.js";
//         s.onload = () => {
//           this.handler = (<any>window).StripeCheckout.configure({
//             // key: 'pk_test_51QUHjKP7oFh0aMaVdf9teIcyZVqMDce5CZEBV4TGUyzPIl05Uaa1UIf4Ff9y79KhyUUvsjfE3JL3vqONuNvgONgU00hwW8YloP',
//             key: 'pk_test_51QUHjKP7oFh0aMaVdf9teIcyZVqMDce5CZEBV4TGUyzPIl05Uaa1UIf4Ff9y79KhyUUvsjfE3JL3vqONuNvgONgU00hwW8YloP',
//             locale: 'auto',
//             token: function (token: any) {
//               // Handle the token
//               console.log(token);
//               alert('Payment Success!!');
//             }
//           });
//         };
//         window.document.body.appendChild(s);
//       }
//     }
//   }


import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // For navigation after payment success
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  order = {
    phone: '',
    address: '',
    email: ''
  };

  handler: any = null;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loadStripe();
  }

  pay() {
    if (!this.handler) {
      console.error('Stripe handler is not initialized.');
      return;
    }

    // Open Stripe Checkout for payment
    this.handler.open({
      name: 'Demo Site',
      description: 'Your Order',
      // amount: 2000, // Fixed amount for payment (20.00 units of currency, e.g., $20.00)
      // image: './src/assets/LAS logo.PNG',
    });
  }
  
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51QUHjKP7oFh0aMaVdf9teIcyZVqMDce5CZEBV4TGUyzPIl05Uaa1UIf4Ff9y79KhyUUvsjfE3JL3vqONuNvgONgU00hwW8YloP',
          locale: 'auto',
          token: (token: any) => {
            console.log('Received Token:', token);
            alert('Payment Successful!');
            // this.router.navigate(['/order-confirmation']);  // Redirect to the success page

            const paymentData = {
              token: token.id,  // Token from Stripe
              phone: this.order.phone,
              address: this.order.address,
              email: this.order.email,
              amount: 1111-1111,  // Amount in cents
              description: 'Your Order'
            };

            // Call backend API to save payment information
            this.http.post('http://localhost:3000/api/payment/save-payment', paymentData)
              .subscribe(response => {
                console.log('Payment data saved successfully:', response);
                this.router.navigate(['/order-confirmation']);  // Redirect to the success page
              }, error => {
                console.error('Error saving payment data:', error);
              });
          }
        });
      };
 
      
      window.document.body.appendChild(script);
    }
  }
}
