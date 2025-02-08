import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './modules/genres/genres.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { MoviesModule } from './modules/movies/movies.module';
import { FunctionsModule } from './modules/functions/functions.module';
import { PaymentMethodsModule } from './modules/payment_methods/payment_methods.module';

@Module({
  imports: [
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
    MoviesModule,
    GenresModule,
    LanguagesModule,
    FunctionsModule,
    PaymentMethodsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
