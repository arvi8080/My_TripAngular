import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private router: Router) {}

  // -------- LOGIN FUNCTION USING LOCAL STORAGE --------
  login() {
    const userData = localStorage.getItem("user");

    if (!userData) {
      this.error = "No user found! Please sign up first.";
      return;
    }

    const user = JSON.parse(userData);

    if (this.email === user.email && this.password === user.password) {
      alert("Login Successful!");
      localStorage.setItem("loggedIn", "true");
      this.router.navigate(['/dashboard']);
    } else {
      this.error = "Invalid Email or Password!";
    }
  }
}
