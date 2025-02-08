import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query('genre') genre: string, @Query('language') language: string) {
    return this.moviesService.findAll({ genre, language });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.moviesService.findOne(slug);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(+id);
  }
}
