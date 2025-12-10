import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check login status on each reload
    this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
  }

  logout() {
    localStorage.removeItem("loggedIn");
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
