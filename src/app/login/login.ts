import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.loginWithGoogle().then(() => {
      // Handle successful login
      console.log('Login successful');
      this.router.navigate(['/wp-chat']);
    }).catch(error => { 
      // Handle login error
      console.error('Login failed', error);
    });
  }
}
