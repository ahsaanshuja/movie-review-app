import {
  Entity,
  Column,
  ObjectIdColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Review } from '../reviews/review.entity';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
