import { Function } from './function.interface';

export interface Movie {
  title: string;
  storyline: string;
  releaseDate: Date;
  duration: number;
}

export interface NewMovie extends Movie {
  cover: File;
  genres: number[];
  languages: number[];
  functions: Function[];
}
