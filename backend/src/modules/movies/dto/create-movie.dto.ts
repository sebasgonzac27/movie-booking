import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISO8601,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  @MaxLength(600)
  storyline: string;

  @IsISO8601()
  releaseDate: Date;

  @IsInt()
  @Transform(({ value }) => Number(value))
  duration: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  genres: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  languages: number[];
}
