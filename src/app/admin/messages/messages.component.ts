import { Component } from '@angular/core';
import { ContactRequestService } from '../../services/contact-request.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  contactRequests: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private contactRequestService: ContactRequestService) {}

  ngOnInit(): void {
    this.loadContactRequests();
  }

  loadContactRequests(): void {
    this.contactRequestService.getContactRequests().subscribe({
      next: (data) => {
        this.contactRequests = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading contact requests.';
        this.loading = false;
      }
    });
  }

  markAsRead(contactId: string): void {
    this.contactRequestService.markAsRead(contactId).subscribe({
      next: (updatedRequest) => {
        // Update the contact request in the UI after marking it as read
        const index = this.contactRequests.findIndex(request => request._id === updatedRequest._id);
        if (index !== -1) {
          this.contactRequests[index].isRead = true;
        }
      },
      error: (err) => {
        console.error('Error marking as read:', err);
      }
    });
  }
}
