import { HttpClient, HttpParams } from '@angular/common/http';
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

  getMovies(params?: { search?: string }) {
    let httpParams = new HttpParams();
    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.httpClient.get<MovieResponse[]>(
      `${environment.apiUrl}/movies`,
      { params: httpParams },
    );
  }

  getMovieBySlug(slug: string) {
    return this.httpClient.get<MovieResponse>(
      `${environment.apiUrl}/movies/${slug}`,
    );
  }

  getFunctionsByMovieSlug(slug: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/movies/${slug}/functions`,
    );
  }
}
