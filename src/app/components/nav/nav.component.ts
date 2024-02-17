import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { EmitterService } from '../../emmiter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.updateAuthenticationStatus();
      // Listen for router events to trigger an update when navigation occurs
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateAuthenticationStatus();
        }
      });
  }
  updateAuthenticationStatus(): void {
    this.http.get('http://localhost:5000/api/user', { withCredentials: true }).subscribe(
      (res: any) => {
        console.log('User is authenticated');
        EmitterService.authEmitter.emit(true);
        this.authenticated = true;
      },
      (err) => {
        console.log('User not authenticated:', err);
        EmitterService.authEmitter.emit(false);
        this.authenticated = false;
      }
    );
  }
  

  logout(): void {
    this.http.post('http://localhost:5000/api/logout', {}, { withCredentials: true }).subscribe(
      () => {
        console.log('Logout successful');
        this.updateAuthenticationStatus();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
        // Even if there's an error, attempt to update the authentication status
        this.updateAuthenticationStatus();
        this.router.navigate(['/login']);
      }
    );
  }
}
