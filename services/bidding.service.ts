import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Bid {
  item: string;
  amount: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private bidsSubject = new BehaviorSubject<Bid[]>([]);
  bids$ = this.bidsSubject.asObservable();

  constructor() {}

  addBid(bid: Bid) {
    const currentBids = this.bidsSubject.value;
    this.bidsSubject.next([...currentBids, bid]);
  }

  getBids(): Bid[] {
    return this.bidsSubject.value;
  }
}
