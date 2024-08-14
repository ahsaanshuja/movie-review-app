import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  NavigationEnd,
  Event as NavigationEvent,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppState } from './state/app.state';
import { loginSuccess } from './state/auth/auth.actions';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'movie-review-frontend';
  showNavBar = true;
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.store.dispatch(
        loginSuccess({
          token,
          user: this.authService.getUserFromLocalStorage(),
        })
      );
    }
  }
}
