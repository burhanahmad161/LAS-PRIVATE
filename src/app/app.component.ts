import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Live-Auction-System';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onActivate(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }
  }