import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiKey = 'AIzaSyBw4eTEVhwzIEr6yhT3nyVb53b70U2o4zo';

  private flashUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  constructor(private http: HttpClient) {}

  // This version is not used by TripComponent anymore
  generateItinerary(data: any): Observable<any> {
    const prompt = `
Generate a professional trip itinerary with the following details:

Start Date: ${data.startDate}
End Date: ${data.endDate}
Destination: ${data.destination}
Trip Type: ${data.tripType}
Budget: ${data.budget}

Provide output in these sections:
1. Day-wise travel plan
2. Accommodation suggestions
3. Local food recommendations
4. Packing checklist
5. Travel safety tips
6. Estimated cost breakdown
    `;

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    return this.http.post(`${this.flashUrl}?key=${this.apiKey}`, body);
  }

  // This is the REAL function used by TripComponent
  generateTravelPlan(prompt: string): Observable<any> {
    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    return this.http.post(
      `${this.flashUrl}?key=${this.apiKey}`,
      body
    );
  }
}
