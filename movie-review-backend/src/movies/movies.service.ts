import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async findMovies(title?: string, genre?: string): Promise<Movie[]> {
    const where: Record<string, any> = {};

    if (title) {
      where.title = { $regex: new RegExp(title, 'i') };
    }
    if (genre) {
      where.genre = { $regex: new RegExp(genre, 'i') };
    }

    return this.movieRepository.find({ where });
  }

  async findMovieById(id: string): Promise<Movie> {
    const movieObjectId = new ObjectId(id);

    const movie = await this.movieRepository.findOneBy({
      _id: movieObjectId,
    } as any);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }
}
