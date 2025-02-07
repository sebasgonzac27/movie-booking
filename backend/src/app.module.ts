import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'movie_booking',
      username: 'user_movie',
      password: 'admin123*',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
