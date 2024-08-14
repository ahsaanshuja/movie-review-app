import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  findMovies(@Query('title') title?: string, @Query('genre') genre?: string) {
    return this.moviesService.findMovies(title, genre);
  }

  @Get(':id')
  findMovieById(@Param('id') id: string) {
    return this.moviesService.findMovieById(id);
  }
}
