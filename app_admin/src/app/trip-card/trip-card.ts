import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Trip } from "../models/trip";
import { CommonModule } from '@angular/common';
import { AuthenticationService } from "../services/authentication";

@Component({
  selector: "app-trip-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./trip-card.html",
  styleUrls: ["./trip-card.css"],
})
export class TripCard implements OnInit {
  @Input() trip!: Trip;
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  public editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(["edit-trip"]);
  }

  public isLoggedIn()
{
return this.authenticationService.isLoggedIn();
}
}