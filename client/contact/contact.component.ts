import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor() {}

  onSubmit(): void {
    // Dummy function to simulate form submission
    console.log('Form Submitted:', this.contact);

    // Clear form fields after submission
    this.contact.name = '';
    this.contact.email = '';
    this.contact.message = '';

    // Optionally, you can show a success message or redirect the user
    alert('Thank you for contacting us! We will get back to you soon.');
  }

}
