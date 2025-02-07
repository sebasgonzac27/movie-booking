import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  storyline: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  releaseDate: Date;

  @IsString()
  cover: string;

  @IsNumber()
  @IsPositive()
  duration: number;
}
