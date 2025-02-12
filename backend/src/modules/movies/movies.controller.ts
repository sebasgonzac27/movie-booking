import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto, cover);
  }

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('genre') genre: string,
    @Query('language') language: string,
  ) {
    return this.moviesService.findAll({ genre, language, search });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.moviesService.findOne(slug);
  }

  @Get(':slug/functions')
  findFunctions(@Param('slug') slug: string) {
    return this.moviesService.findFunctions(slug);
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
