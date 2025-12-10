import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideLayout = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();
      }
    });
  }

  checkRoute() {
    const current = this.router.url;

    // Hide navbar + footer on login and signup
    if (current.includes('login') || current.includes('signup')) {
      this.hideLayout = true;
    } else {
      this.hideLayout = false;
    }
  }
}
