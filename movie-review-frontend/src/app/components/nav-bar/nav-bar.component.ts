import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private router: Router, private store: Store) {}

  navigateHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.store.dispatch(logout());
    localStorage.removeItem('token'); // Clear token from local storage
    this.router.navigate(['/login']);
  }
}
