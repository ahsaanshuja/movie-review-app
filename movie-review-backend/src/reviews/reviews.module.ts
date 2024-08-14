import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewOwnerGuard } from './guards/review-owner.guard';
import { MoviesModule } from 'src/movies/movies.module';
import { User } from 'src/auth/user.entity';
import { Movie } from 'src/movies/movie.entity';

@Module({
  imports: [MoviesModule, TypeOrmModule.forFeature([Review, User, Movie])],
  providers: [ReviewsService, ReviewOwnerGuard],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
