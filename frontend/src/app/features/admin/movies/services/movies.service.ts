import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { NewMovie } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private readonly httpClient: HttpClient) {}

  createMovie(movie: NewMovie) {
    return this.httpClient.post(`${environment.apiUrl}/movies`, movie);
  }
}
