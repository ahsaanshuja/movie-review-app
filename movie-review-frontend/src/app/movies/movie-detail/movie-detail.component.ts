import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  movie: any;
  reviews: any[] = [];
  reviewForm: FormGroup;
  userId: string | null = null;
  editingReviewId: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      comment: [''],
      rating: [''],
    });

    this.userId = this.getUserIdFromToken();
    this.loadMovieDetails();
    this.loadMovieReviews();
  }

  loadMovieDetails() {
    const movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovieById(movieId).subscribe((data) => {
      this.movie = { ...data };
    });
  }

  loadMovieReviews() {
    const movieId = this.route.snapshot.params['id'];
    this.moviesService.getReviewsByMovieId(movieId).subscribe((data) => {
      this.reviews = data;
    });
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.sub : null;
    }
    return null;
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }

  isLoggedInUser(reviewUserId: string): boolean {
    return this.userId === reviewUserId;
  }

  editReview(review: any) {
    this.editingReviewId = review._id;
    this.reviewForm.patchValue({
      comment: review.comment,
      rating: review.rating,
    });
  }

  addReview() {
    if (this.reviewForm.valid) {
      const movieId = this.route.snapshot.params['id'];

      if (this.editingReviewId) {
        this.moviesService
          .editReview(this.editingReviewId, this.reviewForm.value)
          .subscribe(() => {
            this.loadMovieReviews();
            this.reviewForm.reset();
            this.editingReviewId = null;
          });
      } else {
        this.moviesService
          .addReview(movieId, this.reviewForm.value)
          .subscribe(() => {
            this.loadMovieDetails();
            this.loadMovieReviews();
            this.reviewForm.reset();
          });
      }
    }
  }

  deleteReview(reviewId: string) {
    this.moviesService.deleteReview(reviewId).subscribe(() => {
      this.loadMovieReviews();
    });
  }
}
