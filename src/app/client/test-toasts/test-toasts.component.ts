import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-toasts',
  templateUrl: './test-toasts.component.html',
  styleUrl: './test-toasts.component.css'
})
export class TestToastsComponent {
  constructor(private toastr: ToastrService) {}

  showToast() {
    this.toastr.success('Toast working!', 'Success');
  }
}
