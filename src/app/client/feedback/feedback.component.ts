import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbacks = {
    name: '',
    email: '',
    rating: null,
    comments: ''
  };
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private feedbackService: FeedbackService, private http: HttpClient) {}

  onSubmit() {
    if (this.feedbacks.name && this.feedbacks.email && this.feedbacks.rating && this.feedbacks.comments) {
      this.loading = true;
      this.http.post('http://localhost:3000/api/feedback/submit-feedback', this.feedbacks)
        .subscribe(
          (response: any) => {
            this.loading = false;
            this.successMessage = 'Thank you for your feedback!';
            this.errorMessage = '';
            // Reset form after submission
            this.feedbacks = { name: '', email: '', rating: null, comments: '' };
          },
          (error) => {
            this.loading = false;
            this.errorMessage = 'An error occurred while submitting your feedback. Please try again later.';
            this.successMessage = '';
          }
        );
    } else {
      this.errorMessage = 'Please fill in all fields before submitting.';
    }
  }
}
