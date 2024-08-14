import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { AuthGuard } from './state/auth/auth.guard';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent, canActivate: [AuthGuard] },

  {
    path: 'movies/:id',
    component: MovieDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
