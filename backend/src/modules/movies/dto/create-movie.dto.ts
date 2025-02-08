import {
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  storyline: string;

  @IsISO8601()
  releaseDate: Date;

  @IsString()
  cover: string;

  @IsNumber()
  @IsPositive()
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
