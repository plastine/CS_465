import { Component,OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripCard} from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
 
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripData: TripData,  private router: Router, private cdr: ChangeDetectorRef ) {
  

    console.log('trip-listing constructor');
}
public addTrip(): void {
  console.log('Inside TripListingComponent add trip');
  this.router.navigate(["add-trip"]);
}

private getStuff(): void {
  this.tripData.getTrips().subscribe({
    next: (value: any) => {
      console.log('RAW value from Angular:', value);
      console.log('Type:', typeof value);
      console.log('Is array?', Array.isArray(value));
      console.log('Length:', value?.length);

      this.trips = Array.isArray(value) ? [...value] : [];
      this.message = `Trips loaded: ${this.trips.length}`;

      console.log('Assigned trips:', this.trips);

      this.cdr.detectChanges();
    },
    error: (error: any) => {
      console.error('HTTP error:', error);
      this.message = 'Error loading trips';
      this.trips = [];
      this.cdr.detectChanges();
    }
  });
}
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
}
}
