import { Component } from '@angular/core';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {

  startDate = "";
  endDate = "";
  tripType = "";
  destination = "";
  budget = "";

  loading = false;

  timeline: any[] = []; // FIXED: Added this

  constructor(private ai: AiService) {}

  generateTrip() {

    if (!this.startDate || !this.endDate || !this.destination || !this.tripType) {
      alert("Please fill all fields!");
      return;
    }

    this.loading = true;
    this.timeline = [];

    const travelObject = {
      startDate: this.startDate,
      endDate: this.endDate,
      destination: this.destination,
      tripType: this.tripType,
      budget: this.budget
    };

    this.ai.generateTravelPlan(`
      Generate a day-wise trip itinerary.
      Return ONLY text. Do NOT return JSON.

      Format like:

      Day 1: Visit beach - try local food
      Day 2: Mountain hike - city tour

      User Input: ${JSON.stringify(travelObject)}
    `)
    .subscribe({
      next: (res) => {
        const text = res.candidates[0]?.content?.parts[0]?.text || "";

        // Convert text to timeline format
        this.timeline = text
          .split("\n")
          .filter(line => line.includes(":"))
          .map(line => {
            const [title, details] = line.split(":");
            return {
              title: title.trim(),
              details: details.trim()
            };
          });

        this.loading = false;
      },
      error: () => {
        alert("API Error");
        this.loading = false;
      }
    });
  }
}
