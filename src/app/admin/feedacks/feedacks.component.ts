import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedacks',
  templateUrl: './feedacks.component.html',
  styleUrl: './feedacks.component.css'
})
export class FeedacksComponent implements OnInit {
  feedbacks: any[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  // Fetch feedbacks from the backend
  getFeedbacks(): void {
    this.feedbackService.getFeedback().subscribe(
      (response) => {
        this.feedbacks = response;
      },
      (error) => {
        console.error('Error fetching feedbacks', error);
      }
    );
  }

  // Helper method to render the star rating
  getStarRating(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}