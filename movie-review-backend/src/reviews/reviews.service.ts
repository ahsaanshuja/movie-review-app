import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: MongoRepository<Review>,
  ) {}

  private async findReviewOrFail(reviewId: string): Promise<Review> {
    const reviewObjectId = new ObjectId(reviewId);

    const result = await this.reviewRepository
      .aggregate([
        { $match: { _id: reviewObjectId } },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'movies',
            localField: 'movie',
            foreignField: '_id',
            as: 'movie',
          },
        },
        { $unwind: { path: '$movie', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            'user.password': 0,
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }

    return result[0] as Review;
  }

  async createReview(
    movieId: string,
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Review> {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      movie: new ObjectId(movieId),
      user: new ObjectId(user.id),
    });
    return this.reviewRepository.save(review);
  }

  async findReviewsByMovie(movieId: string): Promise<Review[]> {
    const movieObjectId = new ObjectId(movieId);

    return this.reviewRepository
      .aggregate([
        { $match: { movie: movieObjectId } },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            'user.password': 0,
          },
        },
      ])
      .toArray();
  }

  async updateReview(
    reviewId: string,
    updateReviewDto: UpdateReviewDto,
    user: User,
  ): Promise<Review> {
    const reviewObjectId = new ObjectId(reviewId);
    const review = await this.findReviewOrFail(reviewId);

    if ((review.user as any)._id.toString() !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to edit this review',
      );
    }

    await this.reviewRepository.updateOne(
      { _id: reviewObjectId },
      { $set: updateReviewDto },
    );

    return this.findReviewOrFail(reviewId.toString());
  }

  async deleteReview(reviewId: string, user: User): Promise<void> {
    const reviewObjectId = new ObjectId(reviewId);
    const review = await this.findReviewOrFail(reviewId);

    if ((review.user as any)._id.toString() !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to delete this review',
      );
    }

    await this.reviewRepository.deleteOne({ _id: reviewObjectId });
  }

  async findReviewById(reviewId: string): Promise<Review> {
    return this.findReviewOrFail(reviewId);
  }
}
