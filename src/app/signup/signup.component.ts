import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name = "";
  email = "";
  password = "";
  confirmPassword = "";
  error = "";

  constructor(private router: Router) {}

  signup() {
    if (!this.name || !this.email || !this.password) {
      this.error = "All fields are required!";
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = "Passwords do not match!";
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup Success! Please Login.");

    // redirect to login page
    this.router.navigate(['/login']);
  }

}
