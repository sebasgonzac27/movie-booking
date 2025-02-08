import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './modules/genres/genres.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { MoviesModule } from './modules/movies/movies.module';
import { FunctionsModule } from './modules/functions/functions.module';
import { PaymentMethodsModule } from './modules/payment_methods/payment_methods.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SecurityModule } from './modules/security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_DATABASE'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MoviesModule,
    GenresModule,
    LanguagesModule,
    FunctionsModule,
    PaymentMethodsModule,
    TicketsModule,
    UsersModule,
    AuthModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
