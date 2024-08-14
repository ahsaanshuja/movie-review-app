import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsService } from '../reviews.service';

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
  constructor(private reviewsService: ReviewsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reviewId = request.params?.id;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const review = await this.reviewsService.findReviewById(reviewId);
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }

    if ((review.user as any)._id.toString() !== user.id) {
      throw new UnauthorizedException(
        'You are not allowed to modify this review',
      );
    }

    return true;
  }
}
