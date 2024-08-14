import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../common/decorators/user.decorator';
import { User } from '../auth/user.entity';
import { ReviewOwnerGuard } from './guards/review-owner.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('movies/:movieId/reviews')
  createReview(
    @Param('movieId') movieId: string,
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    return this.reviewsService.createReview(movieId, createReviewDto, user);
  }

  @Get('movies/:movieId/reviews')
  findReviews(@Param('movieId') movieId: string) {
    return this.reviewsService.findReviewsByMovie(movieId);
  }

  @Put('reviews/:id')
  @UseGuards(JwtAuthGuard, ReviewOwnerGuard)
  updateReview(
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: User,
  ) {
    return this.reviewsService.updateReview(reviewId, updateReviewDto, user);
  }

  @Delete('reviews/:id')
  @UseGuards(ReviewOwnerGuard)
  deleteReview(@Param('id') reviewId: string, @GetUser() user: User) {
    return this.reviewsService.deleteReview(reviewId, user);
  }
}
