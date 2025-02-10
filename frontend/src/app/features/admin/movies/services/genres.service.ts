import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Genre } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(private readonly httpClient: HttpClient) {}

  getGenres() {
    return this.httpClient.get<Genre[]>(`${environment.apiUrl}/genres`);
  }
}
