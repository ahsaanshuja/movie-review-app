import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/movies`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addMovie(movie: {
    title: string;
    genre: string;
    description: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, movie);
  }

  getMovieById(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${movieId}`);
  }

  addReview(movieId: string, review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${movieId}/reviews`, review);
  }

  getReviewsByMovieId(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${movieId}/reviews`);
  }

  editReview(reviewId: string, review: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/reviews/${reviewId}`, review);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reviews/${reviewId}`);
  }
}
