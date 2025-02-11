import { Function } from './function.interface';
import { Genre } from './genre.interface';
import { Language } from './language.interface';

export interface Movie {
  title: string;
  storyline: string;
  duration: number;
}

export interface NewMovie extends Movie {
  cover: File;
  genres: number[];
  releaseDate: Date;
  languages: number[];
  functions: Function[];
}

export interface MovieResponse extends Movie {
  id: number;
  slug: string;
  cover: string;
  releaseDate: string;
  genres: Genre[];
  languages: Language[];
}
