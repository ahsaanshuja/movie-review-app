import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  userReviews: any[] = [];
  editReviewForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.editReviewForm = this.fb.group({
      comment: [''],
      rating: [''],
    });

    this.loadUserReviews();
  }

  loadUserReviews() {
    this.userService.getUserReviews().subscribe((reviews) => {
      this.userReviews = reviews;
    });
  }

  updateReview(reviewId: string) {
    if (this.editReviewForm.valid) {
      this.userService
        .updateReview(reviewId, this.editReviewForm.value)
        .subscribe(() => {
          this.loadUserReviews(); // Refresh the list after update
        });
    }
  }

  deleteReview(reviewId: string) {
    this.userService.deleteReview(reviewId).subscribe(() => {
      this.loadUserReviews(); // Refresh the list after deletion
    });
  }
}
