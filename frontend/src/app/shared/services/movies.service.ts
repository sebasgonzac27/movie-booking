import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { MovieResponse, NewMovie } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private readonly httpClient: HttpClient) {}

  createMovie(movie: NewMovie) {
    const formData = new FormData();

    // Append other movie fields to FormData
    formData.append('title', movie.title);
    formData.append('storyline', movie.storyline);
    formData.append('releaseDate', movie.releaseDate.toString());
    formData.append('duration', movie.duration.toString());
    formData.append('genres', JSON.stringify(movie.genres));
    formData.append('languages', JSON.stringify(movie.languages));
    formData.append('cover', movie.cover, movie.cover.name);
    formData.append('functions', JSON.stringify(movie.functions));

    return this.httpClient.post(`${environment.apiUrl}/movies`, formData);
  }

  getMovies() {
    return this.httpClient.get<MovieResponse[]>(`${environment.apiUrl}/movies`);
  }
}
