import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from '../firebase/firebase.module';
import { GenresModule } from '../genres/genres.module';
import { LanguagesModule } from '../languages/languages.module';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    GenresModule,
    LanguagesModule,
    FirebaseModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
