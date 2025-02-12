import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { ILike, Repository } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';
import { Function } from '../functions/entities/function.entity';
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
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createMovieDto: CreateMovieDto, cover: Express.Multer.File) {
    const queryRunner =
      this.movieRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { title, genres, languages, functions } = createMovieDto;
      const slug = slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });

      const existingMovie = await queryRunner.manager.findOne(Movie, {
        where: { slug },
      });
      if (existingMovie) {
        throw new ConflictException('Movie already exists');
      }

      const genreEntities = await this.genresService.findByIds(genres);
      const languageEntities = await this.languagesService.findByIds(languages);
      const urlCover = await this.firebaseService.uploadFile(cover);

      const movie = queryRunner.manager.create(Movie, {
        ...createMovieDto,
        slug,
        genres: genreEntities,
        languages: languageEntities,
        cover: urlCover,
      });

      const savedMovie = await queryRunner.manager.save(movie);

      if (functions && functions.length > 0) {
        const functionEntities = functions.map((func) =>
          queryRunner.manager.create(Function, {
            ...func,
            movie: savedMovie,
          }),
        );

        await queryRunner.manager.save(functionEntities);
      }

      await queryRunner.commitTransaction();
      return savedMovie;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll({
    genre,
    language,
    search,
  }: {
    genre: string;
    language: string;
    search: string;
  }) {
    return await this.movieRepository.find({
      relations: ['genres', 'languages'],
      where: {
        title: search ? ILike(`%${search}%`) : undefined,
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
      throw new NotFoundException(`Movie with slug ${slug} not found.`);
    }
    return movie;
  }

  async findFunctions(slug: string) {
    const movie = await this.movieRepository.findOne({
      where: { slug },
      relations: ['functions'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with slug ${slug} not found.`);
    }
    return movie.functions;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const { genres, languages, ...updateData } = updateMovieDto;

    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres', 'languages', 'functions'],
    });

    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);

    let genreEntities = movie.genres;

    if (genres) {
      genreEntities = await this.genresService.findByIds(genres);
    }

    let languageEntities = movie.languages;

    if (languages) {
      languageEntities = await this.languagesService.findByIds(languages);
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
      throw new NotFoundException(`Movie with id ${id} not found.`);
    }
    return result;
  }
}
