import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('reviews')
export class Review {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @Column()
  movie: ObjectId;

  @Column()
  user: ObjectId;
}
