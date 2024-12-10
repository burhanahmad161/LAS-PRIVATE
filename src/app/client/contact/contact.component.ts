import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name!: string;
  email!: string;
  message!: string;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const contactData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.http.post('http://localhost:3000/api/contact/contact-req', contactData)
      .subscribe((response: any) => {
        console.log('Contact form submitted successfully', response);
        // Handle the response, such as showing a success message
      }, (error: any) => {
        console.error('Error submitting contact form', error);
        // Handle the error, such as showing an error message
      });
  }
}