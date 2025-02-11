import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISO8601,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateFunctionDto } from 'src/modules/functions/dto/create-function.dto';

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
  @Transform(({ value }) => JSON.parse(value))
  genres: number[];

  @IsArray()
  @ArrayNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  languages: number[];

  @IsArray()
  @Transform(({ value }) => JSON.parse(value))
  functions: CreateFunctionDto[];
}
