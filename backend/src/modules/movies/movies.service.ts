import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { GenresService } from '../genres/genres.service';
import { LanguagesService } from '../languages/languages.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly genresService: GenresService,
    private readonly languagesService: LanguagesService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { title, genres, languages } = createMovieDto;
    const slug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

    const existingMovie = await this.movieRepository.findOneBy({ slug });

    if (existingMovie) {
      throw new ConflictException('movie already exists');
    }

    const genreEntities = await Promise.all(
      genres.map(async (name) => this.genresService.findOrCreate(name)),
    );

    const languageEntities = await Promise.all(
      languages.map(async (name) => this.languagesService.findOrCreate(name)),
    );

    const movie = this.movieRepository.create({
      ...createMovieDto,
      slug,
      genres: genreEntities,
      languages: languageEntities,
    });

    return await this.movieRepository.save(movie);
  }

  async findAll({ genre, language }: { genre: string; language: string }) {
    return await this.movieRepository.find({
      relations: ['genres', 'languages', 'functions'],
      where: {
        genres: genre ? { name: genre } : undefined,
        languages: language ? { name: language } : undefined,
      },
      relationLoadStrategy: 'query',
    });
  }

  async findOne(slug: string) {
    const movie = await this.movieRepository.findOne({
      where: { slug },
      relations: ['genres', 'languages', 'functions'],
    });
    if (!movie) {
      throw new NotFoundException(`movie with slug ${slug} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const { genres, languages, ...updateData } = updateMovieDto;

    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres', 'languages', 'functions'],
    });

    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);

    let genreEntities = movie.genres;

    if (genres) {
      genreEntities = await Promise.all(
        genres.map(async (name) => this.genresService.findOrCreate(name)),
      );
    }

    let languageEntities = movie.languages;

    if (languages) {
      languageEntities = await Promise.all(
        languages.map(async (name) => this.languagesService.findOrCreate(name)),
      );
    }

    Object.assign(movie, updateData, {
      genres: genreEntities,
      languages: languageEntities,
    });

    return this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const result = await this.movieRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`movie with id ${id} not found`);
    }
    return result;
  }
}
