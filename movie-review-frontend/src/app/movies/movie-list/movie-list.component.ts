import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesService } from '../movies.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  movies: any[] = [];
  isAdmin: boolean = false;
  addMovieForm: FormGroup;
  @ViewChild('addMovieDialog') addMovieDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.addMovieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.checkAdminStatus();
    this.loadMovies();
  }

  checkAdminStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      this.isAdmin = decodedToken?.isAdmin || false;
    }
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }

  loadMovies() {
    this.moviesService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  openAddMovieDialog() {
    this.dialogRef = this.dialog.open(this.addMovieDialog);
  }

  closeAddMovieDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.addMovieForm.valid) {
      this.moviesService.addMovie(this.addMovieForm.value).subscribe(() => {
        this.loadMovies(); // Refresh the list after adding
        this.addMovieForm.reset(); // Reset the form
        this.closeAddMovieDialog(); // Close the dialog
      });
    }
  }

  viewDetails(movieId: string) {
    this.router.navigate([`/movies/${movieId}`]); // Navigate to the movie details page
  }
}
