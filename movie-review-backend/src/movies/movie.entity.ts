import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';
import { Review } from '../reviews/review.entity';
import { ObjectId } from 'mongodb';

@Entity('movies')
export class Movie {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  description: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
