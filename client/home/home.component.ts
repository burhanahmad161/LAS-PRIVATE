import { Component, OnInit } from '@angular/core';

interface Auction {
  id: number;
  title: string;
  description: string;
  image: string;
  timeLeft: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  // featuredAuctions: any[] = [];
  upcomingAuctions: any[] = [];

  featuredAuctions: Auction[] = [
    {
      id: 1,
      title: 'Antique Vase',
      description: 'A beautiful antique vase from the Ming Dynasty.',
      image: 'assets/vase.jpg',
      timeLeft: '2h 45m'
    },
    {
      id: 2,
      title: 'Vintage Car',
      description: 'A restored vintage car from the 1960s.',
      image: 'assets/car.jpg',
      timeLeft: '5h 30m'
    },
    {
      id: 3,
      title: 'Modern Art',
      description: 'A stunning piece of modern art by a renowned artist.',
      image: 'assets/painting.jpg',
      timeLeft: '1d 4h'
    }
    // Add more auctions as needed
  ];

  constructor() {}

  ngOnInit(): void {
    // this.loadFeaturedAuctions();
    this.loadUpcomingAuctions();
  }

  // loadFeaturedAuctions(): void {
  //   this.featuredAuctions = [
  //     {
  //       id: 1,
  //       title: 'Vintage Car',
  //       description: 'A classic 1965 Ford Mustang in pristine condition.',
  //       image: 'assets/car.jpg',
  //       timeLeft: '2 days 5 hours'
  //     },
  //     {
  //       id: 2,
  //       title: 'Rare Painting',
  //       description: 'An original painting by renowned artist Jane Doe.',
  //       image: 'assets/painting.jpg',
  //       timeLeft: '1 day 12 hours'
  //     },
  //     {
  //       id: 3,
  //       title: 'Antique Vase',
  //       description: 'A beautiful porcelain vase from the Ming Dynasty.',
  //       image: 'assets/vase.jpg',
  //       timeLeft: '3 days 8 hours'
  //     }
  //   ];
  // }

  loadUpcomingAuctions(): void {
    this.upcomingAuctions = [
      {
        id: 4,
        title: 'Gold Jewelry Collection',
        description: 'A collection of exquisite gold jewelry pieces.',
        image: 'assets/gold.jpg',
        startDate: new Date('2024-09-01')
      },
      {
        id: 5,
        title: 'Luxury Watches',
        description: 'High-end watches from top luxury brands.',
        image: 'assets/watch.jpg',
        startDate: new Date('2024-09-10')
      },
      {
        id: 6,
        title: 'Antique Furniture',
        description: 'Rare and valuable antique furniture pieces.',
        image: 'assets/furniture.jpg',
        startDate: new Date('2024-09-15')
      }
    ];
  }
}
