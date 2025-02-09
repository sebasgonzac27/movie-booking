import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISO8601,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  storyline: string;

  @IsISO8601()
  releaseDate: Date;

  @IsInt()
  @Transform(({ value }) => Number(value))
  duration: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  languages: string[];
}
